//рега
const closeBtnReg = document.querySelector('.registration__button');
const registerWindow = document.querySelector('.registration');

closeBtnReg.addEventListener('click', () => {
    registerWindow.classList.add('hidden');
});

//поле поиска при адаптиве
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.header__search-button');
    const searchWrapper = document.querySelector('.header__search-wrapper');
    const searchInput = document.querySelector('.header__search');
    const searchIcon = document.querySelector('.header__search-icon use');
    const logoSearh = document.querySelector('.header__logo');
    
    searchButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (searchWrapper.classList.contains('active')) {
            const query = searchInput.value.trim();
            if (query !== '') {
                console.log('Ищем:', query);
            } else {
                alert('Введите текст');
            }
        } else {
            searchWrapper.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
            logoSearh.classList.add('hidden');
            searchButton.classList.add('active');
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchWrapper.classList.contains('active')) {
            const query = searchInput.value.trim();
            if (query !== '') {
                console.log('Ищем:', query);
            }
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!searchButton.contains(e.target) && !searchWrapper.contains(e.target)) {
            searchWrapper.classList.remove('active');
            logoSearh.classList.remove('hidden');
            searchButton.classList.remove('active');
        }
    });
});

// кастом дропдаун
document.addEventListener('DOMContentLoaded', () => {
    const selectTrigger = document.querySelector('.header__select-trigger');
    const selectDropdown = document.querySelector('.header__select-dropdown');
    const selectOptions = document.querySelectorAll('.header__select-option');
    const selectArrow = document.querySelector('.header__select-arrow');
    

    selectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        selectDropdown.classList.toggle('show');
        if (selectArrow) {
            selectArrow.classList.toggle('open');
        }
    });
    
    selectOptions.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.textContent;
            
            selectDropdown.classList.remove('show');
            if (selectArrow) {
                selectArrow.classList.remove('open');
            }
            
            if (value === 'contacts') {
                alert('Телефон: +7 999 999-99-99');
            } else if (value === 'address') {
                alert('Адрес: ул. Примерная, д. 1');
            }
        });
    });
    
    document.addEventListener('click', () => {
        selectDropdown.classList.remove('show');
        if (selectArrow) {
            selectArrow.classList.remove('open');
        }
    });
});

//бургер
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const icon = burger.querySelector('use');
    const headerInner = document.querySelector('.header__inner');
    
    const overlay = document.createElement('div');
    overlay.className = 'burger-overlay';
    document.body.append(overlay);
    headerInner.appendChild(overlay);
    
    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (burger.classList.contains('active')) {
            icon.setAttribute('href', './icons/sprite-icons.svg#close');
        } else {
            icon.setAttribute('href', './icons/sprite-icons.svg#burger');
        }
    }
    
    burger.addEventListener('click', toggleMenu);
    
    overlay.addEventListener('click', toggleMenu);
    
    const links = document.querySelectorAll('.header__list-link, .header__select-option');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

