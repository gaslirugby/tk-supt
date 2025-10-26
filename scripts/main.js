document.addEventListener('DOMContentLoaded', () => {
  const down = document.getElementById('scrollDown');
  const toTop = document.getElementById('toTop');
  const schedule = document.getElementById('schedule');
  const circlesContainer = document.getElementById('circlesContainer');

  // Wait for all resources to load before starting animations
  function startAnimations() {
    const heroImage = document.querySelector('.hero-image');
    const rotatingCircles = document.querySelector('.rotating-circles');
    const circles = document.querySelector('.circles');
    const scrollCue = document.querySelector('.scroll-cue');
    const sectionTitle = document.querySelector('.section-title');
    const table = document.querySelector('.table');

    // Add loaded class to trigger animations
    if (heroImage) heroImage.classList.add('loaded');
    if (rotatingCircles) rotatingCircles.classList.add('loaded');
    if (circles) circles.classList.add('loaded');
    if (scrollCue) scrollCue.classList.add('loaded');
    if (sectionTitle) sectionTitle.classList.add('loaded');
    if (table) table.classList.add('loaded');

    console.log('All animations started after page load');
  }

  // Start animations after all images are loaded
  window.addEventListener('load', () => {
    // Small delay to ensure everything is ready
    setTimeout(startAnimations, 100);
  });

  // Fallback: start animations after DOM is ready if load event takes too long
  setTimeout(() => {
    if (!document.querySelector('.hero-image.loaded')) {
      console.log('Fallback: Starting animations after timeout');
      startAnimations();
    }
  }, 2000);

  if (down && schedule) {
    down.addEventListener('click', () => {
      schedule.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (toTop) {
    toTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Blend modes functionality
  if (circlesContainer) {
    const blendModes = [
      'normal',
      'multiply',
      'screen', 
      'overlay',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'hard-light',
      'soft-light',
      'difference',
      'exclusion',
      'hue',
      'saturation',
      'color',
      'luminosity'
    ];

    let currentBlendIndex = 0;

    circlesContainer.addEventListener('click', () => {
      // Remove current blend mode class
      const currentBlendMode = blendModes[currentBlendIndex];
      if (currentBlendMode !== 'normal') {
        circlesContainer.classList.remove(`blend-${currentBlendMode}`);
      }

      // Move to next blend mode
      currentBlendIndex = (currentBlendIndex + 1) % blendModes.length;
      const newBlendMode = blendModes[currentBlendIndex];

      // Add new blend mode class
      if (newBlendMode !== 'normal') {
        circlesContainer.classList.add(`blend-${newBlendMode}`);
      }

      // Optional: Add visual feedback
      circlesContainer.style.transform = 'scale(1.02)';
      setTimeout(() => {
        circlesContainer.style.transform = '';
      }, 150);

      // Optional: Console log for debugging
      console.log(`Blend mode changed to: ${newBlendMode}`);
    });
  }
});
