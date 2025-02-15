export const scrollToElement = (elementId: string) => {
  const interval = setInterval(() => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        window.scrollBy({ top: -50, behavior: 'smooth' });
      }, 500);

      clearInterval(interval);
    }
  }, 10);
};
