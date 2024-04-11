interface UnitConversion {
  [key: string]: {
    [key: string]: number;
  };
}

export const unitConversions: UnitConversion = {
  KG: {
    G: 1000,
    LB: 2.20462,
    OZ: 35.274,
  },
  G: {
    KG: 0.001,
    LB: 0.00220462,
    OZ: 0.035274,
  },
  LB: {
    KG: 0.453592,
    G: 453.592,
    OZ: 16,
  },
  ML: {
    L: 0.001,
    OZ: 0.033814,
  },
  L: {
    ML: 1000,
    OZ: 33.814,
  },
  OZ: {
    ML: 29.5735,
    L: 0.0295735,
    G: 28.3495,
    KG: 0.0283495,
    LB: 0.0625,
  },
};
