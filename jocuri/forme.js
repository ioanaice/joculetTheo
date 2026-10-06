// Jocul „Forme”: se aude numele formei, copilul arată desenul.
// După răspunsul corect se aude doar lauda.

(function () {
  // Culorile deja folosite în runda curentă, ca cele două forme să nu aibă aceeași culoare.
  var culoriFolosite = [];

  JOCURI.push({
    id: 'forme',
    titlu: 'Forme',
    exemplu: '„Cercul”',
    pictograma: 'assets/img/forme.svg',
    elemente: FORME,

    // Ce se aude la începutul rundei.
    intrebare: function (forma) {
      return { audio: forma.id, text: forma.nume };
    },

    // La începutul fiecărei runde: culorile se aleg din nou.
    incepeRunda: function () {
      culoriFolosite = [];
    },

    // Cum arată fiecare variantă: forma, la mărime întreagă, într-o culoare la întâmplare.
    desen: function (forma) {
      var culoare = culoareLaIntamplare(culoriFolosite);
      culoriFolosite.push(culoare);
      return deseneazaForma(forma, 1, culoare);
    },

    descriere: [
      {
        titlu: 'De la ce vârstă',
        puncte: [
          { text: 'Între 25 și 30 de luni, copiii încep să recunoască formele obișnuite, în varianta lor cea mai des întâlnită. La 3 ani, peste 60% dintre copii pot spune numele cercului, al pătratului și al triunghiului.', surse: ['verdine'] },
          { text: 'Sub 2 ani, jocul este înaintea vârstei: e normal ca cel mic să nimerească la întâmplare. Luați-l ca pe o primă întâlnire cu numele formelor, nu ca pe un test.' }
        ]
      },
      {
        titlu: 'Ce exersează',
        puncte: [
          { text: 'Numele formelor, legate de forma văzută. Autorii studiului citat arată că numele formelor țin deopotrivă de limbaj, de orientarea în spațiu și de matematica timpurie.', surse: ['verdine'] },
          { text: 'Arătatul ca răspuns la un cuvânt auzit.', surse: ['cdc24'] }
        ]
      },
      {
        titlu: 'Cum să-l jucați împreună',
        puncte: [
          { text: 'Căutați formele și în jur: „Farfuria e un cerc. Fereastra e un pătrat.”' },
          { text: 'Culorile se schimbă la întâmplare de la o rundă la alta: un cerc rămâne cerc, fie că e roșu sau albastru.' },
          { text: 'Steaua este adăugată de noi; studiul citat vorbește despre cerc, pătrat și triunghi.' }
        ]
      }
    ]
  });
})();
