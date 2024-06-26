const baseUrl = 'http://localhost:9999/users';
var inputEs = document.querySelectorAll('.form-group input[type="text"]');
var modalUser = document.querySelector('.modal');
var overLay = document.querySelector('.overlay');

const renderData = async () => {
    const fetchApi = await fetch(`${baseUrl}/stores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await fetchApi.json();

    console.log(data);
    if (data) {
        const tableBody = document.querySelector('.list-user tbody');
        data.forEach((user) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td class="user_id">${user?._id}</td>
            <td class="user_name">${user?.name}</td>
            <td class="user_birth">${user.birth ? FormatDateVN(user?.birth) : undefined}</td>
            <td class="user_gender">${user?.gender}</td>
            <td class="user_phone">${user?.phone}</td>
            <td class="user_email">${user?.email}</td>
            <td class="user_nickname">${user?.nickName}</td>
            <td class="user_avatar">
                <img src="${user?.avatar}" alt="user-avatar" class="user-avatar-td">
            </td>
            <td class="user_acc">${user?.account}</td>
            <td>
                <button class="btn-edit-row">
                    <i class="fa-solid fa-edit"></i>
                    <span>Sửa</span>
                </button>
            </td>
        `;
            tableBody.appendChild(tr);
        });

        const btnEditRow = document.querySelectorAll('.btn-edit-row');
        btnEditRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                inputEs.forEach((input) => {
                    input.nextElementSibling.style.fontSize = '14px';
                    input.nextElementSibling.style.top = '12px';
                });

                GetDataByRow(index, 'edit');
            });
        });

        btnDeleteRow = document.querySelectorAll('.btn-delete-row');
        btnDeleteRow?.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                GetDataByRow(index, 'delete');

                inputEs.forEach((input) => {
                    input.nextElementSibling.style.fontSize = '14px';
                    input.nextElementSibling.style.top = '12px';
                });
            });
        });
    }
};

renderData();

function GetDataByRow(index, option) {
    const listUser = document.querySelectorAll('.list-user tbody tr');
    const data = {
        id: listUser[index].querySelector('.user_id').textContent,
        name: listUser[index].querySelector('.user_name').textContent,
        birth: listUser[index].querySelector('.user_birth').textContent,
        gender: listUser[index].querySelector('.user_gender').textContent,
        phone: listUser[index].querySelector('.user_phone').textContent,
        email: listUser[index].querySelector('.user_email').textContent,
        nickName: listUser[index].querySelector('.user_nickname').textContent,
    };

    let lbModalUser = document.querySelector('.modal__header-title');
    let btnUpdate = document.getElementById('btn-update-user');
    let btnDelete = document.getElementById('btn-delete-user');
    lbModalUser.textContent = option === 'edit' ? 'Cập nhật người dùng' : 'Xóa nguời dùng';

    if (option === 'edit') {
        btnUpdate.style.display = 'block';
        btnDelete.style.display = 'none';
    } else {
        btnUpdate.style.display = 'none';
        btnDelete.style.display = 'block';
    }

    modalUser.style.display = 'block';
    modalUser.style.animation = 'OpactiyFadeIn 0.5s ease-in-out';
    overLay.style.display = 'block';

    if (data) {
        let id = document.getElementById('id_user');
        let inputName = document.querySelector('.input-name');
        let inputBirth = document.querySelector('.input-birth');
        let inputGender = document.querySelector('.input-gender');
        let inputPhone = document.querySelector('.input-phone');
        let inputEmail = document.querySelector('.input-email');
        let inputNickName = document.querySelector('.input-nickname');

        id.textContent = data.id;
        inputName.value = data.name;
        inputBirth.value = FormatDateJS(data.birth);
        inputGender.value = data.gender;
        inputPhone.value = data.phone;
        inputEmail.value = data.email;
        inputNickName.value = data.nickName;
    }

    setTimeout(() => {
        modalUser.style.animation = '';
    }, 500);
}

