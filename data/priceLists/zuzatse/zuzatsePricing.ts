import { WindowProfilePlastic } from '@/types/Configurator';

export const sicherheitsbeschlagePricing: Record<WindowProfilePlastic, Record<string, number>> = {
  I5: {
    basissicherheit: 0,
    aufbohrschutz: 3,
    rc1n: 40,
    rc2n: 140,
  },
  I5C: {
    basissicherheit: 0,
    aufbohrschutz: 3,
    rc1n: 40,
    rc2n: 140,
  },
  IL: {
    basissicherheit: 0,
    aufbohrschutz: 3,
    rc1n: 40,
    rc2n: 140,
  },
  IE: {
    basissicherheit: 0,
    rc1n: 3,
    rc2n: 140,
  },
  IEC: {
    basissicherheit: 0,
    rc1n: 3,
    rc2n: 140,
  },
};

export const verdecktLiegenderBeschlagPricing: Record<string, number> = {
  nein: 0,
  ja: 120,
};

export const dünneSchweißnahtVPerfectPricing: Record<'nein' | 'ja', number> = {
  nein: 0,
  ja: 0,
};

export const reedKontaktPricing: Record<string, number> = {
  nein: 0,
  ja: 140,
};

export const lüftungssystemePricing: Record<string, number> = {
  fRegelAir: 60,
  fMacoVent: 50,
};

const I5_I5C_IL = {
  innenAndAussenWeiss: {
    15: {
      pricePerMeter: 13,
      assembly: 22,
    },
    30: {
      pricePerMeter: 26,
      assembly: 44,
    },
    35: {
      pricePerMeter: 25,
      assembly: 22,
    },
    50: {
      pricePerMeter: 38,
      assembly: 44,
    },
    60: {
      pricePerMeter: 37,
      assembly: 22,
    },
    70: {
      pricePerMeter: 50,
      assembly: 44,
    },
    95: {
      pricePerMeter: 62,
      assembly: 44,
    },
    100: {
      pricePerMeter: 51,
      assembly: 22,
    },
    115: {
      pricePerMeter: 64,
      assembly: 44,
    },
    120: {
      pricePerMeter: 64,
      assembly: 44,
    },
    135: {
      pricePerMeter: 76,
      assembly: 44,
    },
    150: {
      pricePerMeter: 89,
      assembly: 66,
    },
    160: {
      pricePerMeter: 88,
      assembly: 44,
    },
    180: {
      pricePerMeter: 111,
      assembly: 66,
    },
    200: {
      pricePerMeter: 102,
      assembly: 44,
    },
    215: {
      pricePerMeter: 155,
      assembly: 66,
    },
    235: {
      pricePerMeter: 127,
      assembly: 66,
    },
    250: {
      pricePerMeter: 140,
      assembly: 88,
    },
    300: {
      pricePerMeter: 153,
      assembly: 66,
    },
  },
  innenOrAussenWeiss: {
    15: {
      pricePerMeter: 22,
      assembly: 22,
    },
    30: {
      pricePerMeter: 44,
      assembly: 44,
    },
    35: {
      pricePerMeter: 40,
      assembly: 22,
    },
    50: {
      pricePerMeter: 62,
      assembly: 44,
    },
    60: {
      pricePerMeter: 62,
      assembly: 22,
    },
    70: {
      pricePerMeter: 80,
      assembly: 44,
    },
    95: {
      pricePerMeter: 102,
      assembly: 44,
    },
    100: {
      pricePerMeter: 71,
      assembly: 22,
    },
    115: {
      pricePerMeter: 93,
      assembly: 44,
    },
    120: {
      pricePerMeter: 124,
      assembly: 44,
    },
    135: {
      pricePerMeter: 111,
      assembly: 44,
    },
    150: {
      pricePerMeter: 133,
      assembly: 66,
    },
    160: {
      pricePerMeter: 133,
      assembly: 44,
    },
    180: {
      pricePerMeter: 186,
      assembly: 66,
    },
    200: {
      pricePerMeter: 142,
      assembly: 44,
    },
    215: {
      pricePerMeter: 164,
      assembly: 66,
    },
    235: {
      pricePerMeter: 182,
      assembly: 66,
    },
    250: {
      pricePerMeter: 204,
      assembly: 88,
    },
    300: {
      pricePerMeter: 213,
      assembly: 66,
    },
  },
  innenAndAussenDifferent: {
    15: {
      pricePerMeter: 25,
      assembly: 22,
    },
    30: {
      pricePerMeter: 50,
      assembly: 44,
    },
    35: {
      pricePerMeter: 45,
      assembly: 22,
    },
    50: {
      pricePerMeter: 70,
      assembly: 44,
    },
    60: {
      pricePerMeter: 67,
      assembly: 22,
    },
    70: {
      pricePerMeter: 90,
      assembly: 44,
    },
    95: {
      pricePerMeter: 112,
      assembly: 44,
    },
    100: {
      pricePerMeter: 75,
      assembly: 22,
    },
    115: {
      pricePerMeter: 100,
      assembly: 44,
    },
    120: {
      pricePerMeter: 134,
      assembly: 44,
    },
    135: {
      pricePerMeter: 120,
      assembly: 44,
    },
    150: {
      pricePerMeter: 145,
      assembly: 66,
    },
    160: {
      pricePerMeter: 142,
      assembly: 44,
    },
    180: {
      pricePerMeter: 201,
      assembly: 66,
    },
    200: {
      pricePerMeter: 150,
      assembly: 44,
    },
    215: {
      pricePerMeter: 175,
      assembly: 66,
    },
    235: {
      pricePerMeter: 195,
      assembly: 66,
    },
    250: {
      pricePerMeter: 220,
      assembly: 88,
    },
    300: {
      pricePerMeter: 225,
      assembly: 66,
    },
  },
};

