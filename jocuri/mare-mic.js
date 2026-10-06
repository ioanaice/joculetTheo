// Jocul „Mare / mic”: aceeași formă apare în două mărimi; se aude „mare” sau „mic”, copilul o arată.
// După răspunsul corect se aude doar lauda.

(function () {
  // Forma rundei curente. Se schimbă la fiecare rundă; mărimile rămân aceleași.
  var formaCurenta = FORME[0];
  // Culoarea rundei curente: aceeași pentru ambele mărimi, ca desenele să difere doar prin mărime.
  var culoareCurenta = CULORI_FORME[0];

  JOCURI.push({
    id: 'mare-mic',
    titlu: 'Mare / mic',
    exemplu: '„Mare”',
    pictograma: 'assets/img/mare-mic.svg',

    // scara = cât din cartonaș ocupă forma.
    elemente: [
      { id: 'mare', nume: 'Mare', scara: 1 },
      { id: 'mic',  nume: 'Mic',  scara: 0.4 }
    ],

    // Ce se aude la începutul rundei.
    intrebare: function (marime) {
      return { audio: marime.id, text: marime.nume };
    },

    // La începutul fiecărei runde: alege altă formă și altă culoare decât cele de dinainte.
    incepeRunda: function () {
      var altele = FORME.filter(function (forma) { return forma !== formaCurenta; });
      formaCurenta = altele[Math.floor(Math.random() * altele.length)];
      culoareCurenta = culoareLaIntamplare([culoareCurenta]);
    },

    // Cum arată fiecare variantă: forma rundei, la mărimea variantei.
    desen: function (marime) {
      return deseneazaForma(formaCurenta, marime.scara, culoareCurenta);
    },

    descriere: [
      {
        titlu: 'De la ce vârstă',
        puncte: [
          { text: 'De la aproximativ 2 ani și jumătate, copiii reușesc să arate care lucru e „mare” și care e „mic”, deși încă nu spun singuri aceste cuvinte. Știm asta din cercetări mai vechi, rezumate de studiul citat, care a lucrat el însuși cu copii de la 3 ani în sus.', surse: ['ferry'] },
          { text: 'Sub această vârstă, jocul este o primă întâlnire cu cele două cuvinte: e normal ca cel mic să nimerească la întâmplare.' }
        ]
      },
      {
        titlu: 'Ce exersează',
        puncte: [
          { text: 'Compararea a două lucruri. Cuvintele care descriu un lucru prin comparație cu altul sunt greu de învățat, spun autorii studiului.', surse: ['ferry'] },
          { text: 'Cuvintele „mare” și „mic”, pe două desene care diferă doar prin mărime: au aceeași formă și aceeași culoare.' },
          { text: 'Arătatul ca răspuns la un cuvânt auzit.', surse: ['cdc24'] }
        ]
      },
      {
        titlu: 'Cum să-l jucați împreună',
        puncte: [
          { text: 'Folosiți aceleași cuvinte la lucruri reale, puse unul lângă altul: „lingura mare, lingura mică”.' },
          { text: 'Dacă cel mic alege mereu desenul mare, e firesc: atrage mai mult privirea. Spuneți cuvântul și arătați voi.' }
        ]
      }
    ]
  });
})();
