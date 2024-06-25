function Promotion() {
    var promotion1Wrapper = document.querySelector('.promotion-1-wrapper');
    var promotion1Btns = document.querySelectorAll('.btn-promotion-1');
    var listPromotion1 = document.querySelectorAll('.banner-1');
    let index = 0;

    const btnNextPromotion1 = document.querySelector('.btn-control-next');
    btnNextPromotion1?.addEventListener('click', () => {
        index = NextSlide(listPromotion1, promotion1Wrapper, index, listPromotion1[0]?.clientWidth);

        promotion1Btns.forEach((btn) => {
            btn.classList.remove('bg-primary');
        });
        promotion1Btns[index].classList.add('bg-primary');
    });

    const btnPrevPromotion1 = document.querySelector('.btn-control-prev');
    btnPrevPromotion1?.addEventListener('click', () => {
        index = PrevSlide(listPromotion1, promotion1Wrapper, index, listPromotion1[0]?.clientWidth);
        promotion1Btns.forEach((btn) => {
            btn.classList.remove('bg-primary');
        });
        promotion1Btns[index].classList.add('bg-primary');
    });

    AutoSlide(listPromotion1, promotion1Wrapper, index, listPromotion1[0]?.clientWidth, promotion1Btns);

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

    CounDown(hourE?.textContent, minuteE?.textContent, secondE?.textContent, hourE, minuteE, secondE);
}

function FlashSale() {
    let hourE = document.querySelector('.flash-sale-hour');
    let minuteE = document.querySelector('.flash-sale-minute');
    let secondE = document.querySelector('.flash-sale-second');

    CounDown(hourE?.textContent, minuteE?.textContent, secondE?.textContent, hourE, minuteE, secondE);
}

