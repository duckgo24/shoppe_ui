const baseUrl = 'http://localhost:9999';

var nickName = document.querySelector('.nickname');
var _name = document.querySelector('.name');
var email = document.querySelector('.email');
var phone = document.querySelector('.phone');
var birth = document.querySelector('.birth');
var _gender = null;

const btnUpdateProfile = document.querySelector('.profile-btn-update');
btnUpdateProfile.addEventListener('click', () => {
    let inputFields = document.querySelectorAll('.form-group input');
    inputFields.forEach((inputField) => {
        inputField.removeAttribute('disabled');
    });
});

const btnSubmit = document.querySelector('.btn-submit-profile');
btnSubmit.addEventListener('click', async () => {
    const regexPhone = /^(03|09)\d{8}$/;

    if (!regexPhone.test(phone.value)) {
        Toast('error', 'Thông báo', 'Số điện thoại không hợp lệ', 3000);
        return;
    }

    var genders = document.querySelectorAll('.gender');
    var lbGenders = document.querySelectorAll('.lb-gender');
    genders.forEach((gender, index) => {
        if (gender.checked) {
            _gender = lbGenders[index].textContent;
        }
    });

    const accountInfo = localStorage.getItem('account');
    const accId = JSON.parse(accountInfo)._id;
    const formData = {
        nickName: nickName.value,
        name: _name.value,
        gender: _gender,
        email: email.value,
        phone: phone.value,
        birth: birth.value,
        account: accId,
    };

    const res = await fetch(`${baseUrl}/users/edit/${accId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.status === 200) {
        LoadProfile();
        Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);
        let inputFields = document.querySelectorAll('.form-group input');
        inputFields.forEach((inputField) => {
            inputField.setAttribute('disabled', 'disabled');
        });
    }
});

async function LoadProfile() {
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
            .then((res) => res.json())
            .then((data) => {
                nickName.value = data.nickName ? data.nickName : '';
                _name.value = data.name ? data.name : '';
                fullName.textContent = data.name ? data.name : '';
                email.value = data.email ? data.email : '';
                _gender = data.gender;
                phone.value = data.phone ? data.phone : '';
                birth.value = data.birth ? new Date(data.birth).toISOString().split('T')[0] : '';
            });
    }

    if (_gender) {
        var genders = document.querySelectorAll('.gender');
        var lbGenders = document.querySelectorAll('.lb-gender');
        lbGenders.forEach((lbGender, index) => {
            if (lbGender.textContent === _gender) {
                genders[index].checked = true;
            }
        });
    }
}

LoadProfile();
