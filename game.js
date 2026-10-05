// Logica jocului: navigarea între ecrane, rundele, sunetul.
// Conținutul comun (animale, culori, laude) este în data.js; fiecare joc este în jocuri/.

// ---------- Setări ușor de schimbat ----------
var NUMAR_VARIANTE = 2;           // câte imagini apar într-o rundă
var RUNDE_PE_SESIUNE = 10;        // după câte runde apare „Gata, pa-pa!”
var DURATA_APASARE_LUNGA = 2000;  // milisecunde, pentru butonul de pe ecranul final
var PAUZA_INTRE_SUNETE = 0;    // milisecunde de liniște după ce se termină un sunet, până la pasul următor
var DURATA_MAXIMA_SUNET = 5000;   // milisecunde; înregistrările mai lungi sunt oprite aici
var EXTENSII_AUDIO = ['m4a', 'mp3'];  // în această ordine: vocea înregistrată, apoi sunetele descărcate

// ---------- Starea jocului ----------
var jocCurent = null;
var tinta = null;        // elementul care trebuie găsit în runda curentă
var rundeJucate = 0;
var blocat = false;      // true între un răspuns corect și runda următoare
var sac = [];            // elementele rămase de întrebat, amestecate
var temporizatoare = [];

document.documentElement.style.setProperty('--durata-apasare', DURATA_APASARE_LUNGA + 'ms');

// ---------- Ecrane ----------

function arata(idEcran) {
  document.querySelectorAll('.ecran').forEach(function (ecran) {
    ecran.classList.toggle('activ', ecran.id === idEcran);
  });
}

function dupa(milisecunde, functie) {
  temporizatoare.push(setTimeout(functie, milisecunde));
}

function opresteTot() {
  temporizatoare.forEach(clearTimeout);
  temporizatoare = [];
  opresteSunetul();
}

// ---------- Sunet ----------
// Un singur player, refolosit: pe iPhone, doar un player pornit o dată
// printr-o atingere mai poate reda sunete ulterior fără atingere.

var player = new Audio();
var cerereCurenta = 0;

var limitaSunet = null;

// Oprește sunetul curent. Orice „laFinal” aflat în așteptare este abandonat.
function opresteSunetul() {
  cerereCurenta++;
  clearTimeout(limitaSunet);
  player.pause();
  if (window.speechSynthesis) speechSynthesis.cancel();
}

// Redă assets/audio/<fisier>.m4a sau, dacă nu există, <fisier>.mp3.
// Dacă nu există niciunul, citește textul cu vocea dispozitivului.
// Când sunetul s-a terminat, apelează laFinal (dacă a fost dat).
function spune(fisier, text, laFinal) {
  opresteSunetul();
  var cerere = cerereCurenta;
  var terminat = false;

  function gata() {
    if (terminat || cerere !== cerereCurenta) return;
    terminat = true;
    clearTimeout(limitaSunet);
    if (laFinal) laFinal();
  }

  function incearca(numar) {
    if (cerere !== cerereCurenta) return;
    if (numar >= EXTENSII_AUDIO.length) {
      vorbeste(text, gata);
      return;
    }
    var esuat = false;
    function urmatoarea() {
      if (esuat) return;
      esuat = true;
      incearca(numar + 1);
    }
    player.onerror = urmatoarea;
    player.src = 'assets/audio/' + fisier + '.' + EXTENSII_AUDIO[numar];
    var promisiune = player.play();
    if (promisiune && promisiune.catch) promisiune.catch(urmatoarea);
  }

  player.onended = gata;
  incearca(0);
  // Plasă de siguranță: o înregistrare prea lungă sau o voce care nu anunță că a terminat.
  limitaSunet = setTimeout(function () {
    if (cerere !== cerereCurenta) return;
    player.pause();
    if (window.speechSynthesis) speechSynthesis.cancel();
    gata();
  }, DURATA_MAXIMA_SUNET);
}

function vorbeste(text, laFinal) {
  if (!window.speechSynthesis) {
    laFinal();
    return;
  }
  var rostire = new SpeechSynthesisUtterance(text);
  rostire.lang = 'ro-RO';
  rostire.rate = 0.85;
  rostire.onend = laFinal;
  speechSynthesis.speak(rostire);
}

// Redă sunetele din listă unul după altul. După fiecare așteaptă PAUZA_INTRE_SUNETE,
// iar după ultimul apelează laFinal (dacă a fost dat).
function spunePeRand(sunete, laFinal) {
  if (sunete.length === 0) {
    if (laFinal) laFinal();
    return;
  }
  spune(sunete[0].audio, sunete[0].text, function () {
    dupa(PAUZA_INTRE_SUNETE, function () {
      spunePeRand(sunete.slice(1), laFinal);
    });
  });
}

