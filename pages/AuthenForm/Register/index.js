var baseUrl = 'http://localhost:9999';

const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const btnSubmit = document.querySelector('.btn-submit-resgiter');
const lbUsername = document.querySelector('.lb-username');
const lbPassword = document.querySelector('.lb-password');
const lbPasswordConfirm = document.querySelector('.lb-password-confirm');
const messageUsername = document.querySelector('.message-error-username');
const messagePassword = document.querySelector('.message-error-password');
const messagePasswordConfirm = document.querySelector('.message-error-password-confirm');

username.addEventListener('input', () => {
    toggleSubmitButton(username, password, btnSubmit);
    ToggleLable(username.value, lbUsername);

    if (!CheckEmail(username.value)) {
        messageUsername.textContent = 'Email không hợp lệ';
        username.style.borderColor = 'red';
    } else if (!CheckPhone(username.value)) {
        messageUsername.textContent = 'Số điện thoại không hợp lệ';
        username.style.borderColor = 'red';
    }
});

password.addEventListener('input', () => {
    toggleSubmitButton(username, password, btnSubmit);
    ToggleLable(password.value, lbPassword);
});

passwordConfirm.addEventListener('input', () => {
    toggleSubmitButton();
    ToggleLable(passwordConfirm.value, lbPasswordConfirm);
});

btnSubmit.addEventListener('click', async () => {
    // if (password.value !== passwordConfirm.value) {
    //     messagePasswordConfirm.textContent = 'Mật khẩu không khớp';
    //     passwordConfirm.style.borderColor = 'red';
    //     return;
    // }

    // if (!CheckEmail(username.value)) {
    //     messageUsername.textContent = 'Email không hợp lệ';
    //     username.style.borderColor = 'red';
    //     return;
    // }

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
