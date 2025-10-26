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

export const rahmenverbreiterungPricing: Record<
  'innenAndAussenWeiss' | 'innenOrAussenWeiss' | 'innenAndAussenDifferent',
  Record<number, { pricePerMeter: number; assembly: number }>
> = {
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
