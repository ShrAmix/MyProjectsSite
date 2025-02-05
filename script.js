// Отримуємо поточну мову з localStorage або встановлюємо за замовчуванням 'uk' (якщо мова не була збережена)
let currentLanguage = localStorage.getItem('language') || 'uk'; 
// Змінна для зберігання даних мови (тексти для перекладу)
let languageData = {};

// Функція для завантаження мови з JSON-файлу
const loadLanguage = (language) => {
  // Виконуємо запит для отримання відповідного JSON-файлу для вибраної мови
  fetch(`${language}.json`)
    .then(response => response.json())  // Парсимо отриману відповідь як JSON
    .then(data => {
      languageData = data;  // Зберігаємо отримані дані у змінну languageData
      updateTextContent();  // Оновлюємо текст на сторінці
    })
    .catch(error => console.error('Error loading language file:', error));  // Якщо виникла помилка під час завантаження файлу
};

// Функція для оновлення тексту на сторінці для всіх елементів з атрибутом data-key
const updateTextContent = () => {
  // Отримуємо всі елементи, які мають атрибут 'data-key'
  const elementsToTranslate = document.querySelectorAll('[data-key]');
  
  // Для кожного елемента з атрибутом 'data-key'
  elementsToTranslate.forEach(element => {
    const key = element.getAttribute('data-key');  // Отримуємо ключ з атрибута data-key
    // Якщо в даних для поточної мови є відповідний текст по цьому ключу
    if (languageData[key]) {
      element.textContent = languageData[key];  // Оновлюємо текст елемента
    }
  });
};

// Завантажуємо мову за замовчуванням або з localStorage, якщо користувач вже вибрав мову раніше
loadLanguage(currentLanguage);

// Подія для кнопки "UA" (для української мови)
document.getElementById('ukrainian').addEventListener('click', () => {
  currentLanguage = 'uk';  // Встановлюємо українську мову
  localStorage.setItem('language', currentLanguage);  // Зберігаємо вибір мови в localStorage
  loadLanguage(currentLanguage);  // Завантажуємо українську мову
});

// Подія для кнопки "EN" (для англійської мови)
document.getElementById('english').addEventListener('click', () => {
  currentLanguage = 'en';  // Встановлюємо англійську мову
  localStorage.setItem('language', currentLanguage);  // Зберігаємо вибір мови в localStorage
  loadLanguage(currentLanguage);  // Завантажуємо англійську мову
});

// Подія для кнопки "Дізнатися більше" (натискання на кнопку)
document.getElementById("myButton").addEventListener("click", function() {
    alert("Скоро буде більше інформації!");  // Виводимо повідомлення при натисканні
});

// Подія для плавного прокручування по сторінці при натисканні на посилання
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Блокуємо стандартну поведінку браузера (перехід за посиланням)

        const targetId = this.getAttribute('href').substring(1);  // Отримуємо ID елемента, на який потрібно прокрутити
        const targetElement = document.getElementById(targetId);  // Знаходимо елемент на сторінці

        targetElement.scrollIntoView({
            behavior: 'smooth'  // Прокручуємо плавно до цього елемента
        });
    });
});
