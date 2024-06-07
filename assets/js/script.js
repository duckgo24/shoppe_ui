function Promotion() {
    var promotion1Wrapper = document.querySelector('.promotion-1-wrapper');
    var promotion1Btns = document.querySelectorAll('.btn-promotion-1');
    var listPromotion1 = document.querySelectorAll('.banner-1');
    let index = 0;

    const btnNextPromotion1 = document.querySelector('.btn-control-next');
    btnNextPromotion1.addEventListener('click', () => {
        index = NextSlide(listPromotion1, promotion1Wrapper, index, listPromotion1[0].clientWidth);
    });

    const btnPrevPromotion1 = document.querySelector('.btn-control-prev');
    btnPrevPromotion1.addEventListener('click', () => {
        index = PrevSlide(listPromotion1, promotion1Wrapper, index, listPromotion1[0].clientWidth);
    });

    AutoSlide(listPromotion1, promotion1Wrapper, index, listPromotion1[0].clientWidth);

    Array.from(promotion1Btns).forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            let width = listPromotion1[0].clientWidth;

            Array.from(promotion1Btns).forEach((btn) => {
                btn.classList.remove('bg-primary');
            });

            btn.classList.add('bg-primary');

            promotion1Wrapper.style.transform = `translateX(-${idx * width}px)`;
        });
    });
}



function New() {
    let hourE = document.querySelector('.new-hour');
    let minuteE = document.querySelector('.new-minute');
    let secondE = document.querySelector('.new-second');

    CounDown(hourE.textContent, minuteE.textContent, secondE.textContent, hourE, minuteE, secondE);
}

function FlashSale() {
    let hourE = document.querySelector('.flash-sale-hour');
    let minuteE = document.querySelector('.flash-sale-minute');
    let secondE = document.querySelector('.flash-sale-second');

    CounDown(hourE.textContent, minuteE.textContent, secondE.textContent, hourE, minuteE, secondE);
}

function ShoppeMall() {
    var shoppeMallWrapper = document.querySelector('.left__carousel');
    var shoppeMallBtns = document.querySelectorAll('.left__btns-item');
    var listImageShoppeMall = document.querySelectorAll('.shoppe-mall-img');
    let index = 0;

    const btnNextShoppeMall = document.querySelector('.left-btnNext');
    btnNextShoppeMall.addEventListener('click', () => {
        index = NextSlide(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0].clientWidth);
    });

    const btnPrevShoppeMall = document.querySelector('.left-btnPrev');
    btnPrevShoppeMall.addEventListener('click', () => {
        index = PrevSlide(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0].clientWidth);
    });

    AutoSlide(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0].clientWidth);

    Array.from(shoppeMallBtns).forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            let width = listImageShoppeMall[0].clientWidth;

            Array.from(shoppeMallBtns).forEach((btn) => {
                btn.classList.remove('bg-primary');
            });
            btn.classList.add('bg-primary');
            shoppeMallWrapper.style.transform = `translateX(-${idx * width}px)`;
        });
    });
}

function Hot() {
    const hot = document.querySelector('.hot');
    const btnClose = document.querySelector('.btn-hot-close');
    btnClose.addEventListener('click', () => {
        hot.style.display = 'none';
    });
}

function ChatWithMe() {
    const windownChat = document.querySelector('.windown-chat');
    const listMessage = document.querySelector('.list-message');
    const btnClose = document.querySelector('.chat-btn-close');
    const btnOpen = document.querySelector('.btn-chat');
    const btnHide = document.querySelector('.chat-btn-hide');
    let countClickHide = 0;
    btnOpen.addEventListener('click', () => {
        windownChat.style.animation = 'big 0.5s ease-in-out';
        windownChat.style.display = 'flex';
        btnOpen.style.display = 'none';
        setTimeout(() => {
            windownChat.style.animation = '';
        }, 1000);
    });

    btnClose.addEventListener('click', () => {
        windownChat.style.animation = 'small 0.5s ease-in-out';           
        setTimeout(() => {
            windownChat.style.display = 'none';
            btnOpen.style.display = 'block';
        },500)      
    });

    btnHide.addEventListener('click', () => {
        countClickHide++;
        if(countClickHide % 2 == 1) {
            listMessage.style.animation = 'reduceWidth 0.7s ease-in-out';   
            setTimeout(() => {
                listMessage.style.width = '0';
                listMessage.style.animation = '';
            }, 700);
        } else {
            listMessage.style.animation = 'increaseWidth 0.7s ease-in-out';   
            setTimeout(() => {
                listMessage.style.width = '100%';
                listMessage.style.animation = '';
            }, 700);
        }
        

        if(btnHide.classList.contains('fa-arrow-right')) {
            btnHide.classList.remove('fa-arrow-right')
            btnHide.classList.add('fa-arrow-left')
        }
        else {
            btnHide.classList.remove('fa-arrow-left')
            btnHide.classList.add('fa-arrow-right')
        }
    })

}

function User() {
    const chooseAuth = document.querySelector('.user .choose');
    const userInfo = document.querySelector('.user .user-info');    

    const username = document.getElementById('user-name');

    const data = localStorage.getItem('user');

    if(data) {
        const user = JSON.parse(data);
        username.textContent = user?.username;
        chooseAuth.style.display = 'none';
        userInfo.style.display = 'flex';
    }

    const btnSignout = document.querySelector('.btn-signout');
    btnSignout.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '/index.html';
        hooseAuth.style.display = 'flex';
        userInfo.style.display = 'none';
    });
}


// Start
function Start() {
    Promotion();
    New();
    FlashSale();
    ShoppeMall();
    Hot();
    ChatWithMe();
    User();
}

Start();


// My function
function CounDown(hour, minute, second, hourE, minuteE, secondE) {
    setInterval(() => {
        second--;
        if(minute < 0) {
            hour--;
            minute = 59;
        } 

        if (second < 0) {
            second = 59;
            minute--;
        }
        if (minute < 0) {
            minute = 0;
            second = 0;
        }
        
        minute < 10 ? minute = `0${minute}`: minute;
        second < 10 ? second = `0${second}`: second;

        hourE.textContent = hour;
        minuteE.textContent  = minute;
        secondE.textContent  = second;
    }, 1000);
};


function NextSlide(listImage, boxWrapper, index, width) {
    if (index >= listImage.length - 1) {
        index = listImage.length - 1;
    } else {
        index++;
        boxWrapper.style.transform = `translateX(-${index * width}px)`;
    }
    return index;
}

function PrevSlide(listImage, boxWrapper, index, width) {
    if (index <= 0) {
        index = 0;
    } else {
        index--;
        boxWrapper.style.transform = `translateX(-${index * width}px)`;
    }

    return index;
}

function AutoSlide(listImage, boxWrapper, index, width) {
    setInterval(() => {
        index = NextSlide(listImage, boxWrapper, index, width);
    }, 3000);
}

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
