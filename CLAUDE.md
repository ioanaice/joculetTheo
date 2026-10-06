# Joculețele lui Theo

## Ce este proiectul și pentru cine

Un joc educațional pentru copii antepreșcolari și un ghid pentru părinții lor. Merge în browser pe laptop, pe Android și pe iOS.

Jocul nu este doar pentru Theo (născut în ianuarie 2025), care este primul lui jucător: orice părinte trebuie să-l poată potrivi cu propriul copil. Direcția dorită este ca părintele să aleagă nivelul de dificultate, iar mai târziu, eventual, să completeze la început câteva informații despre copil. Nu lega conținutul sau textele de o singură vârstă sau de un singur copil.

Are două categorii de utilizatori:

- **Copilul** joacă: aude un cuvânt sau un sunet și atinge imaginea potrivită.
- **Părintele** alege informat: înainte de fiecare joc citește pentru ce vârstă e potrivit, ce exersează copilul, de ce e recomandat sau nu și ce spun specialiștii despre ecrane la această vârstă.

## Cum lucrăm

- Ioana este la primul ei proiect de programare. Răspunde în română, explică termenii tehnici și propune pași mici, pe care îi poate testa singură.
- Doar unelte și servicii gratuite.
- La o schimbare mai mare, prezintă întâi planul și așteaptă acordul.

## Testare

Dublu-click pe `index.html`. Nu există pas de instalare sau de construire.

Orice schimbare de atingere, sunet sau așezare în pagină trebuie verificată și pe telefon, nu doar pe laptop.

Claude nu poate asculta sunetele și nu vede dispozitivele reale. După o schimbare de sunet sau de imagine, spune asta deschis și roag-o pe Ioana să asculte și să se uite.

Jocul este publicat cu GitHub Pages la `https://ioanaice.github.io/joculetTheo/`; pagina se actualizează singură la 1–2 minute după `git push`. Poate fi adăugat pe ecranul principal (pictogramă proprie, pornire pe tot ecranul), dar nu merge fără internet.

Pictograma se desenează în `assets/img/pictograma.svg`; fișierele `pictograma-*.png` sunt generate din ea și trebuie refăcute dacă desenul se schimbă.

## Regulile jocului

- Sesiuni scurte: jocul se oprește singur după un număr fix de runde.
- Fără penalizare la greșeală: se aude „mai încearcă”, apoi întrebarea se repetă. Nimic nu sună a eșec.
- La răspuns corect: sunetul ales de joc (`dupaCorect`, dacă jocul are unul), apoi lauda, apoi runda următoare.
- Ieșirea din joc trebuie să fie rapidă pentru adult: ✕ din joc este un click simplu.
- Butonul de pe ecranul final se activează prin apăsare lungă, ca jocul să nu fie repornit de copil din greșeală.
- Copilul nu citește: tot ce îi este adresat se aude sau se vede, fără text.

## Sunetul

- Sunetele se înlănțuie: pasul următor pornește la `PAUZA_INTRE_SUNETE` după ce s-a terminat sunetul dinainte (`spunePeRand` în `game.js`). Nu reveni la pauze fixe, ghicite.
- Orice sunet este oprit la `DURATA_MAXIMA_SUNET` (5 secunde).
- Numele fișierelor audio: litere mici, fără diacritice.
- `<id>.m4a` este vocea înregistrată; `<id>-sunet.mp3` este sunetul real al animalului. Un `<id>-sunet.m4a` l-ar înlocui pe cel real, deci nu se creează.
- După înregistrări noi se rulează `python tools/taie_linistea.py`, care taie liniștea de la margini.
- Înregistrările neatinse sunt păstrate în `inregistrari-originale/`. Folderul nu se șterge.

## Regulile de conținut

- Orice afirmație din textele pentru părinți are o sursă deschisă și verificată, trecută în `SURSE`. Dacă o sursă nu susține exact afirmația, afirmația se reformulează sau se scoate.
- Textele spun cinstit și când un joc este înaintea vârstei copilului sau când cercetarea e puțină.
- Fotografiile și sunetele au licență liberă și sunt creditate în două locuri, care trebuie ținute la fel: `data.js` (afișat în aplicație) și `CREDITS.md`.

## Unde se adaugă lucruri

| Ce | Unde |
|---|---|
| Un joc: titlu, ce se aude, textul pentru părinți | `jocuri/<joc>.js`, câte un fișier pentru fiecare joc |
| Conținut folosit de mai multe jocuri: animale, culori, laude, surse | `data.js` |
| Logica jocului și setările (număr de variante, runde, pauze) | `game.js`, la început |
| Aspect | `style.css` |
| Fotografii | `assets/img/<id>.jpg` |
| Vocea înregistrată | `assets/audio/<id>.m4a` |
| Sunetul real al animalului | `assets/audio/<id>-sunet.mp3` |
| Autorii și licențele | `data.js` și `CREDITS.md` |
| Scripturi ajutătoare în Python | `tools/` |

Dacă lipsește un fișier audio, jocul citește textul cu vocea dispozitivului.

Un joc nou:
- se adaugă singur în listă cu `JOCURI.push({...})` și definește `intrebare(element)`, opțional `dupaCorect(element)` și `descriere`;
- nu depinde de alt joc; ce au în comun stă în `data.js`;
- se încarcă în `index.html` între `data.js` și `game.js`; ordinea scripturilor este ordinea cartonașelor.

## Unelte

- `tools/taie_linistea.py` taie liniștea din înregistrările de voce noi. Are nevoie de pachetul `imageio-ffmpeg` (`python -m pip install --user imageio-ffmpeg`).

## Stilul codului

- HTML, CSS și JavaScript simple, fără biblioteci și fără pas de construire, ca jocul să pornească direct din fișier.
- Din același motiv: scripturi clasice, nu module, iar datele stau în fișiere `.js`, nu în JSON.
- Numele din cod și comentariile sunt în română.
