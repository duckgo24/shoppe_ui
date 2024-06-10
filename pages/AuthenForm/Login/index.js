var baseUrl = 'http://localhost:9999';

const username = document.getElementById('username');
const password = document.getElementById('password');
const btnSubmit = document.querySelector('.btn-submit-login');
const lbUsername = document.querySelector('.lb-username');
const lbPassword = document.querySelector('.lb-password');
const messageUsername = document.querySelector('.message-error-username');
const messagePassword = document.querySelector('.message-error-password');

window.addEventListener('DOMContentLoaded', () => {
    function NotifyRegister() {
        let isRegisterSuccess = !!localStorage.getItem('isRegisterSuccess');
        console.log(typeof isRegisterSuccess);
        if (isRegisterSuccess) {
            Toast('success', 'Thành công', 'Đăng ký thành công', 3000);
            setTimeout(() => {
                localStorage.removeItem('isRegisterSuccess');
            }, 3000);
        }
        
    }
    NotifyRegister();
});

username.addEventListener('input', () => {
    toggleSubmitButton(username, password, btnSubmit);
    ToggleLable(username.value, lbUsername);
    if (!CheckEmail(username.value)) {
        messageUsername.textContent = 'Vui lòng nhập email';
        username.style.borderColor = 'red';
    }
});

password.addEventListener('input', () => {
    toggleSubmitButton(username, password, btnSubmit);
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

        if (data?.message === 'Not Found') {
            Toast('error', 'Thất bại', 'Tài khoản hoặc mật khẩu không chính xác', 3000);
            username.value = '';
            password.value = '';
            return;
        }


        if (data) {
            if(data.data.isBan) {
                Toast('error', 'Thất bại', 'Tài khoản của bạn đã bị khóa :>', 3000);
                username.value = '';
                password.value = '';
                return;
            } else {
                localStorage.setItem('account', JSON.stringify(data.data));
                window.location.href = '/index.html';
            
            }
        }
    } catch (err) {
        console.log('Error:', err.message);
    }
});
