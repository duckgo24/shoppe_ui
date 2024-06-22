const baseUrl = 'http://localhost:9999';

async function CartNoPaid() {
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

            if (data && data.length > 0) {
                const tBody = document.querySelector('.main-tbody');
                tBody.innerHTML = `${data.map((item, index) => {
                    return `

                        <div class="tbody-tr tr-product">
                            <span id="id_bill">${item._id}</span>
                            <div class="tbody-tr-td">
                       
                                <input type="checkbox" class="checkbox-product">
                                <img src="${item.image}" alt="" class="img-product" height="80px" width="80px">
                                <div style="text-align: start; width: 220px">
                                    <span class="name-product">
                                        ${item.product}
                                    </span>
                                    <br />
                                    <span class="back text-primary">
                                        Miễn phí đổi trả 15 ngày
                                    </span>
                                    <br />
                                    <img src="../../assets/image/back.jpg" alt="" height="15px" style="margin-top: 4px;">
                                </div>
                                <div class="info-product">
                                    <div>
                                        Phân loại hàng:
                                        <i class="fa-solid fa-chevron-down" style="font-size: var(--fs-1);"></i>
                                    </div>
                                    <div>
                                        <span>Màu: ${item.color}</span>
                                        <span>Size: ${item.size}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="tbody-tr-td">
                                <span>₫</span>
                                <span class="price-product">${item.price}</span>
                            </div>
                            <div class="tbody-tr-td">
                                <button class="btn btn-sub-product">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="quantity-product">1</span>
                                <button class="btn btn-add-product">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div class="tbody-tr-td text-primary">
                                <span>₫</span>
                                <span class="total-product">${item.total}</span>
                            </div>
                            <div class="tbody-tr-td">
                                <button class="btn-delete-product">
                                    Xóa
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>  
                        </div>
                        `;
                })}`;
            }

            var listInfoProduct = document.querySelectorAll('.tr-product');

            var listBtnaddProduct = document.querySelectorAll('.btn-add-product');
            var listBtnSubProduct = document.querySelectorAll('.btn-sub-product');
            listBtnaddProduct?.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    let priceProduct = listInfoProduct[index].querySelector('.tbody-tr-td .price-product');
                    let totalProduct = listInfoProduct[index].querySelector('.tbody-tr-td .total-product');
                    let quantity = listInfoProduct[index].querySelector('.tbody-tr-td .quantity-product');
                    quantity.textContent++;

                    totalProduct.textContent = parseInt(priceProduct.textContent) * parseInt(quantity.textContent);
                });
            });

            listBtnSubProduct?.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    var quantity = listInfoProduct[index].querySelector('.tbody-tr-td .quantity-product');
                    if (quantity.textContent > 1) {
                        let priceProduct = listInfoProduct[index].querySelector('.tbody-tr-td .price-product');
                        let totalProduct = listInfoProduct[index].querySelector('.tbody-tr-td .total-product');
                        let quantity = listInfoProduct[index].querySelector('.tbody-tr-td .quantity-product');
                        quantity.textContent--;

                        totalProduct.textContent = parseInt(priceProduct.textContent) * parseInt(quantity.textContent);
                    }
                });
            });

            var listCheckBoxProduct = document.querySelectorAll('.tbody-tr-td .checkbox-product');
            let numChecked = 0;
            listCheckBoxProduct?.forEach((checkbox, index) => {
                checkbox.addEventListener('change', () => {
                    let totalProduct = listInfoProduct[index].querySelector('.tbody-tr-td .total-product');
                    let checkBox = listInfoProduct[index].querySelector('.tbody-tr-td .checkbox-product');
                    let numProductChecked = document.querySelector('.num-product-checked');
                    let numProductCheckedPaid = document.querySelector('.num-product-paid-checked');
                    let totalAll = document.querySelector('.total-all');

                    if (checkBox.checked) {
                        checkBox.setAttribute('checked', 'checked');
                        numChecked++;
                        numProductChecked.textContent = `(${numChecked})`;
                        totalAll.textContent = parseInt(totalAll.textContent) + parseInt(totalProduct.textContent);
                    } else {
                        checkBox.removeAttribute('checked');
                        numChecked--;
                        numProductChecked.textContent = `(${numChecked})`;
                        totalAll.textContent = parseInt(totalAll.textContent) - parseInt(totalProduct.textContent);
                    }

                    numProductChecked.textContent = `(${numChecked})`;
                    numProductCheckedPaid.textContent = `(${numChecked} sản phẩm)`;
                });
            });

            var checkBoxAll = document.querySelector('.checkbox-all-footer');
            checkBoxAll?.addEventListener('change', () => {
                let numProductChecked = document.querySelector('.num-product-checked');
                let numProductCheckedPaid = document.querySelector('.num-product-paid-checked');

                if (checkBoxAll.checked) {
                    numChecked = listCheckBoxProduct.length;
                    listCheckBoxProduct.forEach((checkBox, index) => {
                        checkBox.setAttribute('checked', 'checked');
                        let totalAll = document.querySelector('.total-all');
                        let totalProduct = listInfoProduct[index].querySelector('.tbody-tr-td .total-product');
                        totalAll.textContent = parseInt(totalAll.textContent) + parseInt(totalProduct.textContent);
                    });
                } else {
                    numChecked = 0;
                    listCheckBoxProduct.forEach((checkBox, index) => {
                        checkBox.removeAttribute('checked');
                        let totalAll = document.querySelector('.total-all');
                        let totalProduct = listInfoProduct[index].querySelector('.tbody-tr-td .total-product');
                        totalAll.textContent = 0;
                    });
                }

                numProductChecked.textContent = `(${numChecked})`;
                numProductCheckedPaid.textContent = `(${numChecked} sản phẩm)`;
            });
        } catch (error) {
            console.log(error);
        }

        const btnDeleteProduct = document.querySelectorAll('.btn-delete-product');
        btnDeleteProduct?.forEach((btn, index) => {
            btn.addEventListener('click', async () => {
                let loading = document.querySelector('.loading');
                let container = document.querySelector('.Cart__container');
                loading.style.display = 'flex';
                container.style.overflow = 'hidden';

                const timerId = setTimeout(async () => {
                    container.style.overflow = 'auto';
                    const idBill = listInfoProduct[index].querySelector('#id_bill').textContent;
                    const url = new URL(`${baseUrl}/bills/delete/${idBill}`);
                    try {
                        const res = await fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        const data = await res.json();
                        if (data) {
                            location.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }, 2000);
            });
        });

        const btnCheckOut = document.querySelector('.btn-checkout');
        btnCheckOut.addEventListener('click', async () => {
            const listBillPay = [];
            listCheckBoxProduct.forEach((checkbox, index) => {
                if (checkbox.checked) {
                    let idBill = listInfoProduct[index].querySelector('#id_bill').textContent;
                    listBillPay.push({ idBill });
                }
            });
            if(listBillPay.length === 0) {
                alert('Vui lòng chọn sản phẩm');
                return;
            
            }
            localStorage.setItem('listBillPay', JSON.stringify(listBillPay));
            window.location.href = './hoadon.html';
        });
    }
}

CartNoPaid();
