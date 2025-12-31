import {
  colorPriceMultipliersExteriorOnly,
  colorPriceMultipliersInteriorExteriorSame,
  colorPriceMultipliersInteriorOnly,
} from './data/priceLists/colors/colorPriceMultipliers';
import { ornamentPriceMultipliers } from './data/priceLists/ornament/ornamentPriceMultipliers';
import {
  ColorCode,
  MidColor,
  midColorsForAussenEqualsInnen,
} from './data/selectionItems/farbenData';
import { FensterConfig } from './types/Configurator';
interface ScrollProps {
  elementId?: string;
  delay?: number;
  offset?: number;
  htmlElement?: HTMLElement;
}
export const scrollToElement = ({
  elementId = '',
  delay = 0,
  offset = 150,
  htmlElement,
}: ScrollProps) => {
  setTimeout(() => {
    const targetElement = htmlElement ?? document.getElementById(elementId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, delay);
};

export const extractPriceFromTable = (
  priceTable: Record<number, Record<number, number>>,
  width: number,
  height: number
) => {
  try {
    for (const [key, value] of Object.entries(priceTable)) {
      const keyAsNumber = Number(key);
      if (height === keyAsNumber || height < keyAsNumber) {
        for (const [w, price] of Object.entries(value)) {
          const wid = Number(w);
          if (width === wid || width < wid) {
            return price;
          }
        }
        break;
      }
    }
  } catch {}
};

interface GlassPriceDeterminants {
  selectedOrnamentKey: string;
  w: number;
  h: number;
  is3Layered: boolean;
  multiWidth?: Record<string, number>;
}
export const calculateGlassPriceByM2 = ({
  w,
  h,
  multiWidth,
  is3Layered,
  selectedOrnamentKey,
}: GlassPriceDeterminants) => {
  const basicGlassM2PriceMultipliers = [8, 10.8, 11.6, 12.8];
  const ornamentAvailable = selectedOrnamentKey !== 'nein';
  const ornamentGlassPriceMultipliers = ornamentPriceMultipliers(selectedOrnamentKey, is3Layered);

  const ornamentReplacedInFirstLayer = ['antisolBraun4', 'antisolGrun4'].includes(
    selectedOrnamentKey
  );

  // if ornament is available and glass is 3Layered, the second layer is replaced by ornamentPriceMultipliers
  // if ornament is available and glass is 3Layered and ornament is antisolBraun4 or antisolGrun4
  // the first layer is replaced by ornamentPriceMultipliers
  const _3LayerGlassPriceMultipliers =
    ornamentAvailable && ornamentReplacedInFirstLayer
      ? {
          interior: ornamentGlassPriceMultipliers,
          middle: [41, 55.35, 59.45, 65.6],
          exterior: [29, 39.15, 42.05, 46.4],
        }
      : ornamentAvailable
        ? {
            interior: [8, 10.8, 11.6, 12.8],
            middle: ornamentGlassPriceMultipliers,
            exterior: [29, 39.15, 42.05, 46.4],
          }
        : {
            interior: [8, 10.8, 11.6, 12.8],
            middle: [41, 55.35, 59.45, 65.6],
            exterior: [29, 39.15, 42.05, 46.4],
          };

  /* MULTIPLE SECTION_WINDOW */

  //  according to the section area, get the m2 price and calculate that section's glass price
  if (multiWidth) {
    /* 3 Layered Glass with MultiWidth */
    if (is3Layered) {
      return Object.values(_3LayerGlassPriceMultipliers).reduce((sum, currentValue) => {
        return (
          sum +
          calculateLayerGlassPrice({
            multiWidth,
            multipliers: currentValue,
            w,
            h,
          })
        );
      }, 0);
    }

    /* 2 Layered Glass with MultiWidth */

    // first layer of glass for multi-section window type --> basicGlassM2PriceMultipliers
    const additionalWindowGlassPriceLayer1 = calculateLayerGlassPrice({
      multiWidth,
      multipliers: basicGlassM2PriceMultipliers,
      w,
      h,
    });
    // second layer, checks if ornament glass is selected
    const additionalWindowGlassPriceLayer2 = ornamentAvailable
      ? calculateLayerGlassPrice({ multiWidth, multipliers: ornamentGlassPriceMultipliers, w, h })
      : additionalWindowGlassPriceLayer1;

    //const additionalWindowGlassPriceLayer3 = is3Layered ? additionalWindowGlassPriceLayer1 : 0;
    return (
      additionalWindowGlassPriceLayer1 +
      additionalWindowGlassPriceLayer2 /* + additionalWindowGlassPriceLayer3 */
    );
  } else {
    /* SINGLE SECTION_WINDOW */

    /* 3_LAYERED GLASS */
    if (is3Layered) {
      return Object.values(_3LayerGlassPriceMultipliers).reduce((sum, currentValue) => {
        return (
          sum +
          calculateLayerGlassPrice({
            multipliers: currentValue,
            w,
            h,
          })
        );
      }, 0);
    }

    /* 2_LAYERED GLASS */

    // first layer of glass for single window --> basicGlassM2PriceMultipliers
    const additionalWindowGlassPriceLayer1 = calculateLayerGlassPrice({
      multipliers: basicGlassM2PriceMultipliers,
      w,
      h,
    });
    // second layer, checks if ornament glass is selected
    const additionalWindowGlassPriceLayer2 = ornamentAvailable
      ? calculateLayerGlassPrice({
          multipliers: ornamentGlassPriceMultipliers,
          w,
          h,
        })
      : additionalWindowGlassPriceLayer1;

    //const additionalWindowGlassPriceLayer3 = is3Layered ? additionalWindowGlassPriceLayer1 : 0;

    return (
      additionalWindowGlassPriceLayer1 +
      additionalWindowGlassPriceLayer2 /* + additionalWindowGlassPriceLayer3 */
    );
  }
};

type ColoringMultiplierParams = {
  colorExteriorCode: ColorCode;
  colorInteriorCode: ColorCode;
  colorMidKey: string;
  selectedProfileKey: string;
};

export const getColoringMultiplier = ({
  colorExteriorCode,
  colorInteriorCode,
  colorMidKey,
  selectedProfileKey,
}: Readonly<ColoringMultiplierParams>) => {
  // No Colours
  if (colorExteriorCode === '0' && colorInteriorCode === '0') {
    // no color multplier
    return { colouringPriceMultiplier: 0, colorsAvailable: ['white'] };
  }
  // Interior Only
  if (colorExteriorCode === '0' && colorInteriorCode !== '0') {
    // no mid color price multiplier here
    const multiplier =
      (colorPriceMultipliersInteriorOnly?.find((mulp) => mulp.colorCode === colorInteriorCode)
        ?.priceMultiplier ?? 0) / 100;
    return {
      colouringPriceMultiplier: multiplier,
      min10: true,
      colorsAvailable: ['white'],
    };
  }
  // Exterior Only
  if (colorExteriorCode !== '0' && colorInteriorCode === '0') {
    // no mid color price multiplier here
    const multiplier =
      (colorPriceMultipliersExteriorOnly?.find((mulp) => mulp.colorCode === colorExteriorCode)
        ?.priceMultiplier ?? 0) / 100;
    return {
      colouringPriceMultiplier: multiplier,
      colorsAvailable: ['white'],
    };
  }
  // Exterior and Interior (Same Color)
  if (
    colorExteriorCode !== '0' &&
    colorInteriorCode !== '0' &&
    colorExteriorCode === colorInteriorCode
  ) {
    const colorMidPriceMultiplier = colorMidKey === 'white' ? 0 : 0.02;

    const multiplier =
      ((colorPriceMultipliersInteriorExteriorSame?.find(
        (mulp) => mulp.colorCode === colorExteriorCode
      )?.priceMultiplier ?? 0) /
        100) *
      2;

    // exctract available middle colors
    const midColorsAvailable: MidColor[] =
      midColorsForAussenEqualsInnen(selectedProfileKey)[colorInteriorCode];
    return {
      colouringPriceMultiplier: multiplier + colorMidPriceMultiplier,
      colorsAvailable: midColorsAvailable,
    };
  }
  // Exterior and Interior (Different Colors)
  if (
    colorExteriorCode !== '0' &&
    colorInteriorCode !== '0' &&
    colorExteriorCode !== colorInteriorCode
  ) {
    // +0.02 is static mid color price multiplier
    // cancelled for now
    return {
      colouringPriceMultiplier: 0.21 /* + 0.02, */,
      min10: true,
      colorsAvailable: ['white', 'dark-brown', 'antrasite'],
    };
  }
  return { colouringPriceMultiplier: 999 };
};

function extractGlassM2Price(m2: number, multipliers: number[]) {
  return m2 <= 4
    ? multipliers[0]
    : m2 > 4 && m2 <= 5
      ? multipliers[1]
      : m2 > 5 && m2 <= 7
        ? multipliers[2]
        : multipliers[3];
}

interface GlassLayerPriceDeterminants {
  h: number;
  w: number;
  multiWidth?: Record<string, number>;
  multipliers: number[];
}

function calculateLayerGlassPrice({ multiWidth, multipliers, w, h }: GlassLayerPriceDeterminants) {
  if (multiWidth) {
    return Object.values(multiWidth).reduce((acc, sectionWidth) => {
      const sectionArea = (sectionWidth * h) / 1_000_000;
      const m2Price = extractGlassM2Price(sectionArea, multipliers);
      const sectionGlassPrice = (sectionWidth * h * m2Price) / 1_000_000;
      return acc + sectionGlassPrice;
    }, 0);
  } else {
    const m2 = (w * h) / 1_000_000;
    const m2Price = extractGlassM2Price(m2, multipliers);
    return m2 * m2Price;
  }
}

type AnyRecord = Record<string, unknown>;

function deepStrip(value: unknown, keysToDelete: Set<string>): void {
  if (Array.isArray(value)) {
    value.forEach((item) => deepStrip(item, keysToDelete));
    return;
  }

  if (value && typeof value === 'object') {
    const obj = value as AnyRecord;

    Object.keys(obj).forEach((key) => {
      if (keysToDelete.has(key)) {
        delete obj[key];
      } else {
        deepStrip(obj[key], keysToDelete);
      }
    });
  }
}

export function stripConfigKeys(
  config: FensterConfig,
  keysToDelete: string[] = []
) {
  const stripped = structuredClone(config);

  deepStrip(stripped, new Set(keysToDelete));

  return stripped;
}

export function purifyConfig(
  config: FensterConfig,
  keysToDelete: string[] = []
) {
  return stripConfigKeys(config, keysToDelete);
}