const IE_IEC = {
  innenAndAussenWeiss: {
    15: {
      pricePerMeter: 15,
      assembly: 22,
    },
    30: {
      pricePerMeter: 30,
      assembly: 44,
    },
    35: {
      pricePerMeter: 37,
      assembly: 22,
    },
    50: {
      pricePerMeter: 52,
      assembly: 44,
    },
    60: {
      pricePerMeter: 46,
      assembly: 22,
    },
    70: {
      pricePerMeter: 74,
      assembly: 44,
    },
    95: {
      pricePerMeter: 83,
      assembly: 44,
    },
    100: {
      pricePerMeter: 86,
      assembly: 22,
    },
    115: {
      pricePerMeter: 101,
      assembly: 44,
    },
    120: {
      pricePerMeter: 96,
      assembly: 44,
    },
    135: {
      pricePerMeter: 123,
      assembly: 44,
    },
    150: {
      pricePerMeter: 138,
      assembly: 66,
    },
    160: {
      pricePerMeter: 132,
      assembly: 44,
    },
    180: {
      pricePerMeter: 138,
      assembly: 66,
    },
    200: {
      pricePerMeter: 172,
      assembly: 44,
    },
    215: {
      pricePerMeter: 187,
      assembly: 66,
    },
    235: {
      pricePerMeter: 209,
      assembly: 66,
    },
    250: {
      pricePerMeter: 224,
      assembly: 88,
    },
    300: {
      pricePerMeter: 258,
      assembly: 66,
    },
  },
  innenOrAussenWeiss: {
    15: {
      pricePerMeter: 24,
      assembly: 22,
    },
    30: {
      pricePerMeter: 48,
      assembly: 44,
    },
    35: {
      pricePerMeter: 58,
      assembly: 22,
    },
    50: {
      pricePerMeter: 72,
      assembly: 44,
    },
    60: {
      pricePerMeter: 72,
      assembly: 22,
    },
    70: {
      pricePerMeter: 116,
      assembly: 44,
    },
    95: {
      pricePerMeter: 130,
      assembly: 44,
    },
    100: {
      pricePerMeter: 117,
      assembly: 22,
    },
    115: {
      pricePerMeter: 141,
      assembly: 44,
    },
    120: {
      pricePerMeter: 144,
      assembly: 44,
    },
    135: {
      pricePerMeter: 175,
      assembly: 44,
    },
    150: {
      pricePerMeter: 199,
      assembly: 66,
    },
    160: {
      pricePerMeter: 189,
      assembly: 44,
    },
    180: {
      pricePerMeter: 216,
      assembly: 66,
    },
    200: {
      pricePerMeter: 234,
      assembly: 44,
    },
    215: {
      pricePerMeter: 258,
      assembly: 66,
    },
    235: {
      pricePerMeter: 292,
      assembly: 66,
    },
    250: {
      pricePerMeter: 316,
      assembly: 88,
    },
    300: {
      pricePerMeter: 351,
      assembly: 66,
    },
  },
  innenAndAussenDifferent: {
    15: {
      pricePerMeter: 27,
      assembly: 22,
    },
    30: {
      pricePerMeter: 54,
      assembly: 44,
    },
    35: {
      pricePerMeter: 63,
      assembly: 22,
    },
    50: {
      pricePerMeter: 90,
      assembly: 44,
    },
    60: {
      pricePerMeter: 82,
      assembly: 22,
    },
    70: {
      pricePerMeter: 126,
      assembly: 44,
    },
    95: {
      pricePerMeter: 145,
      assembly: 44,
    },
    100: {
      pricePerMeter: 126,
      assembly: 22,
    },
    115: {
      pricePerMeter: 153,
      assembly: 44,
    },
    120: {
      pricePerMeter: 164,
      assembly: 44,
    },
    135: {
      pricePerMeter: 189,
      assembly: 44,
    },
    150: {
      pricePerMeter: 216,
      assembly: 66,
    },
    160: {
      pricePerMeter: 208,
      assembly: 44,
    },
    180: {
      pricePerMeter: 246,
      assembly: 66,
    },
    200: {
      pricePerMeter: 252,
      assembly: 44,
    },
    215: {
      pricePerMeter: 279,
      assembly: 66,
    },
    235: {
      pricePerMeter: 315,
      assembly: 66,
    },
    250: {
      pricePerMeter: 342,
      assembly: 88,
    },
    300: {
      pricePerMeter: 378,
      assembly: 66,
    },
  },
};

export const rahmenverbreiterungPricing: Record<
  string,
  Record<
    'innenAndAussenWeiss' | 'innenOrAussenWeiss' | 'innenAndAussenDifferent',
    Record<number, { pricePerMeter: number; assembly: number }>
  >
> = {
  I5: I5_I5C_IL,
  I5C: I5_I5C_IL,
  IL: I5_I5C_IL,
  IE: IE_IEC,
  IEC: IE_IEC,
};
