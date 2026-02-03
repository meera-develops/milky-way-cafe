// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  // Highlight active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});

// ===== EVENTS CALENDAR =====
const cafeEvents = [
  { date: '2026-02-06', time: '7:00 PM - 9:00 PM', name: 'Trivia Night', icon: 'fa-solid fa-brain', desc: 'Test your knowledge with themed trivia rounds and win prizes!' },
  { date: '2026-02-13', time: '7:00 PM - 9:00 PM', name: 'Valentines Matchmaking', icon: 'fa-solid fa-heart', desc: 'Meet someone special over coffee and conversation.' },
  { date: '2026-02-27', time: '7:00 PM - 9:00 PM', name: 'Cat Cafe Night', icon: 'fa-solid fa-cat', desc: 'Enjoy your latte with adorable adoptable cats.' },
  { date: '2026-03-06', time: '7:00 PM - 9:00 PM', name: 'Open Mic Night', icon: 'fa-solid fa-microphone', desc: 'Sing, perform poetry, or share your story on stage.' },
  { date: '2026-03-13', time: '7:00 PM - 9:00 PM', name: 'Pi Day Celebration', icon: 'fa-solid fa-chart-pie', desc: 'Free pie slice with any drink purchase!' },
  { date: '2026-03-20', time: '7:00 PM - 9:00 PM', name: 'Live Music', icon: 'fa-solid fa-music', desc: 'Local artists perform live acoustic sets.' },
  { date: '2026-04-03', time: '7:00 PM - 9:00 PM', name: 'Latte Art Workshop', icon: 'fa-solid fa-mug-hot', desc: 'Learn to pour beautiful latte art from our baristas.' },
  { date: '2026-04-17', time: '7:00 PM - 9:00 PM', name: 'Board Game Night', icon: 'fa-solid fa-dice', desc: 'Bring friends or meet new ones over classic board games.' },
  { date: '2026-04-24', time: '7:00 PM - 9:00 PM', name: 'Cookie Decorating Class', icon: 'fa-solid fa-cookie-bite', desc: 'Decorate your own cookies with our pastry chef. All supplies included!' },
];

// ===== EVENTS CAROUSEL (Home Page) =====
function initEventsCarousel() {
  const track = document.getElementById('eventsCarouselTrack');
  if (!track) return;

  const monthNames = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
  const dayNames = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];

  // Render all event cards
  cafeEvents.forEach(ev => {
    const d = new Date(ev.date + 'T00:00:00');
    const dateLabel = `${dayNames[d.getDay()]} ${monthNames[d.getMonth()]} ${d.getDate()}`;
    const card = document.createElement('a');
    card.href = 'events.html';
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-icon"><i class="${ev.icon}"></i></div>
      <div class="event-date">${dateLabel}</div>
      <div class="event-time">${ev.time}</div>
      <div class="event-name">${ev.name}</div>
      <div class="event-desc">${ev.desc}</div>
    `;
    track.appendChild(card);
  });

  const prevBtn = track.closest('.events-carousel').querySelector('.carousel-prev');
  const nextBtn = track.closest('.events-carousel').querySelector('.carousel-next');
  let currentIndex = 0;

  function getVisibleCount() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function getMaxIndex() {
    return Math.max(0, cafeEvents.length - getVisibleCount());
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const gapRem = visibleCount === 1 ? 0 : 1.5;
    const cardPercent = 100 / visibleCount;
    track.style.transform = `translateX(calc(-${currentIndex * cardPercent}% - ${gapRem * currentIndex}rem))`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    updateCarousel();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initEventsCarousel();
});

function initCalendar() {
  const grid = document.getElementById('calendarGrid');
  const detailsGrid = document.getElementById('eventDetailsGrid');
  if (!grid || !detailsGrid) return;

  const monthYearEl = document.querySelector('.calendar-month-year');
  const prevBtn = document.querySelector('.calendar-prev');
  const nextBtn = document.querySelector('.calendar-next');
  const headingEl = document.querySelector('.event-details-heading');

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function getEventsForMonth(year, month) {
    return cafeEvents.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  function getEventsForDate(dateStr) {
    return cafeEvents.filter(e => e.date === dateStr);
  }

  function formatDateStr(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function renderEventCards(events, label) {
    headingEl.textContent = label;
    detailsGrid.innerHTML = '';
    if (events.length === 0) {
      detailsGrid.innerHTML = '<p class="no-events-msg">No events scheduled. Check back soon!</p>';
      return;
    }
    events.forEach(ev => {
      const d = new Date(ev.date + 'T00:00:00');
      const dateLabel = monthNames[d.getMonth()] + ' ' + d.getDate();
      const card = document.createElement('div');
      card.className = 'event-detail-card';
      card.innerHTML = `
        <div class="event-detail-icon"><i class="${ev.icon}"></i></div>
        <div class="event-detail-date">${dateLabel}</div>
        <div class="event-detail-time">${ev.time}</div>
        <div class="event-detail-name">${ev.name}</div>
        <div class="event-detail-desc">${ev.desc}</div>
      `;
      detailsGrid.appendChild(card);
    });
  }

  function renderCalendar() {
    monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    grid.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-day empty';
      grid.appendChild(empty);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateStr(currentYear, currentMonth, day);
      const dayEvents = getEventsForDate(dateStr);
      const cell = document.createElement('div');
      cell.className = 'calendar-day';
      cell.textContent = day;

      if (today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
        cell.classList.add('today');
      }

      if (dayEvents.length > 0) {
        cell.classList.add('has-event');
        cell.addEventListener('click', () => {
          if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
            const monthEvents = getEventsForMonth(currentYear, currentMonth);
            renderEventCards(monthEvents, `Events in ${monthNames[currentMonth]}`);
          } else {
            grid.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
            const d = new Date(dateStr + 'T00:00:00');
            renderEventCards(dayEvents, `Events on ${monthNames[d.getMonth()]} ${d.getDate()}`);
          }
        });
      }

      grid.appendChild(cell);
    }

    // Show all events for this month by default
    const monthEvents = getEventsForMonth(currentYear, currentMonth);
    renderEventCards(monthEvents, `Events in ${monthNames[currentMonth]}`);
  }

  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  renderCalendar();
}

// Initialize calendar if on events page
document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
});

// Simple form validation for contact page
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const firstName = form.querySelector('#first-name').value.trim();
  const lastName = form.querySelector('#last-name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!firstName || !lastName || !email || !message) {
    alert('Please fill out all required fields.');
    return;
  }

  alert('Thank you for your message, ' + firstName + '! We will get back to you shortly.');
  form.reset();
}
