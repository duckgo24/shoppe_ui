const baseUrl = 'http://localhost:9999';

async function RenderData() {
    var _data = [];

    const bills = localStorage.getItem('bill');
    if (bills) {
        _data = JSON.parse(bills);
    }

    const dataLocalStorage = JSON.parse(localStorage.getItem('listBillPay'));
    if (dataLocalStorage) {
        try {
            const fetchData = dataLocalStorage.map(async (item) => {
                const url = new URL(`${baseUrl}/bills/find/${item.idBill}`);
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return await res.json();
            });

            _data = await Promise.all(fetchData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const tBody = document.querySelector('.main-tbody');

    let totalBill = 0;
    tBody.innerHTML = _data.map((item) => {
        totalBill += item.total;
        let _totalBill = document.querySelector('.total');
        _totalBill.textContent = `₫${totalBill}`;
        return `
        <div class="tbody-tr tr-product">
            <span class="id_bill">${item?._id}</span>
            <div class="tbody-tr-td">
                <img
                    src="${item?.image}"
                        alt=""
                        class="img-product"
                        height="80px"
                        width="80px"
                    />
                <div style="text-align: start; width: 220px">
                    <span class="name-product">
                        ${item?.product}        
                    </span>
                    <br />
                    <span class="back text-primary"> Miễn phí đổi trả 15 ngày </span>
                    <br />
                    <img
                        src="../../assets/image/back.jpg"
                        alt=""
                        height="15px"
                        style="margin-top: 4px"
                    />
                </div>
                <div class="info-product">
                    <div>
                        Phân loại hàng:
                        <i class="fa-solid fa-chevron-down" style="font-size: var(--fs-1)"></i>
                    </div>
                    <div>
                        <span>Màu: ${item?.color}</span>
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
        `;
    });

    const btnPay = document.querySelector('.btn-pay');
    var loading = document.querySelector('.loading');
    var container = document.querySelector('.Checkout__container');

    btnPay?.addEventListener('click', async () => {
        loading.style.display = 'flex';
        container.style.overflow = 'hidden';

        _data.map(async (item) => {
            const urlPUT = new URL(`${baseUrl}/bills/update/${item._id}`);
            const urlPOST = new URL(`${baseUrl}/bills/create`);
            let address = document.querySelector('.deliver-address').textContent;
            try {
                const res = await fetch(item._id ? urlPUT : urlPOST, {
                    method: item._id ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        item._id
                            ? {
                                _id: item._id,
                                isPaid: true,
                                address,
                              }
                            : {
                                ...item,
                                address,
                                payMethod: payMethodDefault.textContent,
                                isPaid: true,
                              },
                    ),
                });
                const data = await res.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        setTimeout(() => {
            loading.style.display = 'none';
            container.style.overflow = 'auto';
            localStorage.removeItem('listBillPay');
            localStorage.removeItem('bill');
            window.location.href = './donhangdamua.html';
        }, 2000);
    });
}

RenderData();

const btnChangePayMethod = document.querySelector('.btn-change-pay-method');
var listMethod = document.querySelector('.list-method');
var payMethodDefault = document.querySelector('.pay-method-default');
btnChangePayMethod?.addEventListener('click', () => {
    listMethod.style.display = 'flex';
});

var listBtnMethod = document.querySelectorAll('.list-method button');
listBtnMethod?.forEach((btn) => {
    btn.addEventListener('click', () => {
        listBtnMethod.forEach((btn) => {
            btn.classList.remove('btn-active-method');
        });

        btn.classList.add('btn-active-method');
        payMethodDefault.textContent = btn.textContent;
    });
});
