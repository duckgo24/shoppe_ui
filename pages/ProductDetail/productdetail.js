function LoadData() {
    let navNameProduct = document.querySelector('.nav-name-product');
    let nameProduct = document.querySelector('.name-product');
    let priceProductOrigin = document.querySelector('.price-origin');
    let priceProductDiscount = document.querySelector('.price-discount');
    let expiry = document.querySelector('.expiry');
    let image = document.querySelector('.img-main');

    const dataProduct = JSON.parse(localStorage.getItem('product'));
    if (dataProduct) {
        navNameProduct.textContent = dataProduct.nameProduct;
        nameProduct.textContent = dataProduct.nameProduct;
        priceProductOrigin.textContent = dataProduct.priceProductOrigin;
        priceProductDiscount.textContent = dataProduct.priceProductDiscount;
        expiry.textContent = dataProduct.expiry;
        image.src = dataProduct.image;
    }
}

LoadData();

var imgMain = document.querySelector('.img-main');
var listImg = document.querySelectorAll('.ProductDetail__container-main__main .left .left__list-img img');
listImg.forEach((img) => {
    img.addEventListener('mouseover', () => {
        imgMain.src = img.src;
    });
});

var listBtnColor = document.querySelectorAll('.color button');
var listTextColor = document.querySelectorAll('.color span');
listBtnColor.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        listBtnColor.forEach((btn) => {
            btn.classList.remove('btn-active-product');
        });

        btn.classList.add('btn-active-product');
        let srcImg = btn.querySelector('img').src;
        let textColor = listTextColor[index].textContent;
        imgMain.src = srcImg;
    });
});

var listBtnSize = document.querySelectorAll('.size button');
listBtnSize.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        listBtnSize.forEach((btn) => {
            btn.classList.remove('btn-active-product');
        });

        btn.classList.add('btn-active-product');

        console.log(btn.textContent);
    });
});

var btnAddQuantity = document.querySelector('.btn-add-quantity');
var btnSubQuantity = document.querySelector('.btn-sub-quantity');
var quantity = document.querySelector('.quantity');

btnAddQuantity.addEventListener('click', () => {
    quantity.textContent++;
});

btnSubQuantity.addEventListener('click', () => {
    if (quantity.textContent > 1) {
        quantity.textContent--;
    }
});
