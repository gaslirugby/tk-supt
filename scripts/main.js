document.addEventListener('DOMContentLoaded', () => {
  const down = document.getElementById('scrollDown');
  const toTop = document.getElementById('toTop');
  const schedule = document.getElementById('schedule');

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
