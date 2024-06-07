const baseUrl = 'http://localhost:9999';

var nickName = document.querySelector('.nickname');
var _name = document.querySelector('.name');
var email = document.querySelector('.email');
var phone = document.querySelector('.phone');
var birth = document.querySelector('.birth');
var _gender = null;

const btnSubmit = document.querySelector('.btn-submit-profile');
btnSubmit.addEventListener('click', async() => {

    var genders = document.querySelectorAll('.gender');
    var lbGenders = document.querySelectorAll('.lb-gender');
    genders.forEach((gender,index) => {
        if(gender.checked) {
            _gender = lbGenders[index].textContent;  
        }
    })
    Toast('success', 'Thông báo', 'Cập nhật thành công', 3000);

   
    

    
    const accountInfo = localStorage.getItem('user');
    const accId = JSON.parse(accountInfo)._id;
    const formData = {
        nickName: nickName.textContent,
        name: _name.value,
        gender: _gender,
        email: email.value,
        phone: phone.value,
        birth: birth.value,
        account: accId
    };

    console.table(formData);


    const res = await fetch(`${baseUrl}/users/edit/${accId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

});