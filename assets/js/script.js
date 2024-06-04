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

// Start
function Start() {
    Promotion();
    New();
    FlashSale();
    ShoppeMall();
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
