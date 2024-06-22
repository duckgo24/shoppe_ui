
const baseUrl = 'http://localhost:9999';
async function RenderData() {
    const accountId = JSON.parse(localStorage.getItem('account'))?._id;

    const url = new URL(`${baseUrl}/bills/find`);
    url.searchParams.append('account', accountId);
    url.searchParams.append('isPaid', true);
    if (accountId) {
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();


            if(data && data.length > 0) {
                const noBill = document.querySelector('.no-bill');
                noBill.style.display = 'none';
                const myOrder = document.querySelector('.my-order-info');
                myOrder.style.display = 'flex';
                myOrder.innerHTML = data.map((item) => {
                    return `
                         <div class="bill">
                                <div class="tbody-tr tr-product">
                                    <span id="id_bill">666aff6d72cfb8a82b324cea</span>
                                    <div class="tbody-tr-td">
                                        <img src="${item?.image}" alt="" class="img-product" height="110px">
                                        <div style="text-align: start; width: 220px; padding: 0 10px">
                                            <span class="name-product">
                                                ${item?.product}        
                                            </span>
                                            <br>
                                            <span class="back text-primary"> Miễn phí đổi trả 15 ngày </span>
                                            <br>
                                            <img src="../../assets/image/back.jpg" alt="" height="15px" style="margin-top: 4px">
                                        </div>
                                        <div class="info-product">
                                            <div>
                                                Phân loại hàng:
                                                <i class="fa-solid fa-chevron-down" style="font-size: var(--fs-1)"></i>
                                            </div>
                                            <div>
                                                <span>Màu:  ${item?.color}</span>
                                                <span>Size: ${item?.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tbody-tr-td">
                                        <span>₫</span>
                                        <span class="price-product">${item?.price}</span>
                                    </div>
                                    <div class="tbody-tr-td">
                                        <span class="quantity-product">${item?.quantity}</span>
                                    </div>
                                    <div class="tbody-tr-td text-primary">
                                        <span>₫</span>
                                        <span class="total-product">${item?.total}</span>
                                    </div>
                                </div>
                                <div class="status">
                                    <img src="../../assets/image/free-ship.png" alt="" height="25px">
                                    <span>Đặt hàng thành công</span>
                                </div>
                            </div>
                    `
                });

            }


    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    LoadFullName();

}

RenderData();
async function LoadFullName() {
    const accountInfo = localStorage.getItem('account');
    const fullName = document.querySelector('.fullname');
    const accId = JSON.parse(accountInfo)?._id;

    const url = new URL(`${baseUrl}/users/getInfoByAccId`);
    url.searchParams.append('account', accId);

    if (accId) {
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) =>res.json())
            .then((data) => {
                fullName.textContent = data.name ? data.name : '';
            });
    }
}

