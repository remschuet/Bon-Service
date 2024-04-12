interface UnitConversion {
  [key: string]: {
    [key: string]: number;
  };
}

export const unitConversions: UnitConversion = {
  KG: {
    G: 1000,
    LB: 2.2046,
    OZ: 35.274,
    ML: 1,
    L: 0.001,
  },
  G: {
    KG: 0.001,
    LB: 0.0022,
    OZ: 0.0353,
    ML: 1,
    L: 0.001,
    TBSP: 0.0676,
    TSP: 0.20289,
  },
  LB: {
    KG: 0.4536,
    G: 453.592,
    OZ: 16,
  },
  ML: {
    L: 0.001,
    KG: 0.001,
    G: 1,
    OZ: 0.03381,
    TBSP: 0.0676,
    TSP: 0.20289,
  },
  L: {
    ML: 1000,
    OZ: 33.814,
    G: 1000,
    KG: 1,
  },
  OZ: {
    ML: 29.5735,
    L: 0.0296,
    G: 28.349,
    KG: 0.02835,
    LB: 0.0625,
  },
};
