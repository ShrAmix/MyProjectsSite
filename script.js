// Отримуємо поточну мову з localStorage або встановлюємо за замовчуванням 'uk'
let currentLanguage = localStorage.getItem('language') || 'uk'; 

// Змінна для зберігання даних мови
let languageData = {};

// Завантаження мови з JSON-файлу
const loadLanguage = (language) => {
  fetch(`${language}.json`)
    .then(response => response.json())
    .then(data => {
      languageData = data;  // Зберігаємо дані мови
      updateTextContent();  // Оновлюємо текст на сторінці
    })
    .catch(error => console.error('Error loading language file:', error));
};

// Оновлення тексту на сторінці для елементів з атрибутом data-key
const updateTextContent = () => {
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    if (languageData[key]) {
      element.textContent = languageData[key];
    }
  });
};

// Завантажуємо мову за замовчуванням або з localStorage
loadLanguage(currentLanguage);

// Обробка подій для кнопок зміни мови
document.getElementById('ukrainian').addEventListener('click', () => changeLanguage('uk'));
document.getElementById('english').addEventListener('click', () => changeLanguage('en'));

// Зміна мови
const changeLanguage = (language) => {
  currentLanguage = language;
  localStorage.setItem('language', currentLanguage);
  loadLanguage(currentLanguage);
};

// Подія для кнопки "Дізнатися більше"
document.getElementById("myButton").addEventListener("click", () => alert("Скоро буде більше інформації!"));

// Плавне прокручування до секцій на сторінці
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Обробка подій для збільшення та зменшення зображень
document.querySelectorAll('.game-image').forEach(image => {
  image.addEventListener('click', (e) => {
    const clickedImage = e.target;
    toggleImageSize(clickedImage);
  });

  // Змінюємо розмір зображення за допомогою колеса миші
  image.addEventListener('wheel', (e) => {
    if (image.classList.contains('expanded')) {
      const scale = e.deltaY > 0 ? 0.9 : 1.1;
      const currentScale = parseFloat(image.style.transform.replace('scale(', '').replace(')', '')) || 1;
      image.style.transform = `scale(${currentScale * scale})`;
    }
  });
});

// Функція для зміни розміру зображення
const toggleImageSize = (image) => {
  if (image.classList.contains('expanded')) {
    image.classList.remove('expanded');
    image.style.transform = 'scale(1)';
  } else {
    image.classList.add('expanded');
    image.style.transform = 'scale(1.9)';
  }
};

// Модальне вікно для зображень
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");

// Відкриття модального вікна
const openModal = (img) => {
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
};

// Закриття модального вікна
const closeModal = () => {
  modal.style.display = "none";
};

// Додаємо події для картинок для відкриття модального вікна
document.querySelectorAll(".game-image").forEach(image => {
  image.onclick = () => openModal(image);
});

// Закриття модального вікна при натисканні на фон
window.onclick = (event) => {
  if (event.target === modal) closeModal();
};
