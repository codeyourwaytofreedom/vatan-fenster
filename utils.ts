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
  h: number,
  multiWidth?: Record<string, number>
) => {
  // if multiWidth, check each section's area and if any area is greater than 3.6 m2
  // then take m2 price as 59 instead of 8 because thicker glass is used
  if (multiWidth) {
    const additionalWindowGlassPrice = Object.values(multiWidth).reduce((acc, sectionWidth) => {
      const sectionArea = (sectionWidth * h) / 1_000_000;
      m2Price = sectionArea > 3.6 ? 59 : 8;
      const sectionGlassPrice = (sectionWidth * h * m2Price * 2) / 1_000_000;
      return acc + sectionGlassPrice;
    }, 0);
    const truncatedAdditionalWindowPrice = Math.floor(additionalWindowGlassPrice * 100) / 100;
    return truncatedAdditionalWindowPrice;
  }
  // for single section window, take the m2 price as 8
  // this is only for 1Flugel
  const additionalWindowGlassPrice = (w * h * m2Price * 2) / 1_000_000;
  const truncatedAdditionalWindowPrice = Math.floor(additionalWindowGlassPrice * 100) / 100;
  return truncatedAdditionalWindowPrice;
};
