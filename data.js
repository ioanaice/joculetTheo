// Conținutul folosit de mai multe jocuri: animale, culori, laude, surse.
// Regulile și descrierea fiecărui joc sunt în folderul jocuri/.
// Pentru un animal nou: o linie în ANIMALE + fotografia în assets/img/ + înregistrările în assets/audio/.

// ---------- Animale ----------
// id      = numele fișierelor: assets/img/<id>.jpg, assets/audio/<id>.m4a (vocea) și <id>-sunet.mp3 (sunetul real)
// nume    = numele rostit; e citit de vocea dispozitivului doar dacă lipsește <id>.m4a
// sunet   = sunetul scris; e citit de vocea dispozitivului doar dacă lipsește <id>-sunet.mp3
// foto, inregistrare = autorul, licența și pagina fotografiei și a sunetului (afișate la „Credite”)
var ANIMALE = [
  { id: 'vaca',   nume: 'Vaca',    sunet: 'Muuu',
    foto: { autor: 'Verum', licenta: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg' },
    inregistrare: { autor: 'MichaeltheFox8621', licenta: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Single_Cow_Moo.ogg' } },
  { id: 'caine',  nume: 'Câinele', sunet: 'Ham, ham',
    foto: { autor: 'FriendlyToaster', licenta: 'CC BY 4.0', url: 'https://commons.wikimedia.org/wiki/File:3-BerneseMountainDogInGrass.jpg' },
    inregistrare: { autor: 'Amada44', licenta: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Barking_of_a_dog.ogg' } },
  { id: 'pisica', nume: 'Pisica',  sunet: 'Miau',
    foto: { autor: 'Von.grzanka', licenta: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Felis_catus-cat_on_snow.jpg' },
    inregistrare: { autor: 'Jeanot', licenta: 'CC BY-SA 2.5', url: 'https://commons.wikimedia.org/wiki/File:Felis_silvestris_catus.ogg' } },
  { id: 'rata',   nume: 'Rața',    sunet: 'Mac, mac',
    foto: { autor: 'Charles J. Sharp', licenta: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Mallard_duck_(Anas_platyrhynchos)_male.jpg' },
    inregistrare: { autor: 'Jonathon Jongsma', licenta: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Anas_platyrhynchos_-_Mallard_-_XC62258.ogg' } },
  { id: 'oaie',   nume: 'Oaia',    sunet: 'Beee',
    foto: { autor: 'Diliff', licenta: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Swaledale_Sheep,_Lake_District,_England_-_June_2009.jpg' },
    inregistrare: { autor: 'earthcalling', licenta: 'domeniu public', url: 'https://commons.wikimedia.org/wiki/File:Sheep_bleating.ogg' } },
  { id: 'porc',   nume: 'Porcul',  sunet: 'Groh, groh',
    foto: { autor: 'kallerna', licenta: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Pig_farm_Vampula_9.jpg' },
    inregistrare: { autor: 'erdie', licenta: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Pig_grunt_-_Erdie.ogg' } },
  { id: 'cal',    nume: 'Calul',   sunet: 'I-ha-ha',
    foto: { autor: 'Diego Delso', licenta: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Delta_del_Danubio,_Ruman%C3%ADa,_2016-05-28,_DD_31.jpg' },
    inregistrare: { autor: 'Hü.', licenta: 'domeniu public', url: 'https://commons.wikimedia.org/wiki/File:Wiehern.ogg' } },
  { id: 'gaina',  nume: 'Găina',   sunet: 'Cot-cot-codac',
    foto: { autor: 'Daniel Schwen', licenta: 'CC BY-SA 2.5', url: 'https://commons.wikimedia.org/wiki/File:CH_Hen_1.jpg' },
    inregistrare: { autor: 'alys', licenta: 'domeniu public', url: 'https://commons.wikimedia.org/wiki/File:Hen_announcing_shes_lain_an_egg.ogg' } }
];

// ---------- Culori ----------
var CULORI = [
  { id: 'rosu',     nume: 'Roșu',     culoare: '#e53935' },
  { id: 'galben',   nume: 'Galben',   culoare: '#fdd835' },
  { id: 'albastru', nume: 'Albastru', culoare: '#1e88e5' },
  { id: 'verde',    nume: 'Verde',    culoare: '#43a047' }
];

// ---------- Laude, încurajare și final ----------
var LAUDE = [
  { audio: 'bravo-1', text: 'Bravo!' },
  { audio: 'bravo-2', text: 'Foarte bine!' }
];
var MAI_INCEARCA = { audio: 'mai-incearca', text: 'Mai încearcă' };
var SALUT_FINAL = { audio: 'pa-pa', text: 'Gata, pa-pa!' };

// ---------- Surse ----------
// Fiecare sursă a fost deschisă și verificată în octombrie 2026.
var SURSE = {
  cdc18: {
    titlu: 'CDC – Repere de dezvoltare la 18 luni',
    url: 'https://www.cdc.gov/act-early/milestones/18-months.html'
  },
  cdc24: {
    titlu: 'CDC – Repere de dezvoltare la 2 ani',
    url: 'https://www.cdc.gov/act-early/milestones/2-years.html'
  },
  cdc30: {
    titlu: 'CDC – Repere de dezvoltare la 30 de luni',
    url: 'https://www.cdc.gov/act-early/milestones/30-months.html'
  },
  oms: {
    titlu: 'OMS (2019) – Recomandări privind activitatea fizică, sedentarismul și somnul la copiii sub 5 ani',
    url: 'https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more'
  },
  aap: {
    titlu: 'Academia Americană de Pediatrie (2026) – Helping Kids Thrive in a Digital World',
    url: 'https://www.healthychildren.org/English/family-life/Media/Pages/helping-kids-thrive-in-a-digital-world-AAP-policy-explained.aspx'
  },
  kirkorian: {
    titlu: 'Kirkorian, Choi și Pempek (2016) – Toddlers’ Word Learning From Contingent and Noncontingent Video on Touch Screens, Child Development',
    url: 'https://digitalcommons.hollins.edu/psychfac/1/'
  },
  strouse: {
    titlu: 'Strouse și Samson (2021) – Learning From Video: A Meta-Analysis of the Video Deficit in Children Ages 0 to 6 Years, Child Development',
    url: 'https://red.library.usd.edu/se-fp/3/'
  },
  laing: {
    titlu: 'Laing (2019) – A role for onomatopoeia in early language, Language and Cognition',
    url: 'https://doi.org/10.1017/langcog.2018.23'
  }
};

// Secțiune comună, afișată la finalul fiecărei descrieri.
var DESPRE_ECRANE = {
  titlu: 'Despre ecrane la această vârstă',
  puncte: [
    { text: 'Organizația Mondială a Sănătății nu recomandă timp sedentar în fața ecranului pentru copiii de 1 an. La 2 ani recomandă cel mult o oră pe zi și adaugă că mai puțin e mai bine.', surse: ['oms'] },
    { text: 'Academia Americană de Pediatrie spune că cei mai mici copii învață cel mai bine din interacțiuni reale și îi îndeamnă pe părinți să se uite și să se joace alături de copil. Ghidul ei actual pune accent pe calitate, context și conversație, nu doar pe numărul de minute.', surse: ['aap'] },
    { text: 'Copiii mici învață, în medie, mai puțin de pe un ecran decât de la o persoană aflată lângă ei. Diferența scade odată cu vârsta.', surse: ['strouse'] },
    { text: 'De aceea jocul se oprește singur după câteva runde și este gândit să fie jucat împreună cu un adult, nu lăsat copilului.' }
  ]
};

// ---------- Jocurile ----------
// Fiecare joc are fișierul lui în folderul jocuri/ și se adaugă singur în această listă.
// Ordinea din lista de pe ecran este ordinea în care fișierele sunt încărcate în index.html.
var JOCURI = [];
