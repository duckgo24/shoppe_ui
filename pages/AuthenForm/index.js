//my function
function ToggleLable(value, lb) {
    if (value.length > 0) {
        lb.style.display = 'none';
    } else {
        lb.style.display = 'block';
    }
}

function CheckEmail(str) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(str);
    return result;
}

function CheckPhone() {
    const regex = /^(03|09)\d{8}$/;
    const result = regex.test(str);
    return result;
}

function RemoveNotify(lb) {
    lb.textContent = '';
}


function toggleSubmitButton(username,password, btnSubmit) {
    if (username?.value.length > 0 && password?.value.length > 0) {
        btnSubmit?.classList.remove('disable');
    } else {
        btnSubmit?.classList.add('disable');
    }
}
