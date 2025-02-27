export const scrollToElement = (elementId: string, delay: number = 0) => {
  setTimeout(() => {
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          window.scrollBy({ top: -50, behavior: 'smooth' });
        }, 500);
      }
  }, delay);
};