const btnUpdateUser = document.getElementById('btn-update-user');
btnUpdateUser?.addEventListener('click', async () => {
    const _id = document.getElementById('id_user').textContent;
    let inputName = document.querySelector('.input-name');
    let inputBirth = document.querySelector('.input-birth');
    let inputGender = document.querySelector('.input-gender');
    let inputPhone = document.querySelector('.input-phone');
    let inputEmail = document.querySelector('.input-email');
    let inputNickName = document.querySelector('.input-nickname');
    const formData = {
        _id,
        name: inputName.value,
        gender: inputGender.value,
        birth: inputBirth.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        nickName: inputNickName.value,
    };

    const res = await fetch(`${baseUrl}/edit/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.status === 200) {
        modalUser.style.display = 'none';
        overLay.style.display = 'none';
        let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
        listBtnControllModal.forEach((btn) => {
            btn.style.display = 'none';
        });

        Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);
        const tableBody = document.querySelector('.list-user tbody');
        tableBody.innerHTML = '';
        renderData();
        ResetInput();
    }
});

const btnFindUser = document.querySelector('.btn-find-user');

btnFindUser.addEventListener('click', async () => {
    const optionFind = document.querySelector('.option');
    const inputFindUser = document.querySelector('.input-find-user').value.trim();
    let query = {};

    if (!inputFindUser) {
        console.error('Input is empty');
        return;
    }

    switch (optionFind.value) {
        case '0':
            query = { _id: inputFindUser };
            break;
        case '1':
            query = { name: inputFindUser };
            break;
        case '2':
            query = { gender: inputFindUser };
            break;
        case '3':
            query = { phone: inputFindUser };
            break;
        case '4':
            query = { account: inputFindUser };
            break;
        default:
            break;
    }

    try {
        const res = await fetch(`${baseUrl}/find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            if (data) {
                const tableBody = document.querySelector('.list-user tbody');
                tableBody.innerHTML = '';
                data.forEach((user) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="user_id">${user?._id}</td>
                        <td class="user_name">${user?.name}</td>
                        <td class="user_birth">${user.birth ? FormatDateVN(user?.birth) : undefined}</td>
                        <td class="user_gender">${user?.gender}</td>
                        <td class="user_phone">${user?.phone}</td>
                        <td class="user_email">${user?.email}</td>
                        <td class="user_nickname">${user?.nickName}</td>
                        <td class="user_avatar">
                            <img src="${user?.avatar}" alt="user-avatar" class="user-avatar-td">
                        </td>
                        <td class="user_acc">${user?.account}</td>
                        <td>
                            <button class="btn-edit-row">
                                <i class="fa-solid fa-edit"></i>
                                <span>Sửa</span>
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(tr);
                });
            }
        } else {
            console.error('Error:', res.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

const inputFindUser = document.querySelector('.input-find-user');
inputFindUser.addEventListener('input', (e) => {
    let lb = document.querySelector('.lb-user');
    if (e.target.value) {
        lb.style.fontSize = '12px';
        lb.style.top = '6px';
    } else {
        lb.style.fontSize = '16px';
        lb.style.top = '50%';
    }
});

const btnCloseModal = document.getElementById('btn-close-user');
btnCloseModal?.addEventListener('click', () => {
    let listBtnControllModal = document.querySelectorAll('.btn-control-modal');
    listBtnControllModal.forEach((btn) => {
        btn.style.display = 'none';
    });
    modalUser.style.animation = 'OpactiyFadeOut 0.5s ease-in-out';
    setTimeout(() => {
        modalUser.style.display = 'none';
        overLay.style.display = 'none';
        ResetInput();
    }, 400);
});

function ResetInput() {
    let inputEs = document.querySelectorAll('.form-group input[type="text"]');
    inputEs.forEach((input) => {
        input.value = '';
        input.nextElementSibling.style.fontSize = '16px';
        input.nextElementSibling.style.top = '50%';
    });
}
