const baseUrl = 'http://localhost:9999';

async function GetData() {
    const res = await fetch(`${baseUrl}/accounts/stores`);
    const data = await res.json();
    const tableBody = document.querySelector('.list-account tbody');
    if (data) {
        data.forEach((account, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="account_id">${account._id}</td>
                <td class="account_username">${account.username}</td>
                <td class="account_password">${account.password}</td>
                <td class="account_role">${account.role}</td>
                <td class="account_ban">
                    <input type="checkbox" ${account.isBan === true ? 'checked' : 'unchecked'}>
                </td>
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
        
    
        const inputBan = document.querySelectorAll('.account_ban input');
        inputBan?.forEach((inputE, index) => {
            inputE.addEventListener('change', async () => {
                const _id = document.querySelectorAll('.account_id')[index].textContent;
                const formData = {
                    _id,
                    isBan: inputE.checked ? true : false,
                }
                const res = await fetch(`${baseUrl}/accounts/edit/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
        
                if (res.status === 200) {
                    Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);
                }
            });
        });
        

        const btnEditRow = document.querySelectorAll('.btn-edit-row');
        const listAccount = document.querySelectorAll('.list-account tbody tr');
        btnEditRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const data = {
                    id: listAccount[index].querySelector('.account_id').textContent,
                    username: listAccount[index].querySelector('.account_username').textContent,
                    password: listAccount[index].querySelector('.account_password').textContent,
                    role: listAccount[index].querySelector('.account_role').textContent,
                };

                console.log(data);

                let lbModalAccount = document.querySelector('.modal__header-title');
                lbModalAccount.textContent = 'Cập nhật tài khoản';
                let btnUpdate = document.getElementById('btn-update-account');
                btnUpdate.style.display = 'block';
                modalAccount.style.display = 'block';
                modalAccount.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
                overLay.style.display = 'block';

                if (data) {
                    let id = document.getElementById('id_account');
                    let inputEs = document.querySelectorAll('.form-group input');
                    
                    id.textContent = data.id;
                    inputEs[0].value = data.username;
                    inputEs[1].value = data.password;
                    inputEs[2].value = data.role;
                }

                setTimeout(() => {
                    modalAccount.style.animation = '';
                }, 500);
            });
        });

        btnDeleteRow = document.querySelectorAll('.btn-delete-row');
        btnDeleteRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const data = {
                    id: listAccount[index].querySelector('.account_id').textContent,
                    username: listAccount[index].querySelector('.account_username').textContent,
                    password: listAccount[index].querySelector('.account_password').textContent,
                    role: listAccount[index].querySelector('.account_role').textContent,
                };
                let lbModalAccount = document.querySelector('.modal__header-title');
                lbModalAccount.textContent = 'Xóa tài khoản';
                let btnDelete = document.getElementById('btn-delete-account');
                btnDelete.style.display = 'block';
                modalAccount.style.display = 'block';
                modalAccount.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
                overLay.style.display = 'block';

                if (data) {
                    let id = document.getElementById('id_account');
                    let inputEs = document.querySelectorAll('.form-group input');
                    
                    id.textContent = data.id;
                    inputEs[0].value = data.username;
                    inputEs[1].value = data.password;
                    inputEs[2].value = data.role;
                }

                setTimeout(() => {
                    modalAccount.style.animation = '';
                }, 500);
            });
        });
    }
}

GetData();




const btnShowModalAddAccount = document.getElementById('btn-show-modal-add-account');
var modalAccount = document.querySelector('.modal');
var overLay = document.querySelector('.overlay');

btnShowModalAddAccount?.addEventListener('click', () => {
    let lbModalAccount = document.querySelector('.modal__header-title');
    lbModalAccount.textContent = 'Thêm tài khoản';
    let btnAdd = document.getElementById('btn-save-account');
    btnAdd.style.display = 'block';
    modalAccount.style.display = 'block';
    modalAccount.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
    overLay.style.display = 'block';

    setTimeout(() => {
        modalAccount.style.animation = '';
    }, 500);
});

var inputEs = document.querySelectorAll('.form-group input');
var lableEs = document.querySelectorAll('.form-group .lb');

function CheckInput() {
    inputEs?.forEach((inputE,index) => {
        inputE.addEventListener('input', () => {
            if (inputE.value.length > 0) {
                lableEs[index].style.fontSize = '14px';
                lableEs[index].style.top = '10px';
            } else {
                lableEs[index].style.fontSize = '16px';
                lableEs[index].style.top = '50%';
            }
        })

    })
}

CheckInput();

const btnSaveAccount = document.getElementById('btn-save-account');
btnSaveAccount?.addEventListener('click', async () => {
    const formData = {
        username: inputEs[0].value,
        password: inputEs[1].value,
        role: inputEs[2].value,
        isBan: false,
    };

    const res = await fetch(`${baseUrl}/accounts/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res) {
        modalAccount.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });
        
        Toast('success', 'Thông báo', 'Thêm thành công', 3000);
        const tableBody = document.querySelector('.list-account tbody');
        tableBody.innerHTML = '';
        GetData();
    }
});

const btnUpdateAccount = document.getElementById('btn-update-account');
btnUpdateAccount?.addEventListener('click', async () => {
    const _id = document.getElementById('id_account').textContent;

    const formData = {
        _id,
        username: inputEs[0].value,
        password: inputEs[1].value,
        role: inputEs[2].value,
    };

    const res = await fetch(`${baseUrl}/accounts/edit/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.status === 200) {
        modalAccount.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);
        const tableBody = document.querySelector('.list-account tbody');
        tableBody.innerHTML = '';
        GetData();
        inputEs.forEach((inputE) => { 
            inputE.value = '';
        });
        
    }
});

const btnDeleteAccount = document.getElementById('btn-delete-account');
btnDeleteAccount?.addEventListener('click', async () => {
    const _id = document.getElementById('id_account').textContent;
    const res = await fetch(`${baseUrl}/accounts/delete/${_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status == 200) {
        modalAccount.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });
        
        Toast('success', 'Thông báo', 'Xóa thành công', 3000);
        const tableBody = document.querySelector('.list-account tbody');
        tableBody.innerHTML = '';
        GetData();
        
        inputEs.forEach((inputE) => { 
            inputE.value = '';
        });
    }
});

const btnCloseModal = document.getElementById('btn-close-account');
btnCloseModal?.addEventListener('click', () => {
    let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
    listBtnControllModal.forEach((btn) => {
        btn.style.display = 'none';
    });

    inputEs.forEach((inputE) => { 
        inputE.value = '';
    });
    
    modalAccount.style.animation = 'OpactiyFadeOut 0.5s ease-in-out';
    setTimeout(() => {
        modalAccount.style.display = 'none';
        overLay.style.display = 'none';
    }, 400);
});
