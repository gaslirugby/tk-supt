document.addEventListener('DOMContentLoaded', () => {
  const down = document.getElementById('scrollDown');
  const toTop = document.getElementById('toTop');
  const schedule = document.getElementById('schedule');

  // Fix iOS viewport height issues
  function fixIOSViewport() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
      // On iOS, use position fixed to prevent Safari's dynamic UI issues
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // On other browsers, just prevent overflow
      document.body.style.overflow = 'hidden';
    }
  }

  // Apply the viewport fix
  fixIOSViewport();

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
});
