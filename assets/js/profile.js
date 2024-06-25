const baseUrl = 'http://localhost:9999';

var nickName = document.querySelector('.nickname');
var _name = document.querySelector('.name');
var avatar = document.getElementById('image-user');
var email = document.querySelector('.email');
var phone = document.querySelector('.phone');
var birth = document.querySelector('.birth');
var _gender = null;
var inputImage = document.getElementById('input-image-user');


const btnUpdateProfile = document.querySelector('.profile-btn-update');
const btnSubmit = document.querySelector('.btn-submit-profile');

btnUpdateProfile.addEventListener('click', () => {
    btnSubmit.removeAttribute('disabled');
    inputImage.removeAttribute('disabled');

    let inputFields = document.querySelectorAll('.form-group input');
    inputFields.forEach((inputField) => {
        inputField.removeAttribute('disabled');
    });
});


btnSubmit.addEventListener('click', async () => {
    btnSubmit.setAttribute('disabled', 'disabled');
    inputImage.setAttribute('disabled', 'disabled');

    var genders = document.querySelectorAll('.gender');
    var lbGenders = document.querySelectorAll('.lb-gender');
    genders.forEach((gender, index) => {
        if (gender.checked) {
            _gender = lbGenders[index].textContent;
        }
    });

    if (!_gender) {
        Toast('error', 'Thông báo', 'Vui lòng chọn giới tính', 3000);
        return;
    }

    const regexPhone = /^(03|09)\d{8}$/;

    if (!regexPhone.test(phone.value)) {
        Toast('error', 'Thông báo', 'Số điện thoại không hợp lệ', 3000);
        return;
    }

    const accountInfo = localStorage.getItem('account');
    const accId = JSON.parse(accountInfo)._id;
    const formData = {
        nickName: nickName.value,
        name: _name.value,
        avatar: avatar.src,
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
    const defaultAvatar = 'https://i.ibb.co/nfBvKrd/3de359480d02.png';
    const fullName = document.querySelector('.fullname');
    const avatarMain = document.querySelector('.left-avatar img');
    const accountInfo = localStorage.getItem('account');

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
                avatar.src = data.avatar ? data.avatar : '';
                fullName.textContent = data.name ? data.name : data.nickName;
                avatarMain.src = data.avatar ? data.avatar : defaultAvatar;
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

inputImage.addEventListener('change', async (e) => {
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

            if (data) {
                avatar.src = data?.data?.url;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    reader.readAsDataURL(e.target.files[0]);
});
