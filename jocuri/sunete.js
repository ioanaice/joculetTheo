// Jocul „Cine face așa?”: se aude sunetul real al animalului, copilul arată fotografia.
// După răspunsul corect se aude lauda, apoi numele animalului.

JOCURI.push({
  id: 'sunete',
  titlu: 'Cine face așa?',
  exemplu: 'sunetul real al animalului',
  pictograma: 'assets/img/caine.jpg',
  elemente: ANIMALE,

  // Ce se aude la începutul rundei.
  intrebare: function (animal) {
    return { audio: animal.id + '-sunet', text: animal.sunet };
  },

  // Ce se aude după laudă, la răspuns corect.
  dupaCorect: function (animal) {
    return { audio: animal.id, text: animal.nume };
  },

  descriere: [
    {
      titlu: 'De ce e potrivit la această vârstă',
      puncte: [
        { text: 'Sunetele de animale („muu”, „ham”) apar în număr mare printre primele cuvinte ale multor copii. Autoarea sintezei citate notează însă că subiectul este încă puțin cercetat.', surse: ['laing'] },
        { text: 'La 18 luni, majoritatea copiilor încearcă să spună trei sau mai multe cuvinte în afară de „mama” și „tata”.', surse: ['cdc18'] }
      ]
    },
    {
      titlu: 'Ce exersează',
      puncte: [
        { text: 'Legătura dintre un sunet și animalul care îl face.' },
        { text: 'Ascultarea atentă și arătatul ca răspuns la ce a auzit.', surse: ['cdc24'] }
      ]
    },
    {
      titlu: 'Cum să-l jucați împreună',
      puncte: [
        { text: 'Sunetele sunt înregistrări reale. Imitați-le împreună cu el („muuu!”) și lăsați-i timp să încerce.' },
        { text: 'După răspunsul corect se aude numele animalului. Repetați-l: „Da, vaca face muuu!”.' },
        { text: 'Jocul e mai greu decât „Animale”: copilul nu aude numele animalului. Începeți cu „Animale”.' }
      ]
    }
  ]
});
