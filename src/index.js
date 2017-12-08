/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function(resolve){
        setTimeout(() => {
            resolve();
        }, seconds*1000);
    })
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let compare = (a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }
    
    return new Promise(function(resolve) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', function() {
            let response = JSON.parse(xhr.response);

            response.sort(compare);
            resolve(response);
        });
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
