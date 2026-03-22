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
