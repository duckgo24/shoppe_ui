var baseUrl = 'http://localhost:9999';

const username = document.getElementById('username');
const password = document.getElementById('password');
const btnSubmit = document.querySelector('.btn-submit-login');
const lbUsername = document.querySelector('.lb-username');
const lbPassword = document.querySelector('.lb-password');
const messageUsername = document.querySelector('.message-error-username');
const messagePassword = document.querySelector('.message-error-password');
var isValidUsername = false;
var isValidPassword = false;


window.addEventListener('DOMContentLoaded', () => {
    function NotifyRegister() {
        let isRegisterSuccess = !!localStorage.getItem('isRegisterSuccess');
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
        isValidUsername = false;
    } else {
        messageUsername.textContent = '';
        username.style.borderColor = 'var(--color-black)';
        isValidUsername = true;
    }
});

password.addEventListener('input', () => {
    toggleSubmitButton(username, password, btnSubmit);
    ToggleLable(password.value, lbPassword);

    if (password.value.length < 6) {
        messagePassword.textContent = 'Mật khẩu phải lớn hơn 6 kí tự';
        password.style.borderColor = 'red';
        isValidPassword = false;
    } else {
        messagePassword.textContent = '';
        password.style.borderColor = 'var(--color-black)';
        isValidPassword = true;
    }
});

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();

    if(!isValidUsername || !isValidPassword) {
        Toast('error', 'Thất bại', 'Vui lòng kiểm tra lại thông tin', 3000);
        return;
    }

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
            password.value = '';
            return;
        }


        if (data) {
            if(data?.data?.isBan) {
                Toast('error', 'Thất bại', 'Tài khoản của bạn đã bị khóa :>', 3000);
                username.value = '';
                password.value = '';
                return;
            } else {
                console.log('Oke');
                localStorage.setItem('account', JSON.stringify(data.data));
                window.location.href = '/trangchu.html';
            }
        }
    } catch (err) {
        console.log('Error:', err.message);
    }
});
