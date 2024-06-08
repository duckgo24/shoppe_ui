

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
            expiry
        };
        
        localStorage.setItem('product', JSON.stringify(data));
        window.location.href = '../ProductDetail/productdetail.html';
    });
});