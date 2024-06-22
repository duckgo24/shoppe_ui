const baseUrl = 'http://localhost:9999';


var navNameProduct = document.querySelector('.nav-name-product');
var nameProduct = document.querySelector('.name-product');
var priceProductOrigin = document.querySelector('.price-origin');
var priceProductDiscount = document.querySelector('.price-discount');
var expiry = document.querySelector('.expiry');
var image = document.querySelector('.img-main');

function LoadData() {
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
        // let srcImg = btn.querySelector('img').src;
        // imgMain.src = srcImg;
    });
});

var listBtnSize = document.querySelectorAll('.size button');
listBtnSize.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        listBtnSize.forEach((btn) => {
            btn.classList.remove('btn-active-product');
        });

        btn.classList.add('btn-active-product');
    });
});

const btnAddQuantity = document.querySelector('.btn-add-quantity');
const btnSubQuantity = document.querySelector('.btn-sub-quantity');
var quantity = document.querySelector('.quantity');

btnAddQuantity.addEventListener('click', () => {
    quantity.textContent++;
});

btnSubQuantity.addEventListener('click', () => {
    if (quantity.textContent > 1) {
        quantity.textContent--;
    }
});



const btnAddToCart = document.querySelector('.btn-add-cart');
btnAddToCart?.addEventListener('click', async () => {

    const account = JSON.parse(localStorage.getItem('account'));
    if(!account) {
        Toast("error", "Thông báo", "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng", 3000);
        return;
    }


    let _colorChoose = document.querySelector('.color .btn-active-product span');
    let _sizeChoose = document.querySelector('.size .btn-active-product');
    let _priceProductDiscount = priceProductDiscount.textContent.replace(/[₫.]/g, '');
    

    if(!_colorChoose) {
        Toast("error", "Thông báo", "Vui lòng chọn màu sản phẩm", 3000);
        return;
    }

    if(!_sizeChoose) {
        Toast("error", "Thông báo", "Vui lòng chọn size sản phẩm", 3000);
        return;
    }

    const formData = {
        product: nameProduct.textContent,
        image: imgMain.src,
        size: _sizeChoose?.textContent,
        color: _colorChoose?.textContent, 
        price: _priceProductDiscount,
        quantity: quantity.textContent,
        total: parseInt(_priceProductDiscount) * parseInt(quantity.textContent),
        address : '', 
        payMethod: "Thanh toán khi nhận hàng",
        isPaid: false ,
        account: JSON.parse(localStorage.getItem('account'))?._id
    };
    

    try {
        const res = await fetch(`${baseUrl}/bills/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(res.status === 200) {
            Toast("success", "Thông báo", "Thêm sản phẩm vào giỏ hàng thành công", 3000);
            listBtnColor.forEach((btn) => {
                btn.classList.remove('btn-active-product');
            });
            listBtnSize.forEach((btn) => {
                btn.classList.remove('btn-active-product');
            });
            quantity.textContent = 1;
            CartNoPaid();
            return;
        }

    } catch (error) {
        Toast("error", "Thông báo", "Đã có lõi xảy ra", 3000);
        return;
    }
});



const btnBuyNow = document.querySelector('.btn-buy-now');
btnBuyNow?.addEventListener('click', async () => {  
    
    const account = JSON.parse(localStorage.getItem('account'));
    if(!account) {
        Toast("error", "Thông báo", "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng", 3000);
        return;
    }

    let _colorChoose = document.querySelector('.color .btn-active-product span');
    let _sizeChoose = document.querySelector('.size .btn-active-product');
    let _priceProductDiscount = priceProductDiscount.textContent.replace(/[₫.]/g, '');
    

    if(!_colorChoose) {
        Toast("error", "Thông báo", "Vui lòng chọn màu sản phẩm", 3000);
        return;
    }

    if(!_sizeChoose) {
        Toast("error", "Thông báo", "Vui lòng chọn size sản phẩm", 3000);
        return;
    }

    const formData = [{
        product: nameProduct.textContent,
        image: imgMain.src,
        size: _sizeChoose?.textContent,
        color: _colorChoose?.textContent, 
        price: _priceProductDiscount,
        quantity: quantity.textContent,
        total: parseInt(_priceProductDiscount) * parseInt(quantity.textContent),
        address : '', 
        isPaid: false ,
        account: JSON.parse(localStorage.getItem('account'))?._id
    }];
    
    localStorage.setItem('bill', JSON.stringify(formData));
    window.location.href = './hoadon.html';

});

