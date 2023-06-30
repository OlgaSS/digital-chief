// Открытие меню
const burgerBtn = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const links = document.querySelectorAll('.menu__nav-link');

function openMenu() {
    document.body.style.overflow = 'hidden';
    menu.style.left = '0%';
    setTimeout(() => {
        menu.classList.add('active');
    }, 340);
}

function closeMenu() {
    menu.classList.remove('active');

    setTimeout(() => {
        document.body.style.overflow = 'auto';
        menu.style.left = '-100%';
    }, 100);
}

burgerBtn.addEventListener('click', openMenu);

menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu') || e.target.classList.contains('menu__close')) {
        closeMenu();
    }
});

links.forEach(link => {
    link.addEventListener('click', closeMenu)
});



// Отправка формы
const validEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const form = document.getElementById('form');
const name = form.querySelector('#name');
const email = form.querySelector('#email');
const text = form.querySelector('#text');
const button = form.querySelector('.contacts-form__button');

function showError(block, message) {
    const error = document.createElement('span');
    error.classList = 'error';
    error.innerHTML = message;

    setTimeout(() => {
        block.insertAdjacentElement('afterbegin', error);
    }, 100);

}

function removeError() {
    const error = document.querySelectorAll('.contacts-form__form .error');
    error.forEach(item => {
        item.remove();
    })
}

function showMessage(title) {
    const modal = document.createElement('div');
    modal.classList = 'modal';
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__block">
            <button class="modal__close"></button>
            <h3 class="modal__title">${title}</h3>
            <ul class="modal__social-list social-list">
                <li class="modal__social-item social-list__item">
                    <a href="https://github.com/" class="modal__social-link social-list__link" target="_blank">
                        <img src="img/github.svg" alt="Github Icon">
                    </a>
                </li>
                <li class="modal__social-item social-list__item">
                    <a href="https://www.instagram.com/" class="modal__social-link social-list__link" target="_blank">
                        <img src="img/instagram.svg" alt="Instagram Icon">
                    </a>
                </li>
                <li class="modal__social-item social-list__item">
                    <a href="https://facebook.com/" class="modal__social-link social-list__link" target="_blank">
                        <img src="img/facebook.svg" alt="Facebook Icon">
                    </a>
                </li>
        </ul>
        </div>
    `);
    document.body.style.overflow = 'hidden';
    document.body.append(modal);

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal__close') || e.target.classList.contains('modal')) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    removeError();

    if (name.value === '' || name.value.length < 2) {
        showError(document.querySelector('.contacts-form__fieldset_name'), 'Заполните поле!')
    } else if (email.value === '') {
        showError(document.querySelector('.contacts-form__fieldset_email'), 'Заполните поле!')
    } else if (!validEmail.test(email.value)) {
        showError(document.querySelector('.contacts-form__fieldset_email'), 'Заполните корректно поле!')
    } else if (text.value === '') {
        showError(document.querySelector('.contacts-form__fieldset_text'), 'Заполните поле!')
    } else {
        const newPost = {
            name: name.value,
            email: email.value,
            text: text.value
        };
        sendEmail(newPost)
        form.reset();
        //showMessage('Спасибо! Ваше сообщение успешно отправлено.');
    }
});


// Отправка данных из формы на сервер
const API_URL = 'https://reqres.in/api/users';
function sendEmail(data) {
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => {
        if (response.ok) {
            console.log(data);
            showMessage('Спасибо! Ваше сообщение успешно отправлено.');
            return response.json()
        }
        return response.json().then(error => {
            showMessage('Ошибка! Попробуйте отправить сообщение позже.');
            console.log(error);
        })
    })
}


