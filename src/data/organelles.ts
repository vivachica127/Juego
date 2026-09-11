export type Quiz = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type OrganelleType =
  | "pared"
  | "lamina"
  | "membrana"
  | "nucleo"
  | "reRugoso"
  | "reLiso"
  | "ribosomas"
  | "golgi"
  | "vacuola"
  | "cloroplasto"
  | "mitocondria"
  | "peroxisoma"
  | "citoplasma"
  | "citoesqueleto";

export type Organelle = {
  id: OrganelleType;
  name: string;
  subtitle: string;
  color: string;
  position: [number, number, number];
  scale: number;
  description: string;
  fact: string;
  quiz: Quiz;
};

export const ORGANELLES: Organelle[] = [
  {
    id: "pared",
    name: "Pared Celular",
    subtitle: "Celulosa",
    color: "#7cb342",
    position: [0, 7, 0],
    scale: 1,
    description:
      "Capa rígida externa compuesta principalmente de celulosa. Da forma, rigidez y protección a la célula vegetal, algo que las células animales no poseen.",
    fact: "La celulosa es el polímero orgánico más abundante de la Tierra.",
    quiz: {
      question: "¿De qué material está compuesta principalmente la pared celular?",
      options: ["Quitina", "Celulosa", "Colágeno", "Fosfolípidos"],
      correct: 1,
      explanation:
        "La pared celular vegetal está compuesta principalmente de celulosa, que le da rigidez.",
    },
  },
  {
    id: "lamina",
    name: "Lámina Media",
    subtitle: "Pectinas",
    color: "#c5e1a5",
    position: [0, 5.4, 0],
    scale: 1,
    description:
      "Capa formada por pectinas que actúa como 'pegamento' uniendo las paredes celulares de células vegetales vecinas.",
    fact: "Las pectinas son las mismas sustancias que ayudan a espesar las mermeladas.",
    quiz: {
      question: "¿Cuál es la función principal de la lámina media?",
      options: [
        "Realizar la fotosíntesis",
        "Unir células vegetales vecinas",
        "Almacenar agua",
        "Producir energía",
      ],
      correct: 1,
      explanation:
        "La lámina media, rica en pectinas, une entre sí las paredes de células adyacentes.",
    },
  },
  {
    id: "membrana",
    name: "Membrana Plasmática",
    subtitle: "Bicapa fosfolipídica",
    color: "#e6c86e",
    position: [0, 3.8, 0],
    scale: 1,
    description:
      "Bicapa de fosfolípidos que controla la entrada y salida de sustancias. Es selectivamente permeable y se ubica justo debajo de la pared celular.",
    fact: "Su modelo se conoce como 'mosaico fluido' por el movimiento de sus componentes.",
    quiz: {
      question: "La membrana plasmática es selectivamente permeable. Esto significa que:",
      options: [
        "Deja pasar todo sin control",
        "No deja pasar nada",
        "Controla qué sustancias entran y salen",
        "Solo deja salir sustancias",
      ],
      correct: 2,
      explanation:
        "La permeabilidad selectiva permite regular qué sustancias atraviesan la membrana.",
    },
  },
  {
    id: "nucleo",
    name: "Núcleo",
    subtitle: "Material genético · Nucleolo",
    color: "#9c4dcc",
    position: [3.2, 2.2, 0.4],
    scale: 1.2,
    description:
      "Centro de control de la célula. Contiene el material genético (ADN) y la envoltura nuclear con poros. En su interior el nucleolo sintetiza el rRNA.",
    fact: "El nucleolo es la 'fábrica' donde se ensamblan los ribosomas.",
    quiz: {
      question: "¿Qué se sintetiza en el nucleolo?",
      options: ["Lípidos", "rRNA (ARN ribosómico)", "Glucosa", "ATP"],
      correct: 1,
      explanation:
        "El nucleolo se encarga de la síntesis del ARN ribosómico (rRNA).",
    },
  },
  {
    id: "reRugoso",
    name: "Retículo Endoplasmático Rugoso",
    subtitle: "Síntesis de proteínas",
    color: "#3f6fd1",
    position: [-3.6, 1.8, 0],
    scale: 1,
    description:
      "Red de membranas cubierta de ribosomas que le dan aspecto 'rugoso'. Se especializa en la síntesis y procesamiento de proteínas.",
    fact: "Está conectado directamente con la envoltura nuclear.",
    quiz: {
      question: "¿Por qué el retículo endoplasmático rugoso se ve 'rugoso'?",
      options: [
        "Por los cloroplastos adheridos",
        "Por los ribosomas en su superficie",
        "Por la celulosa",
        "Por las mitocondrias",
      ],
      correct: 1,
      explanation:
        "Los ribosomas adheridos a su membrana le dan la apariencia rugosa.",
    },
  },
  {
    id: "reLiso",
    name: "Retículo Endoplasmático Liso",
    subtitle: "Síntesis de lípidos · Detoxificación",
    color: "#5c8dea",
    position: [-3.8, 0.2, 0.6],
    scale: 0.95,
    description:
      "Red de túbulos sin ribosomas. Participa en la síntesis de lípidos, el metabolismo de carbohidratos y la detoxificación de sustancias.",
    fact: "No tiene ribosomas, por eso su superficie es 'lisa'.",
    quiz: {
      question: "¿Cuál es una función del retículo endoplasmático liso?",
      options: [
        "Síntesis de proteínas",
        "Fotosíntesis",
        "Síntesis de lípidos y detoxificación",
        "Almacenar ADN",
      ],
      correct: 2,
      explanation:
        "El RE liso sintetiza lípidos y participa en la detoxificación celular.",
    },
  },
  {
    id: "ribosomas",
    name: "Ribosomas",
    subtitle: "Síntesis de proteínas",
    color: "#c0392b",
    position: [-1.8, -0.6, 1.6],
    scale: 0.8,
    description:
      "Diminutas estructuras que traducen el ARN mensajero para fabricar proteínas. Pueden estar libres en el citoplasma o unidos al RE rugoso.",
    fact: "Son las estructuras más numerosas de la célula.",
    quiz: {
      question: "Los ribosomas se encargan de:",
      options: [
        "La respiración celular",
        "La síntesis de proteínas",
        "El almacenamiento de agua",
        "La fotosíntesis",
      ],
      correct: 1,
      explanation:
        "Los ribosomas leen el ARNm y ensamblan aminoácidos para formar proteínas.",
    },
  },
  {
    id: "golgi",
    name: "Aparato de Golgi",
    subtitle: "Modificación y empaquetamiento",
    color: "#d16ba5",
    position: [-1.6, -1.8, 0.4],
    scale: 1,
    description:
      "Pila de sacos aplanados que modifica, clasifica y empaqueta proteínas y lípidos en vesículas para enviarlos a su destino.",
    fact: "Funciona como la 'oficina de correos' de la célula.",
    quiz: {
      question: "¿Qué función cumple el aparato de Golgi?",
      options: [
        "Producir energía",
        "Modificar y empaquetar proteínas",
        "Sintetizar ADN",
        "Realizar la fotosíntesis",
      ],
      correct: 1,
      explanation:
        "El Golgi modifica, empaqueta y distribuye proteínas y lípidos en vesículas.",
    },
  },
  {
    id: "vacuola",
    name: "Vacuola Central",
    subtitle: "Almacenamiento · Turgencia",
    color: "#7ec8e3",
    position: [1.6, 0.4, 1.2],
    scale: 1.6,
    description:
      "Gran compartimento lleno de agua y sustancias disueltas. Mantiene la turgencia (rigidez) de la célula y almacena nutrientes y desechos.",
    fact: "Puede ocupar hasta el 90% del volumen de la célula vegetal.",
    quiz: {
      question: "¿Qué mantiene la vacuola central al llenarse de agua?",
      options: [
        "La fotosíntesis",
        "La turgencia de la célula",
        "La división celular",
        "La síntesis de proteínas",
      ],
      correct: 1,
      explanation:
        "El agua de la vacuola genera presión de turgencia que da firmeza a la célula.",
    },
  },
  {
    id: "cloroplasto",
    name: "Cloroplasto",
    subtitle: "Fotosíntesis",
    color: "#2e7d32",
    position: [4.2, 0.4, -1],
    scale: 1.1,
    description:
      "Organelo verde que contiene clorofila. Realiza la fotosíntesis, convirtiendo luz solar, agua y CO₂ en glucosa y oxígeno.",
    fact: "Su color verde se debe al pigmento clorofila.",
    quiz: {
      question: "¿Qué proceso realiza el cloroplasto?",
      options: [
        "Respiración celular",
        "Fotosíntesis",
        "Digestión",
        "Detoxificación",
      ],
      correct: 1,
      explanation:
        "El cloroplasto realiza la fotosíntesis gracias a la clorofila.",
    },
  },
  {
    id: "mitocondria",
    name: "Mitocondria",
    subtitle: "Respiración celular",
    color: "#ef8b2c",
    position: [3.2, -1.6, 1],
    scale: 1,
    description:
      "La 'central energética' de la célula. Mediante la respiración celular produce ATP, la energía que la célula usa para funcionar.",
    fact: "Tiene su propio ADN, distinto al del núcleo.",
    quiz: {
      question: "La mitocondria es conocida como la central energética porque:",
      options: [
        "Produce ATP mediante la respiración celular",
        "Almacena agua",
        "Sintetiza proteínas",
        "Realiza la fotosíntesis",
      ],
      correct: 0,
      explanation:
        "La mitocondria produce ATP, la principal fuente de energía celular.",
    },
  },
  {
    id: "peroxisoma",
    name: "Peroxisoma",
    subtitle: "Metabolismo de lípidos · Detoxificación",
    color: "#8e44ad",
    position: [5, -0.9, -0.4],
    scale: 0.7,
    description:
      "Pequeño organelo que descompone ácidos grasos y neutraliza sustancias tóxicas como el peróxido de hidrógeno.",
    fact: "Contiene la enzima catalasa que descompone el peróxido de hidrógeno.",
    quiz: {
      question: "¿Cuál es una función del peroxisoma?",
      options: [
        "Fotosíntesis",
        "Metabolismo de lípidos y detoxificación",
        "Síntesis de ADN",
        "Almacenar clorofila",
      ],
      correct: 1,
      explanation:
        "El peroxisoma metaboliza lípidos y neutraliza sustancias tóxicas.",
    },
  },
  {
    id: "citoplasma",
    name: "Citoplasma",
    subtitle: "Medio intracelular",
    color: "#d9c97a",
    position: [0, -3.2, 0],
    scale: 2.4,
    description:
      "Medio gelatinoso que rellena la célula y donde se encuentran suspendidos todos los organelos. En él ocurren muchas reacciones metabólicas.",
    fact: "Está compuesto en su mayoría por agua (citosol).",
    quiz: {
      question: "El citoplasma es:",
      options: [
        "El material genético",
        "El medio interno donde flotan los organelos",
        "La capa externa rígida",
        "El pigmento verde",
      ],
      correct: 1,
      explanation:
        "El citoplasma es el medio intracelular donde se suspenden los organelos.",
    },
  },
  {
    id: "citoesqueleto",
    name: "Citoesqueleto",
    subtitle: "Soporte y transporte",
    color: "#a67c52",
    position: [-3.4, -3, 0.6],
    scale: 1,
    description:
      "Red de filamentos proteicos que da soporte estructural, mantiene la forma de la célula y permite el transporte interno de materiales.",
    fact: "Funciona como el 'esqueleto' y las 'carreteras' internas de la célula.",
    quiz: {
      question: "¿Qué función cumple el citoesqueleto?",
      options: [
        "Fotosíntesis",
        "Soporte estructural y transporte interno",
        "Producción de energía",
        "Almacenamiento de agua",
      ],
      correct: 1,
      explanation:
        "El citoesqueleto da soporte a la célula y facilita el transporte interno.",
    },
  },
];
