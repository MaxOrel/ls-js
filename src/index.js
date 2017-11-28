/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var array2 = []

    for (let i = 0; i < array.length; i++) {
        array2.push(fn(array[i], i, array))
    }

    return array2;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var previousValue, i;

    if (initial === undefined) {
        previousValue = array[0];
        i = 1;
    } else {
        previousValue = initial;
        i = 0;
    }
    for (i; i < array.length; i++) {
        previousValue = fn(previousValue, array[i], i, array)
    }

    return previousValue;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return prop in obj
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    let result = [];

    for (var prop in obj) {
        if ({}.hasOwnProperty.call(obj, prop)) {
            result.push(prop);
        }
    }

    return result;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let result = [];

    for (let prop in obj) {
        if ({}.hasOwnProperty.call(obj, prop)) {
            result.push(prop);
        }
    }

    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].toUpperCase();
    }

    return result;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    var result = [];

    if (from === undefined) {
        from = 0;
    }
    if (to === undefined) {
        to = array.length;
    }

    if (from < 0) {
        from = array.length + from;
    }
    if (to > array.length) {
        to = array.length;
    }
    if (to < 0) {
        to = array.length + to;
    }

    for (let i = from; i < to; i++) {
        if (array[i]) {
            result.push(array[i])
        }
    }

    return result;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