function spuneCuvantul() {
  var cuvant = jocCurent.intrebare(tinta);
  spune(cuvant.audio, cuvant.text);
}

// ---------- 1. Lista de jocuri ----------

function construiesteLista() {
  var lista = document.getElementById('lista-jocuri');
  JOCURI.forEach(function (joc) {
    var cartonas = document.createElement('button');
    cartonas.className = 'cartonas';

    var imagine = document.createElement('img');
    imagine.src = joc.pictograma;
    imagine.alt = '';

    var titlu = document.createElement('span');
    titlu.className = 'titlu';
    titlu.textContent = joc.titlu;

    var exemplu = document.createElement('span');
    exemplu.className = 'exemplu';
    exemplu.textContent = joc.exemplu;

    cartonas.append(imagine, titlu, exemplu);
    cartonas.addEventListener('click', function () { arataDescrierea(joc); });
    lista.append(cartonas);
  });
}

function construiesteCreditele() {
  var lista = document.getElementById('credite-foto');
  ANIMALE.forEach(function (animal) {
    var rand = document.createElement('li');
    var legatura = document.createElement('a');
    legatura.href = animal.foto.url;
    legatura.target = '_blank';
    legatura.rel = 'noopener';
    legatura.textContent = animal.nume;
    var sunet = document.createElement('a');
    sunet.href = animal.inregistrare.url;
    sunet.target = '_blank';
    sunet.rel = 'noopener';
    sunet.textContent = 'sunet';
    rand.append(legatura, ' – foto: ' + animal.foto.autor + ', ' + animal.foto.licenta + '; ',
      sunet, ': ' + animal.inregistrare.autor + ', ' + animal.inregistrare.licenta);
    lista.append(rand);
  });
}

// ---------- 2. Descrierea pentru părinți ----------

function arataDescrierea(joc) {
  jocCurent = joc;
  document.getElementById('descriere-titlu').textContent = joc.titlu;

  var container = document.getElementById('descriere-text');
  container.textContent = '';
  var surseFolosite = [];  // în ordinea apariției; poziția + 1 = numărul afișat

  joc.descriere.concat([DESPRE_ECRANE]).forEach(function (sectiune) {
    var titlu = document.createElement('h2');
    titlu.textContent = sectiune.titlu;
    var lista = document.createElement('ul');

    sectiune.puncte.forEach(function (punct) {
      var rand = document.createElement('li');
      rand.textContent = punct.text;
      (punct.surse || []).forEach(function (idSursa) {
        if (surseFolosite.indexOf(idSursa) === -1) surseFolosite.push(idSursa);
        var trimitere = document.createElement('a');
        trimitere.className = 'trimitere';
        trimitere.href = SURSE[idSursa].url;
        trimitere.target = '_blank';
        trimitere.rel = 'noopener';
        trimitere.textContent = ' [' + (surseFolosite.indexOf(idSursa) + 1) + ']';
        rand.append(trimitere);
      });
      lista.append(rand);
    });
    container.append(titlu, lista);
  });

  var titluSurse = document.createElement('h2');
  titluSurse.textContent = 'Surse';
  var listaSurse = document.createElement('ol');
  listaSurse.className = 'surse';
  surseFolosite.forEach(function (idSursa) {
    var rand = document.createElement('li');
    var legatura = document.createElement('a');
    legatura.href = SURSE[idSursa].url;
    legatura.target = '_blank';
    legatura.rel = 'noopener';
    legatura.textContent = SURSE[idSursa].titlu;
    rand.append(legatura);
    listaSurse.append(rand);
  });
  container.append(titluSurse, listaSurse);

  arata('ecran-descriere');
  document.querySelector('.descriere-continut').scrollTop = 0;
}

// ---------- 3. Jocul ----------

function amesteca(lista) {
  var copie = lista.slice();
  for (var i = copie.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copie[i];
    copie[i] = copie[j];
    copie[j] = temp;
  }
  return copie;
}

// Trece prin toate elementele înainte să repete vreunul și nu cere același element de două ori la rând.
function urmatoareaTinta() {
  if (sac.length === 0) {
    sac = amesteca(jocCurent.elemente);
    if (sac.length > 1 && sac[sac.length - 1] === tinta) sac.unshift(sac.pop());
  }
  return sac.pop();
}

function pornesteJocul() {
  opresteTot();
  rundeJucate = 0;
  sac = [];
  tinta = null;
  // Pornită din atingerea butonului, ca vocea dispozitivului să fie permisă și mai târziu (iPhone).
  if (window.speechSynthesis) speechSynthesis.speak(new SpeechSynthesisUtterance(''));
  arata('ecran-joc');
  rundaNoua();
}

