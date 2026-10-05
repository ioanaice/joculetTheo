// Jocul „Culori”: se aude numele culorii, copilul arată cercul colorat.
// După răspunsul corect se aude doar lauda.

JOCURI.push({
  id: 'culori',
  titlu: 'Culori',
  exemplu: '„Galben”',
  pictograma: 'assets/img/culori.svg',
  elemente: CULORI,

  // Ce se aude la începutul rundei.
  intrebare: function (culoare) {
    return { audio: culoare.id, text: culoare.nume };
  },

  descriere: [
    {
      titlu: 'De ce (nu) e potrivit la această vârstă',
      puncte: [
        { text: 'Jocul este înaintea vârstei de 1 an și 9 luni. Să arate o culoare la cerere („Care e roșu?”) este un reper pe care majoritatea copiilor îl ating abia în jurul vârstei de 2 ani și jumătate.', surse: ['cdc30'] },
        { text: 'E normal ca acum să nimerească la întâmplare. Luați jocul ca pe o primă întâlnire cu numele culorilor, nu ca pe un test.' }
      ]
    },
    {
      titlu: 'Ce exersează',
      puncte: [
        { text: 'Auzul repetat al numelor de culori, legat de culoarea văzută.' },
        { text: 'Arătatul ca răspuns la un cuvânt auzit.', surse: ['cdc24'] }
      ]
    },
    {
      titlu: 'Cum să-l jucați împreună',
      puncte: [
        { text: 'Numiți culoarea și la obiecte din jur: „Uite, și mașina e roșie!”.' },
        { text: 'Dacă se enervează sau se plictisește, reveniți la joc peste câteva luni.' }
      ]
    }
  ]
});
