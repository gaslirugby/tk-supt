document.addEventListener('DOMContentLoaded', () => {
  const down = document.getElementById('scrollDown');
  const toTop = document.getElementById('toTop');
  const schedule = document.getElementById('schedule');
  const circlesContainer = document.getElementById('circlesContainer');

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
