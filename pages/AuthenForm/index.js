//my function
function ToggleLable(value, lb) {
    if (value.length > 0) {
        lb.style.display = 'none';
    } else {
        lb.style.display = 'block';
    }
}

function CheckEmail(str) {
    const regex = /^[a-zA-Z0-9.]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
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
