const slides = Array.from(document.querySelectorAll('.slide'));
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });
}

if (prevSlideBtn && nextSlideBtn && slides.length > 0) {
  prevSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const quiz = document.getElementById('immunityQuiz');
const quizResult = document.getElementById('quizResult');

if (quiz && quizResult) {
  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quiz);
    const score = Number(data.get('q1')) + Number(data.get('q2')) + Number(data.get('q3'));

    if (score <= 1) {
      quizResult.textContent = 'Рівень імунітету: низький. Почніть із базових алгоритмів перевірки та не приймайте рішень під тиском.';
      quizResult.style.color = '#ff8d68';
      return;
    }

    if (score === 2) {
      quizResult.textContent = 'Рівень імунітету: середній. Ви помічаєте частину ризиків, але варто посилити процедури верифікації.';
      quizResult.style.color = '#ffd26d';
      return;
    }

    quizResult.textContent = 'Рівень імунітету: високий. Ви застосовуєте правильну логіку і добре розпізнаєте шахрайські тригери.';
    quizResult.style.color = '#7ce8ad';
  });
}

// Theme and Font Size Management
const themeToggle = document.getElementById('themeToggle');
const fontIncrementBtn = document.getElementById('fontIncrement');
const fontDecrementBtn = document.getElementById('fontDecrement');
const htmlElement = document.documentElement;

// Load saved preferences
function loadPreferences() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedFontSize = localStorage.getItem('fontSize') || 'normal';
  
  if (savedTheme === 'light') {
    htmlElement.classList.add('light-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
  
  if (savedFontSize === 'sm') {
    htmlElement.classList.add('font-sm');
  } else if (savedFontSize === 'lg') {
    htmlElement.classList.add('font-lg');
  }
}

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('light-theme');
    const isLight = htmlElement.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });
}

// Font Size Controls
if (fontIncrementBtn && fontDecrementBtn) {
  fontIncrementBtn.addEventListener('click', () => {
    const current = htmlElement.className;
    htmlElement.classList.remove('font-sm', 'font-lg');
    if (current.includes('font-sm')) {
      htmlElement.classList.remove('font-sm');
      localStorage.setItem('fontSize', 'normal');
    } else if (!current.includes('font-lg')) {
      htmlElement.classList.add('font-lg');
      localStorage.setItem('fontSize', 'lg');
    } else {
      htmlElement.classList.add('font-lg');
      localStorage.setItem('fontSize', 'lg');
    }
  });

  fontDecrementBtn.addEventListener('click', () => {
    const current = htmlElement.className;
    htmlElement.classList.remove('font-sm', 'font-lg');
    if (current.includes('font-lg')) {
      htmlElement.classList.remove('font-lg');
      localStorage.setItem('fontSize', 'normal');
    } else if (!current.includes('font-sm')) {
      htmlElement.classList.add('font-sm');
      localStorage.setItem('fontSize', 'sm');
    } else {
      htmlElement.classList.add('font-sm');
      localStorage.setItem('fontSize', 'sm');
    }
  });
}

// Initialize preferences on page load
loadPreferences();
if (themeToggle) {
  themeToggle.textContent = htmlElement.classList.contains('light-theme') ? '☀️' : '🌙';
}
