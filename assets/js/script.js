function Promotion() {
    var promotion1Wrapper = document.querySelector('.promotion-1-wrapper');
    var promotion1Btns = document.querySelectorAll('.btn-promotion-1');
    var listPromotion1 = document.querySelectorAll('.banner-1');
    let index = 0;

    const btnNextPromotion1 = document.querySelector('.left-btnNext');
    btnNextPromotion1.addEventListener('click', () => {
        index++;
        console.log(index);
        NextImage(listPromotion1, promotion1Wrapper, index, listPromotion1[0].clientWidth)
    });

    const btnPrevPromotion1 = document.querySelector('.left-btnPrev');
    btnPrevPromotion1.addEventListener('click', () => {
        index--;
        console.log(index);
        PrevImage(listPromotion1, promotion1Wrapper, index, listPromotion1[0].clientWidth)
    });

    AutoSilde(listPromotion1, promotion1Wrapper, index, listPromotion1[0].clientWidth);

    Array.from(promotion1Btns).forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let width = listPromotion1[0].clientWidth;

            Array.from(promotion1Btns).forEach((btn) => {
                btn.classList.remove('bg-primary');
            });

            btn.classList.add('bg-primary');

            promotion1Wrapper.style.transform = `translateX(-${index * width}px)`;
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
    var shoppeMallBtns = document.querySelectorAll('.left__btns');
    var listImageShoppeMall = document.querySelectorAll('.shoppe-mall-img');
    let index = 0;

    const btnNextShoppeMall = document.querySelector('.left-btnNext');
    btnNextShoppeMall.addEventListener('click', () => {
        NextImage(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0].clientWidth)
    });

    const btnPrevShoppeMall = document.querySelector('.left-btnPrev');
    btnPrevShoppeMall.addEventListener('click', () => {
        PrevImage(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0].clientWidth)
    });

    // AutoSilde(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0].clientWidth);

    Array.from(shoppeMallBtns).forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let width = listImageShoppeMall[0].clientWidth;

            Array.from(shoppeMallBtns).forEach((btn) => {
                btn.classList.remove('bg-primary');
            });

            btn.classList.add('bg-primary');
            shoppeMallWrapper.style.transform = `translateX(-${index * width}px)`;
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


function NextImage(listImage,boxWrapper, index, width) {
    index++;
    if (index > listImage.length - 1) {
        index = 0;
    } else {
        boxWrapper.style.transform = `translateX(-${index * width}px)`;
    }
    return index;
}

function PrevImage(listImage,boxWrapper, index, width) {
    index--;
    if (index < 0) {
        index = listImage.length - 1;
    } else {
        boxWrapper.style.transform = `translateX(-${index * width}px)`;
    }
    return index;
}

function AutoSilde(listImage,boxWrapper, index, width) {
    setInterval(() => {
        index = NextImage(listImage,boxWrapper, index, width);
    }, 3000);
}