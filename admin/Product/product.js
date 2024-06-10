const baseUrl = 'http://localhost:9999';

async function LoadCategories() {
    const res = await fetch(`${baseUrl}/categories/stores`);
    if (res.status === 200) {
        const data = await res.json();
        const selectCategory = document.querySelector('.select-category select');
        if (data) {
            data.forEach((category) => {
                const option = document.createElement('option');
                option.value = category._id;
                option.textContent = category.name;
                selectCategory.appendChild(option);
            });
        }
    }
}
LoadCategories();

async function GetData() {
    const res = await fetch(`${baseUrl}/products/stores`);
    const data = await res.json();
    const tableBody = document.querySelector('.list-product tbody');
    if (data) {
        data.forEach((product, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="product_id">${product._id}</td>
                <td class="product_name">${product.name}</td>
                <td class="product_price">${product.price}</td>
                <td class="product_quantity">${product.quantity}</td>
                <td class="product_unit">${product.unit}</td>
                <td class="product_image">
                    <img src="${product.image}" alt="product-image" class="product-image-td">
                </td>
                <td class="product_size">${product.size}</td>
                <td class="product_color">${product.color}</td>
                <td class="product_category">${product.category}</td>
                <td>
                    <button class="btn-edit-row">
                        <i class="fa-solid fa-edit"></i>
                        <span>Sửa</span>
                    </button>
                </td>
                <td>
                    <button class="btn-delete-row">
                        <i class="fa-solid fa-trash"></i>
                        <span>Xóa</span>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        const btnEditRow = document.querySelectorAll('.btn-edit-row');
        btnEditRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                GetDataByRow(index, 'edit');
            });
        });

        btnDeleteRow = document.querySelectorAll('.btn-delete-row');
        btnDeleteRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                GetDataByRow(index, 'delete');
            });
        });
    }
}

GetData();

function GetDataByRow(index, option) {
    const listProduct = document.querySelectorAll('.list-product tbody tr');
    const data = {
        id: listProduct[index].querySelector('.product_id').textContent,
        name: listProduct[index].querySelector('.product_name').textContent,
        price: listProduct[index].querySelector('.product_price').textContent,
        quantity: listProduct[index].querySelector('.product_quantity').textContent,
        unit: listProduct[index].querySelector('.product_unit').textContent,
        image: listProduct[index].querySelector('.product_image img').src,
        size: listProduct[index].querySelector('.product_size').textContent,
        color: listProduct[index].querySelector('.product_color').textContent,
        category: listProduct[index].querySelector('.product_category').textContent,
    };

    let lbModalProduct = document.querySelector('.modal__header-title');
    let btnUpdate = document.getElementById('btn-update-product');
    let btnDelete = document.getElementById('btn-delete-product');
    lbModalProduct.textContent = option === 'edit' ? 'Cập nhật sản phẩm' : 'Xóa sản phẩm';

    if (option === 'edit') {
        btnUpdate.style.display = 'block';
        btnDelete.style.display = 'none';
    } else {
        btnUpdate.style.display = 'none';
        btnDelete.style.display = 'block';
    }

    modalProduct.style.display = 'block';
    modalProduct.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
    overLay.style.display = 'block';

    if (data) {
        let id = document.getElementById('id_product');
        let inputName = document.querySelector('.input-name');
        let inputPrice = document.querySelector('.input-price');
        let inputQuantity = document.querySelector('.input-quantity');
        let inputUnit = document.querySelector('.input-unit');
        let inputColor = document.querySelector('.input-color');
        let inputSize = document.querySelector('.input-size');
        let urlImage = document.querySelector('.image-preview');
        let categorySelected = document.querySelector('.select-category select');

        id.textContent = data.id;
        inputName.value = data.name;
        inputPrice.value = data.price;
        inputQuantity.value = data.quantity;
        inputUnit.value = data.unit;
        inputColor.value = data.color;
        inputSize.value = data.size;
        urlImage.src = data.image;
        categorySelected.value = data.category;
    }

    setTimeout(() => {
        modalProduct.style.animation = '';
    }, 500);
}

