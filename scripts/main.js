document.addEventListener('DOMContentLoaded', () => {
  const down = document.getElementById('scrollDown');
  const toTop = document.getElementById('toTop');
  const schedule = document.getElementById('schedule');

  function formatDateToRussian(dateString) {
    // Parse date string (YYYY-MM-DD format) and treat it as Moscow time
    const [year, month, day] = dateString.split('-').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    return `${utcDate.getUTCDate()} ${months[utcDate.getUTCMonth()]}`;
  }

  function populateDates() {
    const dateRows = document.querySelectorAll('.table-row[data-date]');
    
    dateRows.forEach(row => {
      const dateStr = row.getAttribute('data-date');
      const dateCell = row.querySelector('.date-cell');
      
      if (dateStr && dateCell) {
        dateCell.textContent = formatDateToRussian(dateStr);
      }
    });
  }

  function hidePastConcerts() {
    // Get Moscow time (UTC+3)
    const now = new Date();
    const moscowTime = new Date(now.getTime() + (180 - now.getTimezoneOffset()) * 60000);
    moscowTime.setHours(0, 0, 0, 0);
    
    const concertRows = document.querySelectorAll('.table-row[data-date]');
    
    concertRows.forEach(row => {
      const concertDateStr = row.getAttribute('data-date');
      if (concertDateStr) {
        const [year, month, day] = concertDateStr.split('-').map(Number);
        const concertDate = new Date(Date.UTC(year, month - 1, day));
        
        if (concertDate < moscowTime) {
          row.style.display = 'none';
        }
      }
    });
  }

  function startAnimations() {
    const heroImage = document.querySelector('.hero-image');
    const rotatingCircles = document.querySelector('.rotating-circles');
    const circles = document.querySelector('.circles');
    const scrollCue = document.querySelector('.scroll-cue');
    const sectionTitle = document.querySelector('.section-title');
    const table = document.querySelector('.table');

    if (heroImage) heroImage.classList.add('loaded');
    if (rotatingCircles) rotatingCircles.classList.add('loaded');
    if (circles) circles.classList.add('loaded');
    if (scrollCue) scrollCue.classList.add('loaded');
    if (sectionTitle) sectionTitle.classList.add('loaded');
    if (table) table.classList.add('loaded');
  }

  populateDates();
  hidePastConcerts();

  window.addEventListener('load', () => {
    setTimeout(startAnimations, 100);
  });

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
});
