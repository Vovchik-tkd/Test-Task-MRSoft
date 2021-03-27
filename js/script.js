const substrBtn = document.querySelector('.substr-search');
const lengthBtn = document.querySelector('.length-search');
const input = document.querySelector('.search-input');
const registerChecker = document.querySelector('#register-checker');
const resultBox = document.querySelector('.result-box');

const getResourse = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
};

const print = (result) => {
    resultBox.innerHTML = '';
    if (result.length == 0) {
        const span = document.createElement('span');
        span.className = 'no-result';
        span.innerHTML = 'Ничего не найдено';
        resultBox.append(span);
    } else {
        let list = document.createElement('ul');
        list.className = 'result-list';
        result.forEach(item => {
            let listItem = document.createElement('li');
            listItem.className = 'result-list-item';
            listItem.innerHTML = item;
            list.append(listItem);
        })
        resultBox.append(list);
    }
}

const loadingPrint = () => {
    resultBox.innerHTML = '';
    const span = document.createElement('span');
    span.className = 'loading';
    span.innerHTML = 'Загрузка...';
    resultBox.append(span);
}

const numberChecker = () => {
    resultBox.innerHTML = '';
    const span = document.createElement('span');
    span.className = 'no-result';
    span.innerHTML = 'Ошибка. Данные введены некорректно';
    resultBox.append(span);
}

substrBtn.addEventListener('click', () => {
    resultBox.innerHTML = '';
    let result = [];
    if (!input.value) {
        alert('Ничего не введено');
    } else {
        if (registerChecker.checked) {
            loadingPrint();
            getResourse('http://localhost:3000/')
            .then(data => {
                data.data.forEach(async element => {
                    if (element.indexOf(input.value) != -1) {
                        await result.push(element);
                    }
                });
                print(result);
            })
        } else {
            loadingPrint();
            getResourse('http://localhost:3000/')
            .then(data => {
                data.data.forEach(async element => {
                    const el = element;
                    el.toLowerCase();
                    if (el.toLowerCase().indexOf(input.value.toLowerCase()) != -1) {
                        await result.push(element);
                    }
                });
                print(result);
            })
        }
    }
})

lengthBtn.addEventListener('click', () => {
    resultBox.innerHTML = '';
    let result = [];
    if (!input.value) {
        alert('Ничего не введено');
    } else {
        loadingPrint();
        getResourse('http://localhost:3000/')
        .then(data => {
            data.data.forEach(async element => {
                if (element.length > input.value) {
                    await result.push(element);
                }
            });
            if (parseInt(input.value) * 0 != 0) {
                numberChecker();
            } else {
                print(result);
            }
        })
    }
})