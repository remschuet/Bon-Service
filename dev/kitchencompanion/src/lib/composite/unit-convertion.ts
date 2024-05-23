interface UnitConversion {
  [key: string]: {
    [key: string]: number;
  };
}

export const unitConversions: UnitConversion = {
  KG: {
    L: 1,
    LB: 2.2046,
    OZ: 35.274,
    G: 1000,
    ML: 1000,
    KG: 1,
  },
  G: {
    ML: 1,
    TSP: 0.20289,
    TBSP: 0.0676,
    LB: 0.0022,
    OZ: 0.0353,
    KG: 0.001,
    L: 0.001,
    G: 1,
  },
  LB: {
    KG: 0.4536,
    G: 453.592,
    OZ: 16,
    LB: 1,
  },
  ML: {
    L: 0.001,
    KG: 0.001,
    G: 1,
    OZ: 0.03381,
    TBSP: 0.0676,
    TSP: 0.20289,
    CUP: 0.00422675,
    ML: 1,
  },
  L: {
    ML: 1000,
    OZ: 33.814,
    G: 1000,
    KG: 1,
    TBSP: 67.628,
    TSP: 202.884,
    CUP: 4.22675,
    L: 1,
  },
  OZ: {
    ML: 29.5735,
    L: 0.0296,
    G: 28.349,
    KG: 0.02835,
    LB: 0.0625,
    TBSP: 1.01442,
    TSP: 3.04346,
    CUP: 0.125,
    OZ: 1,
  },

  TSP: {
    ML: 4.92892,
    TBSP: 0.33333,
    G: 4.92892,
    KG: 0.00493,
    L: 0.00493,
    TSP: 1,
  },

  TBSP: {
    ML: 14.7868,
    TSP: 3,
    G: 14.7868,
    KG: 0.01479,
    L: 0.01479,
    TBSP: 1,
  },

  CUP: {
    ML: 236.588,
    G: 236.588,
    KG: 0.23659,
    L: 0.23659,
    CUP: 1,
  },

  UN: {
    UN: 1,
  },
};
