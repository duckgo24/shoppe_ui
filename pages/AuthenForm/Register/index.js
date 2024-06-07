var baseUrl = 'http://localhost:9999';

function Register() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const btnSubmit = document.querySelector('.btn-submit-resgiter');
    const lbUsername = document.querySelector('.lb-username');
    const lbPassword = document.querySelector('.lb-password')
    const lbPasswordConfirm = document.querySelector('.lb-password-confirm');
    const messageUsername = document.querySelector('.message-error-username');
    const messagePassword = document.querySelector('.message-error-password');
    const messagePasswordConfirm = document.querySelector('.message-error-password-confirm');

    function toggleSubmitButton() {
        if(username.value.length > 0 && password.value.length > 0 && passwordConfirm.value.length > 0) {
            btnSubmit.classList.remove('disable');
        } else {
            btnSubmit.classList.add('disable');
        }
    }

    username.addEventListener('input', () => {
        toggleSubmitButton();
        ToggleLable(username.value, lbUsername);

        if(!CheckEmail(username.value)) {
            messageUsername.textContent = "Email không hợp lệ";
            username.style.borderColor = "red"
        } 
        else if(!CheckPhone(username.value)) {
            messageUsername.textContent = "Số điện thoại không hợp lệ";
            username.style.borderColor = "red"
        }      
    });


    password.addEventListener('input', () => {
        toggleSubmitButton();
        ToggleLable(password.value, lbPassword)
    });

    passwordConfirm.addEventListener('input', () => {
        toggleSubmitButton();
        ToggleLable(passwordConfirm.value, lbPasswordConfirm)
    })


    btnSubmit.addEventListener('click' , async() => {
        if(password.value !== passwordConfirm.value) {
            messagePasswordConfirm.textContent = "Mật khẩu không khớp";
            passwordConfirm.style.borderColor = "red";
            return;
        }

        if(!CheckEmail(username.value)) {
            messageUsername.textContent = "Email không hợp lệ";
            username.style.borderColor = "red";
            return;
        }


        const url = new URL(`${baseUrl}/accounts/create`);
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            }),
        })

        if(res.status === 200) {
            isRegisterSuccess = true;
            window.location.href = '../Login/login.html';
          
        }   
    })
}


Register();