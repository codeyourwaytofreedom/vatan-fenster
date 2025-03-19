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
