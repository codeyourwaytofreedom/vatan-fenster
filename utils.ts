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

export const extractPriceFromTable = (priceTable: Record<number, Record<number, number>>, width: number, height: number) => {
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
  } catch {
  }
}


export const calculateGlassPriceByM2 = (m2Price: number = 8, w: number, h: number) => {
    const additionalWindowPrice = (w * h * m2Price * 2) / 1_000_000;
    const truncatedAdditionalWindowPrice = Math.floor(additionalWindowPrice * 100) / 100;
    return truncatedAdditionalWindowPrice;
};