import { colorPriceMultipliersExteriorOnly, colorPriceMultipliersInteriorExteriorSame, colorPriceMultipliersInteriorOnly } from "./data/priceLists/colors/colorPriceMultipliers";

export const scrollToElement = (elementId: string, delay: number = 0, offset: number = 150) => {
  setTimeout(() => {
    const targetElement = document.getElementById(elementId);
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

export const calculateGlassPriceByM2 = (
  m2Price: number = 8,
  w: number,
  h: number
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => {
  // if multiWidth, check each section's area and if any area is greater than 3.6 m2
  // then take m2 price as 59 instead of 8 because thicker glass is used
  /* if (multiWidth) {
    const additionalWindowGlassPrice = Object.values(multiWidth).reduce((acc, sectionWidth) => {
      const sectionArea = (sectionWidth * h) / 1_000_000;
      //m2Price = sectionArea > 3.6 ? 59 : 8;
      m2Price =
        sectionArea < 4
          ? 8
          : sectionArea > 4 && sectionArea <= 5
            ? 10.8
            : sectionArea > 5 && sectionArea <= 7
              ? 11.6
              : 12.8;
      const sectionGlassPrice = (sectionWidth * h * m2Price * 2) / 1_000_000;
      return acc + sectionGlassPrice;
    }, 0);
    const truncatedAdditionalWindowPrice = Math.floor(additionalWindowGlassPrice * 100) / 100;
    return truncatedAdditionalWindowPrice;
  } */
  // for single section window
  const sectionArea = (w * h) / 1_000_000;
  m2Price =
    sectionArea < 4
      ? 8
      : sectionArea > 4 && sectionArea <= 5
        ? 10.8
        : sectionArea > 5 && sectionArea <= 7
          ? 11.6
          : 12.8;
  const additionalWindowGlassPrice = (w * h * m2Price * 2) / 1_000_000;
  return additionalWindowGlassPrice;
};

export const getColoringMultiplier = (colorExteriorCode: string, colorInteriorCode:string, selectedProfileKey: string) => {
  // No Colours
  if(colorExteriorCode === '0' && colorInteriorCode === '0'){
    return 0;
  }
  // Interior Only
  if(colorExteriorCode === '0' && colorInteriorCode !== '0'){
     return (colorPriceMultipliersInteriorOnly[selectedProfileKey]?.find(
        (mulp) => mulp.colorCode === colorInteriorCode
      )?.priceMultiplier ?? 0) / 100;
  }
  // Exterior Only
  if(colorExteriorCode !== '0' && colorInteriorCode === '0'){
    return (colorPriceMultipliersExteriorOnly[selectedProfileKey]?.find(
            (mulp) => mulp.colorCode === colorExteriorCode
          )?.priceMultiplier ?? 0) / 100;
  }
  // Exterior and Interior (Same Color)
  if(colorExteriorCode !== '0' && colorInteriorCode !== '0' && colorExteriorCode === colorInteriorCode){
        return (colorPriceMultipliersInteriorExteriorSame[selectedProfileKey]?.find(
            (mulp) => mulp.colorCode === colorExteriorCode
          )?.priceMultiplier ?? 0) / 100 * 2;
  }
  // Exterior and Interior (Different Colors)
  if(colorExteriorCode !== '0' && colorInteriorCode !== '0' && colorExteriorCode !== colorInteriorCode){
    return 0.21;
  }
  return 999;
}
