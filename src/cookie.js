/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Функция которая создает объект существующих cookie
 */
function getCookies() {
    return document.cookie
        .split("; ")
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

/**
 * Функция добавляет куки в таблицу, в зависимости содержимого текстового поля
 */
function filterCookiesAll() {
    let cookies = getCookies();

    listTable.innerHTML = '';

    for (let name in cookies) {
        if (
            name.includes(filterNameInput.value) ||
            cookies[name].includes(filterNameInput.value)
        ) {
            addCookie(name, cookies[name]);
        }
    }
}
/**
 * Функция создает строку таблицы и добавляет Cookie
 */
function addCookie(name, value) {
    // создаем и заполняем таблицу
    let tr = document.createElement('tr'),
        deleteButton = document.createElement('button');

    deleteButton.innerHTML = 'Удалить';
    deleteButton.className = 'delete';
    tr.innerHTML = `<td>${name}</td><td>${value}</td>`;
    tr.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        let tr = deleteButton.closest('tr');

        listTable.removeChild(tr);
        document.cookie = `${name}=;expires=${new Date(0)}`;
    });

    listTable.appendChild(tr);
}

filterNameInput.addEventListener('keyup', function () {
    filterCookiesAll();
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value,
        value = addValueInput.value;

    if (value === '' || name === '') {
        alert('Вы не ввели данные в форму, куки не добавлены');

        return;
    }
    document.cookie = `${name}=${value}`;
    alert('cookie успешно добавлены');
    filterCookiesAll();
});

filterCookiesAll();