function rundaNoua() {
  if (rundeJucate >= RUNDE_PE_SESIUNE) {
    arataFinalul();
    return;
  }
  blocat = false;
  tinta = urmatoareaTinta();
  var corect = tinta;
  var altele = amesteca(jocCurent.elemente.filter(function (e) { return e !== corect; }))
    .slice(0, NUMAR_VARIANTE - 1);

  var container = document.getElementById('variante');
  container.textContent = '';
  amesteca([corect].concat(altele)).forEach(function (element) {
    var buton = document.createElement('button');
    buton.className = 'varianta';
    if (element.culoare) {
      buton.innerHTML = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="' + element.culoare + '"/></svg>';
    } else {
      var imagine = document.createElement('img');
      imagine.src = 'assets/img/' + element.id + '.jpg';
      imagine.alt = '';
      imagine.draggable = false;
      buton.append(imagine);
    }
    buton.addEventListener('pointerdown', function () { alege(buton, element); });
    container.append(buton);
  });

  spuneCuvantul();
}

function alege(buton, element) {
  if (blocat) return;

  if (element === tinta) {
    blocat = true;
    rundeJucate++;
    document.querySelectorAll('.varianta').forEach(function (alta) {
      if (alta !== buton) alta.classList.add('estompat');
    });
    buton.classList.add('corect');
    stelute(buton);
    // Întâi sunetul ales de joc (dacă are unul), apoi lauda.
    var sunete = [LAUDE[Math.floor(Math.random() * LAUDE.length)]];
    if (jocCurent.dupaCorect) sunete.unshift(jocCurent.dupaCorect(element));
    spunePeRand(sunete, rundaNoua);
  } else {
    // Repornește animația chiar dacă e atins de mai multe ori la rând.
    buton.classList.remove('gresit');
    void buton.offsetWidth;
    buton.classList.add('gresit');
    opresteTot();
    spunePeRand([MAI_INCEARCA, jocCurent.intrebare(tinta)]);
  }
}

function stelute(buton) {
  var zona = buton.getBoundingClientRect();
  var centruX = zona.left + zona.width / 2;
  var centruY = zona.top + zona.height / 2;
  var raza = Math.min(window.innerWidth, window.innerHeight) * 0.35;
  var numar = 10;

  for (var i = 0; i < numar; i++) {
    var unghi = (i / numar) * 2 * Math.PI;
    var steluta = document.createElement('span');
    steluta.className = 'steluta';
    steluta.textContent = '★';
    steluta.style.left = centruX + 'px';
    steluta.style.top = centruY + 'px';
    steluta.style.setProperty('--dx', Math.cos(unghi) * raza + 'px');
    steluta.style.setProperty('--dy', Math.sin(unghi) * raza + 'px');
    steluta.addEventListener('animationend', function () { this.remove(); });
    document.body.append(steluta);
  }
}

// ---------- 4. Finalul ----------

function arataFinalul() {
  arata('ecran-final');
  spune(SALUT_FINAL.audio, SALUT_FINAL.text);
}

function inapoiLaLista() {
  opresteTot();
  document.querySelectorAll('.steluta').forEach(function (s) { s.remove(); });
  arata('ecran-lista');
}

// ---------- Apăsare lungă (butoanele pentru adult) ----------

function apasareLunga(buton, functie) {
  var temporizator = null;

  function anuleaza() {
    clearTimeout(temporizator);
    temporizator = null;
    buton.classList.remove('tinut');
  }

  buton.addEventListener('pointerdown', function () {
    anuleaza();
    buton.classList.add('tinut');
    temporizator = setTimeout(function () {
      anuleaza();
      functie();
    }, DURATA_APASARE_LUNGA);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (eveniment) {
    buton.addEventListener(eveniment, anuleaza);
  });
}

// ---------- Pornire ----------

construiesteLista();
construiesteCreditele();

document.getElementById('btn-inapoi').addEventListener('click', inapoiLaLista);
document.getElementById('btn-porneste').addEventListener('click', pornesteJocul);
document.getElementById('btn-repeta').addEventListener('pointerdown', function () {
  if (blocat) return;
  opresteTot();
  spuneCuvantul();
});
document.getElementById('btn-iesire').addEventListener('click', inapoiLaLista);
apasareLunga(document.getElementById('btn-meniu'), inapoiLaLista);

// Fără meniu la apăsare lungă și fără zoom cu două degete sau dublă atingere.
document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
document.addEventListener('gesturestart', function (e) { e.preventDefault(); });
document.addEventListener('dblclick', function (e) { e.preventDefault(); });
