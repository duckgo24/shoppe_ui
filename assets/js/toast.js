function Toast(type, title, message, countdown) {
    const toast = document.querySelector('.toast');
    const toastIcon = document.querySelector('.toast-icon');
    const toastTitle = document.querySelector('.toast-content .title');
    const toastMessage = document.querySelector('.toast-content .message');
    const toastCountDown = document.querySelector('.toast-countdown');
    const toastClose = document.querySelector('.toast-close');

    switch (type) {
        case 'success': {
            toast.classList.add('show');
            toastCountDown.classList.add('success');
            toastIcon.classList.add('success');
            toastIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
            break;
        }
        case 'error': {
            toast.classList.add('show');
            toastCountDown.classList.add('error');
            toastIcon.classList.add('error');
            toastIcon.innerHTML = `<i class="fa-solid fa-x"></i>`;
            break;
        }
    }


    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toastCountDown.style.animation = `countdown ${countdown}ms linear`;

    setTimeout(() => {
        toast.classList.remove('show');
        toastCountDown.style.animation = ``;       
    }, countdown);

    toastClose.addEventListener('click', () => {
        toast.classList.remove('show');
        toastCountDown.style.animation = ``;
    });
}