function ShoppeMall() {
    var shoppeMallWrapper = document.querySelector('.left__carousel');
    var shoppeMallBtns = document.querySelectorAll('.left__btns-item');
    var listImageShoppeMall = document.querySelectorAll('.shoppe-mall-img');

    let index = 0;

    const btnNextShoppeMall = document.querySelector('.left-btnNext');
    btnNextShoppeMall?.addEventListener('click', () => {
        index = NextSlide(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0]?.clientWidth);
    });

    const btnPrevShoppeMall = document.querySelector('.left-btnPrev');
    btnPrevShoppeMall?.addEventListener('click', () => {
        index = PrevSlide(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0]?.clientWidth);
    });

    AutoSlide(listImageShoppeMall, shoppeMallWrapper, index, listImageShoppeMall[0]?.clientWidth, shoppeMallBtns);

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
    const data = localStorage.getItem('account');

    if (!data) {
        hot.style.display = 'none';
    }
    const btnClose = document.querySelector('.btn-hot-close');
    btnClose?.addEventListener('click', () => {
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
    btnOpen?.addEventListener('click', () => {
        windownChat.style.animation = 'big 0.5s ease-in-out';
        windownChat.style.display = 'flex';
        btnOpen.style.display = 'none';
        setTimeout(() => {
            windownChat.style.animation = '';
        }, 1000);
    });

    btnClose?.addEventListener('click', () => {
        windownChat.style.animation = 'small 0.5s ease-in-out';
        setTimeout(() => {
            windownChat.style.display = 'none';
            btnOpen.style.display = 'block';
        }, 500);
    });

    btnHide?.addEventListener('click', () => {
        countClickHide++;
        if (countClickHide % 2 == 1) {
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

        if (btnHide.classList.contains('fa-arrow-right')) {
            btnHide.classList.remove('fa-arrow-right');
            btnHide.classList.add('fa-arrow-left');
        } else {
            btnHide.classList.remove('fa-arrow-left');
            btnHide.classList.add('fa-arrow-right');
        }
    });
}

async function Cart() {
    let baseUrl = 'http://localhost:9999';

    async function GetListProductNoPaid() {
        const accountId = JSON.parse(localStorage.getItem('account'))?._id;

        const url = new URL(`${baseUrl}/bills/find`);
        url.searchParams.append('account', accountId);
        url.searchParams.append('isPaid', false);
        if (accountId) {
            try {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }

    const data = await GetListProductNoPaid();

    const noCart = document.querySelector('.no-cart');
    const cartDetail = document.querySelector('.cart__detail');
    const cartListItem = document.querySelector('.cart__detail-list');
    let totalProduct = document.querySelector('.cart__detail-total-product');
    if (data?.length > 0 && data) {
        noCart.style.display = 'none';
        cartDetail.style.display = 'flex';
        totalProduct.style.display = 'block';
        totalProduct.textContent = data.length;
        data.forEach((bill) => {
            cartListItem.innerHTML += `
                <div class="cart__detail-item">
                    <img src="${bill.image}" alt="" class="item-img" height="40px">
                    <span class="item-name">
                        <div class="text-primary">Combo khuyến mại</div>
                         <div>${bill.product}</div>
                    </span>
                    <span class="item-price text-primary">₫${bill.price}</span>
                </div>
                `;
        });
    }
}

function User() {
    let baseUrl = 'http://localhost:9999';
    const chooseAuth = document.querySelector('.user .choose');
    const userInfo = document.querySelector('.user .user-info');
    const username = document.getElementById('user-name');
    const avatar = document.getElementById('user-image');

    const dataAccount = JSON.parse(localStorage.getItem('account'));

    async function GetInfoUser() {
        const accId = dataAccount?._id;
        var dataUser = {};

        const url = new URL(`${baseUrl}/users/getInfoByAccId`);
        url.searchParams.append('account', accId);

        if (accId && dataAccount) {
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    dataUser = data;
                });

            if (dataUser) {
                localStorage.setItem('user', JSON.stringify(dataUser));
                const data = { ...dataUser, ...dataAccount };
                username.textContent = data?.nickName;
                avatar.src = data?.avatar;
                chooseAuth.style.display = 'none';
                userInfo.style.display = 'flex';
            }
        } else {
            return;
        }
    }

    GetInfoUser();

    const btnSignout = document.querySelector('.btn-signout');
    btnSignout.addEventListener('click', () => {
        localStorage.removeItem('account');
        localStorage.removeItem('user');
        window.location.href = '/trangchu.html';
        chooseAuth.style.display = 'flex';
        userInfo.style.display = 'none';
    });
}

function IsAdmin() {
    const data = localStorage.getItem('account');
    if (data) {
        const user = JSON.parse(data);
        if (user?.role === 'admin') {
            let optionList = document.querySelector('.option-list');
            let anchor = document.createElement('a');
            anchor.classList.add('option-item');
            anchor.href = '/Admin/admin.html';
            anchor.textContent = 'Quản trị viên';
            optionList.appendChild(anchor);
        }
    }
}

var listproduct = document.querySelectorAll('.product');

listproduct.forEach((product) => {
    product.addEventListener('click', (e) => {
        e.preventDefault();
        let nameProduct = product.querySelector('.desc').textContent;
        let priceProductOrigin = product.querySelector('.price-origin').textContent;
        let priceProductDiscount = product.querySelector('.price-discount').textContent;
        let image = product.querySelector('.suggest-today-img').src;
        let expiry = product.querySelector('.expiry').textContent;

        const data = {
            nameProduct,
            priceProductOrigin,
            priceProductDiscount,
            image,
            expiry,
        };

        localStorage.setItem('product', JSON.stringify(data));
        window.location.href = './chitietsanpham.html';
    });
});

// Start
function Start() {
    Promotion();
    New();
    FlashSale();
    ShoppeMall();
    Hot();
    ChatWithMe();
    User();
    IsAdmin();
    Cart();
}

window.addEventListener('DOMContentLoaded', Start);

// My function
function CounDown(hour, minute, second, hourE, minuteE, secondE) {
    setInterval(() => {
        second--;
        if (minute < 0) {
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

        minute < 10 ? (minute = `0${minute}`) : minute;
        second < 10 ? (second = `0${second}`) : second;
        if (hourE && minuteE && secondE) {
            hourE.textContent = hour;
            minuteE.textContent = minute;
            secondE.textContent = second;
        }
    }, 1000);
}

function NextSlide(listImage, boxWrapper, index, width) {
    if (index >= listImage.length - 1) {
        index = 0;
    } else {
        index++;
        boxWrapper.style.transform = `translateX(-${index * width}px)`;
    }
    return index;
}

function PrevSlide(listImage, boxWrapper, index, width) {
    if (index <= 0) {
        index = listImage.length - 1;
    } else {
        index--;
        boxWrapper.style.transform = `translateX(-${index * width}px)`;
    }

    return index;
}

function AutoSlide(listImage, boxWrapper, index, width, btns) {
    setInterval(() => {
        index = NextSlide(listImage, boxWrapper, index, width);
    }, 3000);
}
