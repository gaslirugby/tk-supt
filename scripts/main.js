document.addEventListener('DOMContentLoaded', () => {
  const down = document.getElementById('scrollDown');
  const toTop = document.getElementById('toTop');
  const schedule = document.getElementById('schedule');
  const table = document.querySelector('.table');

  function formatDateToRussian(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
  }

  function getMoscowToday() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function renderConcerts(concerts) {
    const today = getMoscowToday();
    const fragment = document.createDocumentFragment();

    concerts
      .filter(concert => concert.date && concert.city && concert.venue && concert.ticketUrl)
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter(concert => concert.date >= today)
      .forEach(concert => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.setAttribute('role', 'row');
        row.dataset.date = concert.date;

        const dateCell = document.createElement('div');
        dateCell.className = 'table-cell date-cell';
        dateCell.setAttribute('role', 'cell');
        dateCell.textContent = formatDateToRussian(concert.date);

        const cityCell = document.createElement('div');
        cityCell.className = 'table-cell';
        cityCell.setAttribute('role', 'cell');
        cityCell.textContent = concert.city;

        const venueCell = document.createElement('div');
        venueCell.className = 'table-cell';
        venueCell.setAttribute('role', 'cell');
        venueCell.textContent = concert.venue;

        const ticketCell = document.createElement('div');
        ticketCell.className = 'table-cell';
        ticketCell.setAttribute('role', 'cell');

        const link = document.createElement('a');
        link.className = 'buy';
        link.href = concert.ticketUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Купить';

        ticketCell.appendChild(link);
        row.append(dateCell, cityCell, venueCell, ticketCell);
        fragment.appendChild(row);
      });

    table.appendChild(fragment);
  }

  async function loadConcerts() {
    try {
      const response = await fetch('concerts.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const concerts = await response.json();
      if (!Array.isArray(concerts)) throw new Error('concerts.json must contain an array');
      renderConcerts(concerts);
    } catch (error) {
      console.error('Не удалось загрузить расписание концертов:', error);
      const message = document.createElement('p');
      message.className = 'schedule-error';
      message.textContent = 'Не удалось загрузить расписание. Попробуйте обновить страницу.';
      table.appendChild(message);
    }
  }

  function startAnimations() {
    const heroImage = document.querySelector('.hero-image');
    const rotatingCircles = document.querySelector('.rotating-circles');
    const circles = document.querySelector('.circles');
    const scrollCue = document.querySelector('.scroll-cue');
    const sectionTitle = document.querySelector('.section-title');

    if (heroImage) heroImage.classList.add('loaded');
    if (rotatingCircles) rotatingCircles.classList.add('loaded');
    if (circles) circles.classList.add('loaded');
    if (scrollCue) scrollCue.classList.add('loaded');
    if (sectionTitle) sectionTitle.classList.add('loaded');
    if (table) table.classList.add('loaded');
  }

  loadConcerts();

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
