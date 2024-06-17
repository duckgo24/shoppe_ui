var baseUrl = 'http://localhost:9999';

var username = document.getElementById('username');
var password = document.getElementById('password');
var passwordConfirm = document.getElementById('password-confirm');
var btnSubmit = document.querySelector('.btn-submit-resgiter');
var lbUsername = document.querySelector('.lb-username');
var lbPassword = document.querySelector('.lb-password');
var lbPasswordConfirm = document.querySelector('.lb-password-confirm');
var messageUsername = document.querySelector('.message-error-username');
var messagePassword = document.querySelector('.message-error-password');
var messagePasswordConfirm = document.querySelector('.message-error-password-confirm');
var isValidUsername = false;
var isValidPassword = false;
var isValidPasswordConfirm = false;

username.addEventListener('input', (e) => {
    toggleSubmitButton(username, password, btnSubmit);
    ToggleLable(username.value, lbUsername);

    if (!CheckEmail(username.value)) {
        messageUsername.textContent = 'Email không hợp lệ';
        username.style.borderColor = 'red';
        isValidUsername = false;
    } else {
        messageUsername.textContent = '';
        username.style.borderColor = 'var(--color-black)';
        isValidUsername = true;
    }
});

password.addEventListener('input', (e) => {
    toggleSubmitButton(username, password, btnSubmit);
    ToggleLable(password.value, lbPassword);

    if(password.value.length < 6) {
        messagePassword.textContent = 'Mật khẩu phải lớn hơn 6 kí tự';
        password.style.borderColor = 'red';
        isValidPassword = false;
    } else {
        messagePassword.textContent = '';
        password.style.borderColor = 'var(--color-black)';
        isValidPassword = true;
    }
});

passwordConfirm.addEventListener('input', () => {
    toggleSubmitButton();
    ToggleLable(passwordConfirm.value, lbPasswordConfirm);

    if(passwordConfirm.value.length < 6) {
        messagePasswordConfirm.textContent = 'Mật khẩu phải lớn hơn 6 kí tự';
        passwordConfirm.style.borderColor = 'red';
        isValidPasswordConfirm = false;
    } else  if(passwordConfirm.value !== password.value) {
        messagePasswordConfirm.textContent = 'Mật khẩu xác nhận không khớp';
        passwordConfirm.style.borderColor = 'red';
        isValidPasswordConfirm = false;
    } 
    else {
        messagePasswordConfirm.textContent = '';
        passwordConfirm.style.borderColor = 'var(--color-black)';
        isValidPasswordConfirm = true;
    }
});

btnSubmit.addEventListener('click', async () => {
    
    if(!isValidUsername || !isValidPassword || !isValidPasswordConfirm) {
        Toast('error', 'Thông báo', 'Thông tin các trường không hợp lệ !', 3000);
        return;
    }
    
    const url = new URL(`${baseUrl}/accounts/create`);
    const resAccount = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    
    if (resAccount.status === 200) {
        const _data = await resAccount.json();
        const _idAcc = _data.data.id;
        const email = _data.data.username;
        const formData = {
            nickName: `user_${Math.floor(Math.random() * 1000000)}`,
            name: '',
            gender: '',
            email,
            phone: '',
            birth: '',
            deliverAddress: '',
            account: _idAcc,
        };


        await fetch(`${baseUrl}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        localStorage.setItem('isRegisterSuccess', true);
        window.location.href = '../Login/login.html';
    }
});