const inputUpLoadImage = document.querySelector('.image-upload');
const imgPreview = document.querySelector('.image-preview');
inputUpLoadImage?.addEventListener('change', (e) => {
    let key = '7b01ffc71f98f9b012c2cd72aa4d92f2';
    const reader = new FileReader();
    reader.onloadend = async () => {
        const imgBase64 = reader.result.split(',')[1];
        try {
            const formData = new FormData();
            formData.append('image', imgBase64);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            imgPreview.src = data.data?.url;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    reader.readAsDataURL(inputUpLoadImage.files[0]);
});

const categorySelected = document.querySelector('.select-category select');
var _idCategory = '';
categorySelected?.addEventListener('change', () => {
    _idCategory = categorySelected.value;
    console.log(_idCategory);
});

const btnShowModalAddProduct = document.getElementById('btn-show-modal-add-product');
var modalProduct = document.querySelector('.modal');
var overLay = document.querySelector('.overlay');

btnShowModalAddProduct?.addEventListener('click', () => {
    let btnSaveProduct = document.getElementById('btn-save-product');
    let lbModalProduct = document.querySelector('.modal__header-title');
    lbModalProduct.textContent = 'Thêm sản phẩm';
    btnSaveProduct.style.display = 'block';
    modalProduct.style.display = 'block';
    modalProduct.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
    overLay.style.display = 'block';

    setTimeout(() => {
        modalProduct.style.animation = '';
    }, 500);
});

function CheckInput() {
    var inputEs = document.querySelectorAll('.form-group input[type="text"]');
    inputEs.forEach((input) => {
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.nextElementSibling.style.fontSize = '14px';
                input.nextElementSibling.style.top = '10px';
            } else {
                input.nextElementSibling.style.fontSize = '16px';
                input.nextElementSibling.style.top = '50%';
            }
        });
    });
}
CheckInput();

var inputName = document.querySelector('.input-name');
var inputPrice = document.querySelector('.input-price');
var inputQuantity = document.querySelector('.input-quantity');
var inputUnit = document.querySelector('.input-unit');
var inputColor = document.querySelector('.input-color');
var inputSize = document.querySelector('.input-size');
var urlImage = document.querySelector('.image-preview');

const btnSaveProduct = document.getElementById('btn-save-product');
btnSaveProduct?.addEventListener('click', async () => {
    const formData = {
        name: inputName.value,
        price: inputPrice.value,
        quantity: inputQuantity.value,
        unit: inputUnit.value,
        image: urlImage.src,
        size: inputSize.value,
        color: inputColor.value,
        category: _idCategory,
    };

    console.log(formData);
    const res = await fetch(`${baseUrl}/products/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.status === 200) {
        modalProduct.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Thêm thành công', 3000);
        const tableBody = document.querySelector('.list-product tbody');
        tableBody.innerHTML = '';
        GetData();
    }
});

const btnUpdateProduct = document.getElementById('btn-update-product');
btnUpdateProduct?.addEventListener('click', async () => {
    const _id = document.getElementById('id_product').textContent;

    const formData = {
        _id,
        name: inputName.value,
        price: inputPrice.value,
        quantity: inputQuantity.value,
        unit: inputUnit.value,
        image: urlImage.src,
        size: inputSize.value,
        color: inputColor.value,
        category: _idCategory,
    };
    
    const res = await fetch(`${baseUrl}/products/edit/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.status === 200) {
        modalProduct.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);
        const tableBody = document.querySelector('.list-product tbody');
        tableBody.innerHTML = '';
        GetData();
        ResetInput();
    }
});


const btnDeleteProduct = document.getElementById('btn-delete-product');
btnDeleteProduct?.addEventListener('click', async () => {
    const _id = document.getElementById('id_product').textContent;
    const res = await fetch(`${baseUrl}/products/delete/${_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status == 200) {
        modalProduct.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });
        
        Toast('success', 'Thông báo', 'Xóa thành công', 3000);
        const tableBody = document.querySelector('.list-product tbody');
        tableBody.innerHTML = '';
        GetData();
        ResetInput();
    }
});


const btnCloseModal = document.getElementById('btn-close-product');
btnCloseModal?.addEventListener('click', () => {
    let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
    listBtnControllModal.forEach((btn) => {
        btn.style.display = 'none';
    });
    modalProduct.style.animation = 'OpactiyFadeOut 0.5s ease-in-out';
    setTimeout(() => {
        modalProduct.style.display = 'none';
        overLay.style.display = 'none';
        inputEs.forEach((input) => {
            input.value = '';
            input.nextElementSibling.style.fontSize = '16px';
            input.nextElementSibling.style.top = '50%';
        });
    }, 400);
});



function ResetInput() {
    let inputEs = document.querySelectorAll('.form-group input[type="text"]');
    inputEs.forEach((input) => {
        input.value = '';
        input.nextElementSibling.style.fontSize = '16px';
        input.nextElementSibling.style.top = '50%';
    });
    imgPreview.src = '';
}