const baseUrl = 'http://localhost:9999';
var inputName = document.querySelector('.form-group input');
var inputDesc = document.querySelector('.form-group textarea');
var lbCategoryName = document.querySelector('.lb-category-name');
var lbCategoryDesc = document.querySelector('.lb-category-desc');

async function GetData() {
    const res = await fetch(`${baseUrl}/categories/stores`);
    const data = await res.json();
    const tableBody = document.querySelector('.list-category tbody');
    if (data) {
        data.forEach((category, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="category_id">${category._id}</td>
                <td class="category_name">${category.name}</td>
                <td class="category_desc">${category.desc}</td>
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
        const listCategory = document.querySelectorAll('.list-category tbody tr');
        btnEditRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                lbCategoryName.style.fontSize = '14px';
                lbCategoryName.style.top = '10px';
                lbCategoryDesc.style.fontSize = '14px';
                lbCategoryDesc.style.top = '8px';

                const data = {
                    id: listCategory[index].querySelector('.category_id').textContent,
                    name: listCategory[index].querySelector('.category_name').textContent,
                    desc: listCategory[index].querySelector('.category_desc').textContent,
                };
                let lbModalCategory = document.querySelector('.modal__header-title');
                lbModalCategory.textContent = 'Cập nhật danh mục';
                let btnUpdate = document.getElementById('btn-update-category');
                btnUpdate.style.display = 'block';
                modalCategory.style.display = 'block';
                modalCategory.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
                overLay.style.display = 'block';

                if (data) {
                    let id = document.getElementById('id_category');
                    let inputName = document.querySelector('.form-group input');
                    let inputDesc = document.querySelector('.form-group textarea');

                    id.textContent = data.id;
                    inputName.value = data.name;
                    inputDesc.value = data.desc;
                }

                setTimeout(() => {
                    modalCategory.style.animation = '';
                }, 500);
            });
        });

        btnDeleteRow = document.querySelectorAll('.btn-delete-row');
        btnDeleteRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                lbCategoryName.style.fontSize = '14px';
                lbCategoryName.style.top = '10px';
                lbCategoryDesc.style.fontSize = '14px';
                lbCategoryDesc.style.top = '8px';
                const data = {
                    id: listCategory[index].querySelector('.category_id').textContent,
                    name: listCategory[index].querySelector('.category_name').textContent,
                    desc: listCategory[index].querySelector('.category_desc').textContent,
                };
                let lbModalCategory = document.querySelector('.modal__header-title');
                lbModalCategory.textContent = 'Xóa danh mục';
                let btnDelete = document.getElementById('btn-delete-category');
                btnDelete.style.display = 'block';
                modalCategory.style.display = 'block';
                modalCategory.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
                overLay.style.display = 'block';

                if (data) {
                    let id = document.getElementById('id_category');
                    let inputName = document.querySelector('.form-group input');
                    let inputDesc = document.querySelector('.form-group textarea');

                    id.textContent = data.id;
                    inputName.value = data.name;
                    inputDesc.value = data.desc;
                }

                setTimeout(() => {
                    modalCategory.style.animation = '';
                }, 500);
            });
        });
    }
}

GetData();

const btnShowModalAddCategory = document.getElementById('btn-show-modal-add-category');
var modalCategory = document.querySelector('.modal');
var overLay = document.querySelector('.overlay');

btnShowModalAddCategory?.addEventListener('click', () => {
    let lbModalCategory = document.querySelector('.modal__header-title');
    lbModalCategory.textContent = 'Thêm danh mục';
    let btnAdd = document.getElementById('btn-save-category');
    btnAdd.style.display = 'block';
    modalCategory.style.display = 'block';
    modalCategory.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
    overLay.style.display = 'block';

    setTimeout(() => {
        modalCategory.style.animation = '';
    }, 500);
});

function CheckInput() {
    inputName?.addEventListener('input', () => {
        if (inputName.value.length > 0) {
            lbCategoryName.style.fontSize = '14px';
            lbCategoryName.style.top = '10px';
        } else {
            lbCategoryName.style.fontSize = '16px';
            lbCategoryName.style.top = '50%';
        }
    });

    inputDesc?.addEventListener('input', () => {
        if (inputDesc.value.length > 0) {
            lbCategoryDesc.style.fontSize = '14px';
            lbCategoryDesc.style.top = '8px';
        } else {
            lbCategoryDesc.style.fontSize = '16px';
            lbCategoryDesc.style.top = '50%';
        }
    });
}

CheckInput();

const btnSaveCategory = document.getElementById('btn-save-category');
btnSaveCategory?.addEventListener('click', async () => {
    const formData = {
        name: inputName.value,
        desc: inputDesc.value,
    };
    const res = await fetch(`${baseUrl}/categories/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res) {
        modalCategory.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Thêm thành công', 3000);
        const tableBody = document.querySelector('.list-category tbody');
        tableBody.innerHTML = '';
        GetData();
    }
});

const btnUpdateCategory = document.getElementById('btn-update-category');
btnUpdateCategory?.addEventListener('click', async () => {
    const _id = document.getElementById('id_category').textContent;

    const formData = {
        _id,
        name: inputName.value,
        desc: inputDesc.value,
    };

    const res = await fetch(`${baseUrl}/categories/edit/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.status === 200) {
        modalCategory.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);
        const tableBody = document.querySelector('.list-category tbody');
        tableBody.innerHTML = '';
        GetData();
        inputName.value = '';
        inputDesc.value = '';
    }
});

const btnDeleteCategory = document.getElementById('btn-delete-category');
btnDeleteCategory?.addEventListener('click', async () => {
    const _id = document.getElementById('id_category').textContent;
    const res = await fetch(`${baseUrl}/categories/delete/${_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id,
            name: inputName.value,
            desc: inputDesc.value,
        }),
    });

    if (res.status == 200) {
        modalCategory.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Xóa thành công', 3000);
        const tableBody = document.querySelector('.list-category tbody');
        tableBody.innerHTML = '';
        GetData();
        inputName.value = '';
        inputDesc.value = '';
    }
});

const btnCloseModal = document.getElementById('btn-close-category');
btnCloseModal?.addEventListener('click', () => {
    let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
    listBtnControllModal.forEach((btn) => {
        btn.style.display = 'none';
    });
    inputName.value = '';
    inputDesc.value = '';
    modalCategory.style.animation = 'OpactiyFadeOut 0.5s ease-in-out';
    setTimeout(() => {
        modalCategory.style.display = 'none';
        overLay.style.display = 'none';
    }, 400);
});
