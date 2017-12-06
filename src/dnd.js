/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {

    function randomNumber(min = 0, max = 100, flag = false) {
        return flag ? Math.round((max - min) * Math.random()) + min + 'px' : Math.round((max - min) * Math.random()) + min;
    }
    function generateColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    let element = document.createElement('div'),
        styleWidth = randomNumber(50, 150),
        styleHeight = randomNumber(50, 150);

    element.className = 'draggable-div';
    element.style.width = styleWidth + 'px';
    element.style.height = styleHeight + 'px';
    element.style.backgroundColor = generateColor();
    element.style.position = 'absolute';
    element.style.top =
        randomNumber(0, homeworkContainer.offsetHeight - styleHeight) + 'px';
    element.style.left =
        randomNumber(0, homeworkContainer.offsetWidth - styleWidth) + 'px';

    return element;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            width: box.width,
            height: box.height
        };
    }

    target.addEventListener('mousedown', e => {
        let style = window.getComputedStyle(homeworkContainer, null);
        let shiftX = e.pageX - getCoords(target).left;
        let shiftY = e.pageY - getCoords(target).top;
        let borderRight = getCoords(homeworkContainer).width - getCoords(target).width - 2 * parseInt(style.borderWidth);
        let borderBottom = getCoords(homeworkContainer).height - getCoords(target).height - 2 * parseInt(style.borderWidth);

        moveAt(e);

        function moveAt(e) {
            let coordX = e.pageX - getCoords(homeworkContainer).left - shiftX;
            let coordY = e.pageY - getCoords(homeworkContainer).top - shiftY;

            target.style.left = coordX + 'px';
            target.style.top = coordY + 'px';

            function isLeftBound(coordX) {
                return coordX < 0;
            }

            function isTopBound(coordY) {
                return coordY < 0;
            }

            function isRightBound(coordX) {
                return coordX > borderRight;
            }

            function isBottomBound(coordY) {
                return coordY > borderBottom;
            }

            if (isLeftBound(coordX)) {
                target.style.left = 0 + 'px';
            }

            if (isRightBound(coordX)) {
                target.style.left = borderRight + 'px';
            }

            if (isTopBound(coordY)) {
                target.style.top = 0 + 'px';
            }

            if (isBottomBound(coordY)) {
                target.style.top = borderBottom + 'px';
            }
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };

        target.ondragstart = function() {
            return false;
        };
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
