"""Taie liniștea de la începutul și sfârșitul înregistrărilor de voce (.m4a) din assets/audio/.

Folosire:
    python tools/taie_linistea.py          # prelucrează doar înregistrările noi sau reînregistrate
    python tools/taie_linistea.py --tot    # reprelucrează toate, pornind de la originale

Înainte de prima modificare, fiecare fișier este copiat în inregistrari-originale/.
Tăierea pornește mereu de la original, deci scriptul poate fi rulat de oricâte ori.
Sunetele de animale (.mp3) nu sunt atinse.

Cum găsește vocea:
  1. porțiunile tari (aproape de volumul maxim) sunt sigur voce;
  2. le lipește porțiunile mai slabe aflate imediat lângă ele (începuturi și sfârșituri de cuvânt);
  3. zgomotele scurte și izolate de la margini (click-ul de pornire/oprire) rămân pe dinafară.

Are nevoie de pachetul imageio-ffmpeg:  python -m pip install --user imageio-ffmpeg
"""
import os
import re
import shutil
import subprocess
import sys

import imageio_ffmpeg

RADACINA = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(RADACINA, 'assets', 'audio')
ORIGINALE = os.path.join(RADACINA, 'inregistrari-originale')
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

PRAG_TARE_DB = 18         # „sigur voce” = la cel mult atâția decibeli sub cel mai tare moment
PRAG_SLAB_DB = 25         # „poate voce” = la cel mult atâția decibeli sub cel mai tare moment
DURATA_MINIMA_TARE = 0.03  # secunde; o porțiune tare mai scurtă e un click, nu voce
DISTANTA_LIPIRE = 0.20    # secunde; o porțiune slabă mai aproape de voce decât atât îi aparține
PASTREAZA_INCEPUT = 0.10  # secunde păstrate înaintea vocii
PASTREAZA_SFARSIT = 0.25  # secunde păstrate după voce


def ffmpeg(*argumente):
    """Rulează ffmpeg și întoarce ce a scris (ffmpeg scrie informațiile pe stderr)."""
    rezultat = subprocess.run([FFMPEG, '-hide_banner', '-nostdin'] + list(argumente),
                              capture_output=True, text=True, encoding='utf-8', errors='replace')
    return rezultat.returncode, rezultat.stderr


def durata(cale):
    _, text = ffmpeg('-i', cale)
    m = re.search(r'Duration: (\d+):(\d+):([\d.]+)', text)
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3)) if m else None


def volum_maxim(cale):
    _, text = ffmpeg('-i', cale, '-af', 'volumedetect', '-f', 'null', '-')
    m = re.search(r'max_volume: (-?[\d.]+) dB', text)
    return float(m.group(1)) if m else None


def portiuni_cu_sunet(cale, prag_db, total):
    """Lista de (început, sfârșit) în care sunetul depășește pragul."""
    _, text = ffmpeg('-i', cale, '-af', 'silencedetect=noise=%.1fdB:d=0.05' % prag_db, '-f', 'null', '-')
    inceputuri = [max(0.0, float(x)) for x in re.findall(r'silence_start: (-?[\d.]+)', text)]
    sfarsituri = [float(x) for x in re.findall(r'silence_end: (-?[\d.]+)', text)]
    sfarsituri += [total] * (len(inceputuri) - len(sfarsituri))
    portiuni, pozitie = [], 0.0
    for inceput, sfarsit in zip(inceputuri, sfarsituri):
        if inceput > pozitie:
            portiuni.append((pozitie, inceput))
        pozitie = max(pozitie, sfarsit)
    if pozitie < total:
        portiuni.append((pozitie, total))
    return portiuni


def gaseste_vocea(cale):
    """Întoarce (început, sfârșit) pentru partea cu voce sau None dacă nu o găsește."""
    total = durata(cale)
    varf = volum_maxim(cale)
    if total is None or varf is None:
        return None
    tari = [(a, b) for a, b in portiuni_cu_sunet(cale, varf - PRAG_TARE_DB, total) if b - a >= DURATA_MINIMA_TARE]
    if not tari:
        return None
    inceput, sfarsit = tari[0][0], tari[-1][1]
    slabe = portiuni_cu_sunet(cale, varf - PRAG_SLAB_DB, total)
    schimbat = True
    while schimbat:
        schimbat = False
        for a, b in slabe:
            aproape = a <= sfarsit + DISTANTA_LIPIRE and b >= inceput - DISTANTA_LIPIRE
            if aproape and (a < inceput or b > sfarsit):
                inceput, sfarsit = min(inceput, a), max(sfarsit, b)
                schimbat = True
    return max(0.0, inceput - PASTREAZA_INCEPUT), min(total, sfarsit + PASTREAZA_SFARSIT)


def taie(original, destinatie):
    voce = gaseste_vocea(original)
    if voce is None:
        return 'nu am găsit vocea în înregistrare'
    inceput, sfarsit = voce
    lungime = sfarsit - inceput
    # Intrare și ieșire line, ca tăietura să nu se audă ca un pocnet.
    filtru = ('atrim=start=%.3f:end=%.3f,asetpts=PTS-STARTPTS,'
              'afade=t=in:d=0.02,afade=t=out:st=%.3f:d=0.08') % (inceput, sfarsit, max(0.0, lungime - 0.08))
    temporar = destinatie + '.tmp.m4a'
    cod, text = ffmpeg('-y', '-i', original, '-af', filtru, '-c:a', 'aac', '-b:a', '128k',
                       '-movflags', '+faststart', temporar)
    if cod != 0 or not os.path.exists(temporar) or (durata(temporar) or 0) < 0.2:
        if os.path.exists(temporar):
            os.remove(temporar)
        return 'ffmpeg a eșuat sau rezultatul e gol: ' + text.strip().splitlines()[-1]
    os.replace(temporar, destinatie)
    return None


def main():
    tot = '--tot' in sys.argv
    os.makedirs(ORIGINALE, exist_ok=True)
    fisiere = sorted(f for f in os.listdir(AUDIO) if f.lower().endswith('.m4a') and not f.endswith('.tmp.m4a'))
    prelucrate = 0
    for nume in fisiere:
        fisier = os.path.join(AUDIO, nume)
        original = os.path.join(ORIGINALE, nume)
        # După tăiere, fișierul primește data originalului. Dacă data diferă, e o înregistrare nouă.
        e_nou = not os.path.exists(original) or abs(os.path.getmtime(fisier) - os.path.getmtime(original)) > 1
        if e_nou:
            shutil.copy2(fisier, original)
        elif not tot:
            continue
        inainte = durata(original)
        eroare = taie(original, fisier)
        if eroare:
            print('EROARE  %-22s %s' % (nume, eroare))
            continue
        timp = os.path.getmtime(original)
        os.utime(fisier, (timp, timp))
        prelucrate += 1
        print('tăiat   %-22s %.1fs -> %.1fs' % (nume, inainte, durata(fisier)))
    print('%d fișiere prelucrate, %d neschimbate.' % (prelucrate, len(fisiere) - prelucrate))


if __name__ == '__main__':
    main()