//слайдер комментов
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('commentTrack');
    const slides = document.querySelectorAll('.comment__slide');
    const prevBtn = document.getElementById('commentPrevBtn');
    const nextBtn = document.getElementById('commentNextBtn');
    const sliderWrapper = document.querySelector('.comment__slider-wrapper');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    const totalSlides = slides.length;
    let isTransitioning = false;
    
    // Переменные для свайпа
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    let isSwiping = false;
    
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }
    
    function getGap() {
        return window.innerWidth >= 768 ? 20 : 16;
    }
    
    function getSlideWidth() {
        const wrapperWidth = document.querySelector('.comment__slider').clientWidth;
        const gap = getGap();
        
        if (slidesPerView === 3) {
            return (wrapperWidth - (gap * 2)) / 3;
        } else if (slidesPerView === 2) {
            return (wrapperWidth - gap) / 2;
        } else {
            return wrapperWidth;
        }
    }
    
    function updateSlidesWidth() {
        const slideWidth = getSlideWidth();
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        track.style.gap = `${getGap()}px`;
    }
    
    function moveToSlide() {
        if (isTransitioning) return;
        
        const slideWidth = getSlideWidth();
        const gap = getGap();
        const offset = -currentIndex * (slideWidth + gap);
        
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${offset}px)`;
        
        isTransitioning = true;
        setTimeout(() => {
            isTransitioning = false;
            checkLoop();
        }, 500);
    }
    
    function checkLoop() {
        const slideWidth = getSlideWidth();
        const gap = getGap();
        
        // Зацикливание вперёд
        if (currentIndex >= totalSlides - slidesPerView + 1) {
            currentIndex = 0;
            track.style.transition = 'none';
            const newOffset = -currentIndex * (slideWidth + gap);
            track.style.transform = `translateX(${newOffset}px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 50);
        }
        
        // Зацикливание назад
        if (currentIndex < 0) {
            currentIndex = totalSlides - slidesPerView;
            track.style.transition = 'none';
            const newOffset = -currentIndex * (slideWidth + gap);
            track.style.transform = `translateX(${newOffset}px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 50);
        }
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        
        if (currentIndex >= totalSlides - slidesPerView) {
            currentIndex = -1;
        }
        currentIndex++;
        moveToSlide();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        
        if (currentIndex <= 0) {
            currentIndex = totalSlides - slidesPerView + 1;
        }
        currentIndex--;
        moveToSlide();
    }
    
    //  СВАЙП ДЛЯ МОБИЛЬНЫХ 
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
        isSwiping = true;
        
        // Временно отключаем transition для плавного следования за пальцем
        track.style.transition = 'none';
    }
    
    function handleTouchMove(e) {
        if (!isSwiping) return;
        
        touchEndX = e.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        
        // Получаем текущий сдвиг
        const slideWidth = getSlideWidth();
        const gap = getGap();
        const currentOffset = -currentIndex * (slideWidth + gap);
        
        // Сдвигаем слайдер за пальцем (не больше чем на 1 слайд)
        let newOffset = currentOffset + deltaX;
        const maxOffset = -(slideWidth + gap);
        const minOffset = 0;
        
        // Ограничиваем смещение
        if (newOffset > 0) newOffset = 0;
        if (newOffset < (slideWidth + gap) * (totalSlides - slidesPerView) * -1) {
            newOffset = (slideWidth + gap) * (totalSlides - slidesPerView) * -1;
        }
        
        track.style.transform = `translateX(${newOffset}px)`;
    }
    
    function handleTouchEnd(e) {
        if (!isSwiping) return;
        
        isSwiping = false;
        const deltaX = touchEndX - touchStartX;
        const deltaTime = Date.now() - touchStartTime;
        
        // Минимальное расстояние для свайпа (в пикселях)
        const minSwipeDistance = 50;
        // Максимальное время для быстрого свайпа (миллисекунды)
        const maxSwipeTime = 300;
        
        // Определяем горизонтальный свайп
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            } else {
                // Свайп влево - следующий слайд
                nextSlide();
            }
        } else if (deltaTime < maxSwipeTime && Math.abs(deltaX) > 20) {
            // Быстрый тап с движением (короткий свайп)
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            // Если свайпа не было, возвращаемся на место
            moveToSlide();
        }
        
        touchStartX = 0;
        touchEndX = 0;
        touchStartTime = 0;
    }
    
    // Добавляем обработчики свайпа только для мобильных устройств
    function addSwipeListeners() {
        if ('ontouchstart' in window) {
            sliderWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
            sliderWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
            sliderWrapper.addEventListener('touchend', handleTouchEnd);
        }
    }
    
    function handleResize() {
        const newSlidesPerView = getSlidesPerView();
        
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            currentIndex = 0;
            updateSlidesWidth();
            moveToSlide();
        } else {
            updateSlidesWidth();
            moveToSlide();
        }
    }
    
    // Навешиваем обработчики на кнопки
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // Инициализация
    function init() {
        updateSlidesWidth();
        currentIndex = 0;
        moveToSlide();
        addSwipeListeners(); // Добавляем возможность свайпа
    }
    
    init();
});

//модалка регестрации
document.addEventListener('DOMContentLoaded', function() {
    // Твоя кнопка личного кабинета
    const accountBtn = document.querySelector('.header__actions-button');
    
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const showRegisterFromLoginBtn = document.getElementById('showRegisterFromLoginBtn');
    const togglePassword = document.getElementById('togglePassword');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    // Функция открытия модалки
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция закрытия модалки
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            clearErrors(modal);
        }
    }
    
    // Очистка ошибок
    function clearErrors(modal) {
        const errorInputs = modal.querySelectorAll('.modal__input.error');
        errorInputs.forEach(input => input.classList.remove('error'));
        
        const errorMessages = modal.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
    
    // Показать ошибку
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    // Показать уведомление
    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.className = 'modal__notification';
        notification.textContent = message;
        notification.style.backgroundColor = isSuccess ? '#000' : '#ff4444';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Валидация регистрации
    function validateRegisterForm(name, email, password, agree) {
        let isValid = true;
        
        if (!name.trim()) {
            showError(document.getElementById('userName'), 'Введите имя');
            isValid = false;
        } else if (name.trim().length < 2) {
            showError(document.getElementById('userName'), 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }
        
        if (!email.trim()) {
            showError(document.getElementById('userEmail'), 'Введите email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(document.getElementById('userEmail'), 'Введите корректный email');
            isValid = false;
        }
        
        if (!password) {
            showError(document.getElementById('userPassword'), 'Введите пароль');
            isValid = false;
        } else if (password.length < 6) {
            showError(document.getElementById('userPassword'), 'Пароль должен быть минимум 6 символов');
            isValid = false;
        }
        
        if (!agree) {
            showError(document.getElementById('agreeTerms'), 'Подтвердите согласие с условиями');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Открытие регистрации по кнопке личного кабинета
    if (accountBtn) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(registerModal);
        });
    }
    
    // Закрытие по крестику
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => closeModal(registerModal));
    }
    
    if (closeLoginModalBtn) {
        closeLoginModalBtn.addEventListener('click', () => closeModal(loginModal));
    }
    
    // Закрытие по оверлею
    document.querySelectorAll('.modal__overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (registerModal.classList.contains('active')) closeModal(registerModal);
            if (loginModal.classList.contains('active')) closeModal(loginModal);
        }
    });
    
    // Переключение между модалками
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            setTimeout(() => openModal(loginModal), 300);
        });
    }
    
    if (showRegisterFromLoginBtn) {
        showRegisterFromLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            setTimeout(() => openModal(registerModal), 300);
        });
    }
    
    // Показать/скрыть пароль
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('userPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }
    
    // Обработка регистрации
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const password = document.getElementById('userPassword').value;
            const agree = document.getElementById('agreeTerms').checked;
            
            clearErrors(registerModal);
            
            if (validateRegisterForm(name, email, password, agree)) {
                // Здесь можно отправить данные на сервер
                console.log('Регистрация:', { name, email, password });
                
                // Сохраняем в localStorage (имитация входа)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email);
                
                showNotification(`Добро пожаловать, ${name}! 🎉`);
                
                // Обновляем иконку пользователя (можно добавить класс active)
                if (accountBtn) {
                    accountBtn.classList.add('active');
                    // Можно добавить иконку "заполненного" пользователя
                    const userIcon = accountBtn.querySelector('use');
                    if (userIcon) {
                        userIcon.setAttribute('href', './icons/sprite-icons.svg#user-active');
                    }
                }
                
                // Очищаем форму и закрываем модалку
                registerForm.reset();
                setTimeout(() => {
                    closeModal(registerModal);
                }, 1000);
            }
        });
    }
    
    // Обработка входа
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                // Проверка есть ли пользователь в localStorage
                const storedEmail = localStorage.getItem('userEmail');
                const storedName = localStorage.getItem('userName');
                
                if (email === storedEmail) {
                    console.log('Вход:', { email, password });
                    localStorage.setItem('isLoggedIn', 'true');
                    showNotification(`С возвращением, ${storedName}! 🔓`);
                    
                    if (accountBtn) {
                        accountBtn.classList.add('active');
                    }
                    
                    setTimeout(() => {
                        closeModal(loginModal);
                        loginForm.reset();
                    }, 1000);
                } else {
                    showNotification('Пользователь не найден. Зарегистрируйтесь!', false);
                }
            } else {
                showNotification('Заполните все поля', false);
            }
        });
    }
    
    // Проверка авторизации при загрузке страницы
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userName = localStorage.getItem('userName');
        
        if (isLoggedIn === 'true' && userName && accountBtn) {
            accountBtn.classList.add('active');
            // Можно добавить тултип с именем пользователя
            accountBtn.setAttribute('title', `${userName}`);
        }
    }
    
    checkAuth();
});

// Модальное окно для кнопки корзины
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.querySelector('.header__actions-button--cart');
    const emptyModal = document.getElementById('emptyModal');
    const closeEmptyModalBtn = document.getElementById('closeEmptyModalBtn');
    const modalOverlay = document.querySelector('#emptyModal .modal__overlay');
    
    function openModal() {
        emptyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        emptyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (closeEmptyModalBtn) {
        closeEmptyModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emptyModal.classList.contains('active')) {
            closeModal();
        }
    });
});