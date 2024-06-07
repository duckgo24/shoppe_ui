var baseUrl = 'http://localhost:9999';

const username = document.getElementById('username');
const password = document.getElementById('password');
const btnSubmit = document.querySelector('.btn-submit-login');
const lbUsername = document.querySelector('.lb-username');
const lbPassword = document.querySelector('.lb-password');
const messageUsername = document.querySelector('.message-error-username');
const messagePassword = document.querySelector('.message-error-password');

let isRegisterSuccess = localStorage.getItem('isRegisterSuccess');
if (isRegisterSuccess === true) {
    Toast('success', 'Thành công', 'Đăng ký thành công', 3000);
    setTimeout(() => {
        isRegisterSuccess = false;
    }, 3000);
}

function toggleSubmitButton() {
    if (username.value.length > 0 && password.value.length > 0) {
        btnSubmit.classList.remove('disable');
    } else {
        btnSubmit.classList.add('disable');
    }
}

username.addEventListener('input', () => {
    toggleSubmitButton();
    ToggleLable(username.value, lbUsername);
    if (!CheckEmail(username.value)) {
        messageUsername.textContent = 'Vui lòng nhập email';
        username.style.borderColor = 'red';
    }
});

password.addEventListener('input', () => {
    toggleSubmitButton();
    ToggleLable(password.value, lbPassword);
});

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();

    // if(!CheckEmail(username.value)){
    //     messageUsername.textContent = 'Vui lòng nhập email';
    //     return;
    // }

    // if(!CheckPhone(username.value)){   
    //     messageUsername.textContent = 'Vui lòng nhập số điện thoại';
    //     return;
    // }


    const url = new URL(`${baseUrl}/accounts/search`);
    url.searchParams.append('username', username.value);
    url.searchParams.append('password', password.value);

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res?.json();
        if(data?.message === "Not Found"){
            Toast('error', 'Thất bại', 'Tài khoản hoặc mật khẩu không chính xác', 3000);
            return;
        }

        if (data) {
            localStorage.setItem('user', JSON.stringify(data.data));
            window.location.href = '/index.html';
        }
    } catch (err) {
        console.log('Error:', err.message);
    }
});


