/* Основные переменные для работы с кнопками и модалками */
var buttonCalback = document.getElementById('button-calback'); /* кнопка вызова модального окна авторизации*/
var modalWriteUs = document.getElementById('write-us'); /* Объявляем переменную и присваиваем ей значение -выбираем элемент в документе - модальное окно с формой */
var closeBtn = document.getElementById('button-close'); /* Объявляем переменную и присваиваем ей значение - выбираем кнопку закрытия окна в разметке */

/* Улучшаем нашу форму */
var nameInInput = modalWriteUs.querySelector('[name=name]'); /* Объявление переменной. присваивание значения - поле ввода имени в модальном окне */
var emailInInput = modalWriteUs.querySelector('[name=email]'); /* Объявление переменной. присваивание значения - поле ввода электропочты в модальном окне */
var form = modalWriteUs.querySelector('.modal__form'); /* Объявление переменной. присваивание значения - форма в модальном окне */
var storage = localStorage.getItem('nameInInput');

var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('nameInInput');
} catch (err) {
  isStorageSupport = false;
}

/* Обработчик на открытие модального окна с контактной формой */
buttonCalback.addEventListener('click', function (evt) {
  evt.preventDefault(); /* отменяем действие по умолчанию - 'переход по ссылке при клике' */
  modalWriteUs.classList.add('modal-show'); /* добавляем к модалке дополнительный класс, для того что бы форма отобразилась на странице */
  if (storage) {
    nameInInput.value = storage;
    emailInInput.focus(); /* вызываем метод 'Фокус' в поле ввода имени? но только ЕСЛИ у нас подставилось имя пользователя из Локального хранилища (Local Storage) в поле ввода имени */
  } else {
    nameInInput.focus(); /* вызываем метод 'Фокус' в поле ввода имени, если оно ранее не подставилось из локального хранилища */
  }

});

/* Обработчик на закрытие модального окна с формой */
closeBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalWriteUs.classList.remove('modal-show');
  modalWriteUs.classList.remove('modal-error');
});

/* Обработчик отправки с условиями проверки */
form.addEventListener('submit', function (evt) {
  if (!nameInInput.value || !emailInInput.value) {
    evt.preventDefault();
    modalWriteUs.classList.remove('modal-error');
    modalWriteUs.offsetWidth = modalWriteUs.offsetWidth; /* Вставляем костыль, для реализации бесконечного повтора анимации при ошибке заполнения формы - перезаписываем ширину окна на то же самое значение */
    modalWriteUs.classList.add('modal-error');

  } else {
    if (isStorageSupport) {
      localStorage.setItem('nameInInput', nameInInput.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (modalWriteUs.classList.contains('modal-show')) {
      evt.preventDefault();
      modalWriteUs.classList.remove('modal-show');
      modalWriteUs.classList.remove('modal-error');
    }
  }
});
