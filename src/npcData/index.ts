export type Primitives = string | number;
export interface WeightedValue {
  w: number;
  v: string;
}


export function getAlignment(alignment: { good: number, moralneutral: number, evil: number, lawful: number, ethicalneutral: number, chaotic: number }): string {
  let maxTendency = 0;
  let maxTendencyName = "";
  console.log('alignments:' + JSON.stringify(alignment));
  // alignment['good'] = 0;
  // alignment['moralneutral'] = 6;
  // alignment['evil'] = 0;
  // alignment['lawful'] = 0;
  // alignment['ethicalneutral'] = 6;
  // alignment['chaotic'] = 0;
  // iterate over alignment object properties

  let maxEthical = alignment['lawful'];
  let maxEthicalName = 'lawful';

  if (alignment['chaotic'] > maxEthical) {
    maxEthical = alignment['chaotic'];
    maxEthicalName = 'chaotic';
  }
  if (alignment['ethicalneutral'] > maxEthical) {
    maxEthical = alignment['ethicalneutral'];
    maxEthicalName = 'ethicalneutral';
  }

  let maxMoral = alignment['good'];
  let maxMoralName = 'good';

  if (alignment['evil'] > maxMoral) {
    maxMoral = alignment['evil'];
    maxMoralName = 'evil';
  }
  if (alignment['moralneutral'] > maxMoral) {
    maxMoral = alignment['moralneutral'];
    maxMoralName = 'moralneutral';
  }
  // for (const prop in alignment) {
  //   if (prop in alignment) {
  //      console.log('prop:' + prop);
  //     console.log('maxtendency2:' + maxTendency + ' ' + maxTendencyName);
  //     // check if current property value is higher than maxTendency
  //     if (alignment[prop as keyof typeof alignment] > maxTendency) {
      
  //       maxTendency = alignment[prop as keyof typeof alignment];
  //       maxTendencyName = prop;
  //     }
  //   }
  // }

  maxTendencyName = GiveMeName(maxEthicalName) + ' ' + GiveMeName(maxMoralName);
  if (maxTendencyName === 'Neutral Neutral') {
    maxTendencyName = 'True Neutral';
  }
console.log('maxtendency:' + maxTendencyName);
  // use maxTendencyName to determine overall alignment
  // if (maxTendencyName === "good") {
  //   if (alignment.lawful > alignment.chaotic) {
  //     return "Lawful Good";
  //   } else if (alignment.lawful <= alignment.chaotic) {
  //     return "Chaotic Good";
  //   } else {
  //     return "Neutral Good";
  //   }
  // } else if (maxTendencyName === "moralneutral") {
  //   if (alignment.lawful > alignment.chaotic) {
  //     return "Lawful Neutral";
  //   } else if (alignment.lawful <= alignment.chaotic) {
  //     return "Chaotic Neutral";
  //   } else {
  //     return "True Neutral";
  //   }
  // } else if (maxTendencyName === "evil") {
  //   if (alignment.lawful > alignment.chaotic) {
  //     return "Lawful Evil";
  //   } else if (alignment.lawful <= alignment.chaotic) {
  //     return "Chaotic Evil";
  //   } else {
  //     return "Neutral Evil";
  //   }
  // } else if (maxTendencyName === "lawful") {
  //   if (alignment.good > alignment.evil) {
  //     return "Lawful Good";
  //   } else if (alignment.good <= alignment.evil) {
  //     return "Lawful Evil";
  //   } else {
  //     return "Lawful Neutral";
  //   }
  // } else if (maxTendencyName === "ethicalneutral") {
  //   if (alignment.good > alignment.evil) {
  //     return "Neutral Good";
  //   } else if (alignment.good <= alignment.evil) {
  //     return "Neutral Evil";
  //   } else {
  //     return "True Neutral";
  //   }
  // } else if (maxTendencyName === "chaotic") {
  //   if (alignment.good > alignment.evil) {
  //     return "Chaotic Good";
  //   } else if (alignment.good <= alignment.evil) {
  //     return "Chaotic Evil";
  //   } else {
  //     return "Chaotic Neutral";
  //   }
  // }
    return maxTendencyName;
}

export function GiveMeName(maxTendencyName: string) : string {
  switch (maxTendencyName) {
    case "good":
      return "Good";
    case "moralneutral":
      return "Neutral";
    case "evil":
      return "Evil";
    case "lawful":
      return "Lawful";
    case "ethicalneutral":
      return "Neutral";
    case "chaotic":
      return "Chaotic";
    default:
      return "";
  }
}

export interface Option {
  w: number;
  v: Group[];
  original: string;
}

export type Operator = ((context: { vars: { [key: string]: Primitives } }, options: NpcGenerateOptions) => Primitives | Group[] | void) & {
  original?: string;
};
export type Group = Operator | string;

export interface NpcGenerateOptions {
  race?: number | null;
  subrace?: number | null;
  classorprof?: number | null;
  occupation1?: number | null;
  occupation2?: number | null;
  alignment?: number | null;
  plothook?: number | null;
  gender?: number | null;
}

export type SchemaElement = string | WeightedValue[];
export type SchemaDescriptor = { [name: string]: SchemaElement | SchemaDescriptor };
export type SchemaResult = {
  [element: string]: SchemaResult | string;
};
export type DebugNode = { o?: string; childs: (DebugNode | string)[] };

export interface NpcAbilities {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Npc {
  description: {
    name: string;
    kenkuname: string;
    age: number;
    gender: string;
    race: string;
    occupation: string;
    pronounMinus: string;
    pronounCapit: string;
    haveHas: string;
    isAre: string;
    nbS: string;
    nbDont: string;
  };
  physical: {
    hair: string;
    eyes: string;
    skin: string;
    height: number;
    build: string;
    face: string;
    special1: string;
    special2: string;
  };
  alignment: {
    good: number;
    moralneutral: number;
    evil: number;
    lawful: number;
    ethicalneutral: number;
    chaotic: number;
  };
  overallAlignment: string;
  relationship: {
    orientation: string;
    status: string;
  };
  religion: {
    description: string;
    gender: string;
    nbS: string;
  };
  ptraits: {
    traitslizards: string;
    traitsgoliaths: string;
    traits1: string;
    traits2: string;
  };
  pquirks: {
    description: string;
  };
  hook: {
    description: string;
  };
  abilities: NpcAbilities;
}
