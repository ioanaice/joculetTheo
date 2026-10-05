// Jocul „Animale”: se aude numele animalului, copilul arată fotografia.
// După răspunsul corect se aude sunetul real al animalului, apoi lauda.

JOCURI.push({
  id: 'animale',
  titlu: 'Animale',
  exemplu: '„Vaca”',
  pictograma: 'assets/img/vaca.jpg',
  elemente: ANIMALE,

  // Ce se aude la începutul rundei.
  intrebare: function (animal) {
    return { audio: animal.id, text: animal.nume };
  },

  // Ce se aude la răspuns corect, înainte de laudă.
  dupaCorect: function (animal) {
    return { audio: animal.id + '-sunet', text: animal.sunet };
  },

  descriere: [
    {
      titlu: 'De ce e potrivit la această vârstă',
      puncte: [
        { text: 'Să arate spre un lucru dintr-o carte când e întrebat „Unde e ursul?” este un reper pe care majoritatea copiilor îl ating până la 2 ani. Jocul cere același lucru, mai simplu: copilul aude doar numele și arată imaginea.', surse: ['cdc24'] },
        { text: 'La 18 luni, majoritatea copiilor urmează deja o cerere simplă, spusă fără gesturi.', surse: ['cdc18'] }
      ]
    },
    {
      titlu: 'Ce exersează',
      puncte: [
        { text: 'Înțelegerea cuvintelor: leagă numele auzit de imaginea potrivită.', surse: ['cdc24'] },
        { text: 'Arătatul cu degetul ca răspuns la un cuvânt auzit.', surse: ['cdc24'] },
        { text: 'Atingerea unui loc anume de pe ecran. Într-un studiu cu copii de 24–36 de luni, cei mai mici au învățat un cuvânt de pe ecran doar atunci când trebuiau să atingă locul obiectului numit, nu oriunde. Studiul nu a inclus copii sub 2 ani.', surse: ['kirkorian'] }
      ]
    },
    {
      titlu: 'Cum să-l jucați împreună',
      puncte: [
        { text: 'Stați lângă el și repetați cuvântul: „Da, vaca!”.' },
        { text: 'După răspunsul corect se aude sunetul real al animalului. Imitați-l împreună.' },
        { text: 'Arătați-i același animal și într-o carte, ca jucărie sau în realitate.' },
        { text: 'Dacă greșește, nu-l corectați; cuvântul se repetă singur. Opriți-vă când își pierde interesul.' }
      ]
    }
  ]
});
