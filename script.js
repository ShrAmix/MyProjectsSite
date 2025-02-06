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






// Функція для відкриття модального вікна
function openImageModal(imgElement) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modal.style.display = "block";  // Показуємо модальне вікно
  modalImage.src = imgElement.src;  // Встановлюємо джерело зображення в модальному вікні
}
// Закриття модального вікна при натисканні на зображення
document.getElementById("modalImage").onclick = function() {
  closeModalI();
}
// Функція для закриття модального вікна
function closeModalI() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";  // Приховуємо модальне вікно
}
// Функція для закриття модального вікна
function closeModal(event) {
  // Перевіряємо, чи був клік по самому модальному вікну, а не по зображенню або кнопці
  if (event.target == event.currentTarget) {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";  // Приховуємо модальне вікно
  }
}

// Закриття модального вікна при натисканні на будь-яке місце за межами зображення
window.onclick = function(event) {
  const modal = document.getElementById("imageModal");
  if (event.target == modal) {
    closeModal(event);
  }
}
