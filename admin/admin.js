var mainContent = document.querySelector('.main-content');

const btnHome = document.getElementById('btn-home');
btnHome?.addEventListener('click', () => {
    window.location.href = '/trangchu.html';
});

const btnMnCategory = document.getElementById('btn-mn-category');
btnMnCategory?.addEventListener('click', () => {
    mainContent.innerHTML = `
        <div class="item__container">
                        <div class="item__container-header">
                            <i class="fa-solid fa-window-restore"></i>
                            <span class="item-name">Danh mục</span>
                        </div>
                        <div class="item__container-main">
                            <div class="header">
                                <div class="title">Danh sách danh mục</div>
                                <button id="btn-show-modal-add-category" class="btn-add">
                                    <i class="fa-solid fa-plus"></i>
                                    <span>Thêm danh mục</span>
                                </button>
                            </div>
                            <div class="main">
                                <div class="search">
                                    <form>
                                        <input type="text" class="category-name" />
                                        <lable class="lb-category lb">Tìm kiếm danh mục</lable>
                                    </form>
                              
                                    <select class="option">
                                        <option value="0">Mã danh mục</option>
                                        <option value="1">Tên danh mục</option>
                                    </select>
                                 
                                    <button class="btn-search">
                                        <i class="fa-solid fa-search"></i>
                                        <span>Tìm kiếm</span>
                                    </button>
                                </div>
                                <table class="list-category">
                                    <thead>
                                        <th>Mã danh mục</th>
                                        <th>Tên danh mục</th>
                                        <th>Mô tả</th>
                                        <th colspan="2">Thao tác</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal">
                            <div class="modal__header">
                                <div>
                                    <i class="fa-solid fa-window-restore"></i>
                                    <span class="modal__header-title"></span>
                                </div>
                                <button id="btn-close-category" class="btn-close">
                                    <i class="fa-solid fa-times"></i>
                                </button>
                            </div>
                            <div class="modal__main">
                                <form>            
                                    <span id="id_category" class= "modal-hide-id"></span>
                                    <div class="form-group">
                                        <input type="text" />
                                        <lable class="lb-category-name lb">Tên danh mục</lable>
                                    </div>
                                    <div class="form-group">
                                        <textarea cols="30" rows="10"></textarea>
                                        <lable class="lb-category-desc lb">Mô tả</lable>
                                    </div>
                                </form>
                            </div>
                            <div class="modal__footer">
                                <button id="btn-save-category" class="btn-save btn-control-modal">
                                    <i class="fa-solid fa-save"></i>
                                    <span>Lưu</span>
                                </button>
                                <button id="btn-update-category" class="btn-update btn-control-modal">
                                    <i class="fa-solid fa-edit"></i>
                                    <span>Cập nhật</span>
                                </button>
                                <button id="btn-delete-category" class="btn-delete btn-control-modal">
                                    <i class="fa-solid fa-trash"></i>
                                    <span>Xóa</span>
                                </button>
                            </div>
                        </div>
                        <div class="overlay"></div>
                    </div>
    `;


    const script = document.createElement('script');
    script.src = './Category/category.js';
    mainContent.appendChild(script);
});

const btnMnProduct = document.getElementById('btn-mn-product');
btnMnProduct?.addEventListener('click', () => {
    mainContent.innerHTML = `
        <div class="item__container">
                        <div class="item__container-header">
                            <i class="fa-solid fa-window-restore"></i>
                            <span class="item-name">Sản phẩm</span>
                        </div>
                        <div class="item__container-main">
                            <div class="header">
                                <div class="title">Danh sách sản phẩm</div>
                                <button id="btn-show-modal-add-product" class="btn-add">
                                    <i class="fa-solid fa-plus"></i>
                                    <span>Thêm sản phẩm</span>
                                </button>
                            </div>
                            <div class="main">
                                <div class="search">
                                    <form>
                                        <input type="text" class="input-find-product" />
                                        <lable class="lb-product lb">Tìm kiếm sản phẩm</lable>
                                    </form>
                                    <select class="option">
                                        <option value="0">Mã sản phẩm</option>
                                        <option value="1">Tên sản phẩm</option>
                                        <option value="2">Giá bán</option>
                                        <option value="3">Số lượng</option>
                                        <option value="4">Kích cỡ</option>
                                        <option value="5">Màu sắc</option>
                                    </select>
                                    <select class="compare">
                                        <option value="gt">
                                            >
                                        </option>
                                        <option value="lt">
                                            <
                                        </option>
                                        <option value="eq">
                                            =
                                        </option>
                                    </select>
                                    <button class="btn-search btn-find-product">
                                        <i class="fa-solid fa-search"></i>
                                        <span>Tìm kiếm</span>
                                    </button>
                                </div>
                                
                                <table class="list-product">
                                    <thead>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá bán</th>
                                        <th>Số lượng</th>
                                        <th>Đơn vị</th>
                                        <th>Ảnh</th>
                                        <th>Kích cỡ</th>
                                        <th>Màu sắc</th>
                                        <th>Mã danh mục</th>
                                        <th colspan="2">Thao tác</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal">
                            <div class="modal__header">
                                <div>
                                    <i class="fa-solid fa-window-restore"></i>
                                    <span class="modal__header-title"></span>
                                </div>
                                <button id="btn-close-product" class="btn-close">
                                    <i class="fa-solid fa-times"></i>
                                </button>
                            </div>
                            <div class="modal__main">
                                <form class="form-info-product">
                                    <span id="id_product" class="modal-hide-id"></span>
                                    <div class="form-group">
                                        <input type="text" class="input-name" />
                                        <lable class="lb-product-name lb">Tên sản phẩm</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-price"/>
                                        <lable class="lb">Giá bán</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-quantity"/>
                                        <lable class="lb">Số lượng</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-unit"/>
                                        <lable class="lb">Đơn vị</lable>
                                    </div>
                                    
                                    <div class="form-group">
                                        <input type="text" class="input-color"/>
                                        <lable class="lb">Màu sắc</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-size"/>
                                        <lable class="lb">Kích cỡ</lable>
                                    </div>
                                    <div class="form-group select-category">
                                        <span>Danh mục:</span>
                                        <select></select>
                                    </div>
                                </form>
                                <div class="form-image">
                                    <img src="" alt="image" class="image-preview" />
                                    <input type="file" class="image-upload" />
                                </div>
                            </div>
                            <div class="modal__footer">
                                <button id="btn-save-product" class="btn-save btn-control-modal">
                                    <i class="fa-solid fa-save"></i>
                                    <span>Lưu</span>
                                </button>
                                <button id="btn-update-product" class="btn-update btn-control-modal">
                                    <i class="fa-solid fa-edit"></i>
                                    <span>Cập nhật</span>
                                </button>
                                <button id="btn-delete-product" class="btn-delete btn-control-modal">
                                    <i class="fa-solid fa-trash"></i>
                                    <span>Xóa</span>
                                </button>
                            </div>
                        </div>
                        <div class="overlay"></div>
                    </div>
    `;

    const script = document.createElement('script');
    script.src = './Product/product.js';
    script.async = false;
    mainContent.appendChild(script);
});

const btnMnAccount = document.getElementById('btn-mn-account');
btnMnAccount.addEventListener('click', () => {
    mainContent.innerHTML = `
        <div class="item__container">
            <div class="item__container-header">
                <i class="fa-solid fa-window-restore"></i>
                <span class="item-name">Tài khoản</span>
            </div>
            <div class="item__container-main">
                <div class="header">
                    <div class="title">Danh sách tài khoản</div>
                    <button id="btn-show-modal-add-account" class="btn-add">
                        <i class="fa-solid fa-plus"></i>
                        <span>Thêm tài khoản</span>
                    </button>
                </div>
                <div class="main">
                    <div class="search">
                        <form>
                            <input type="text" class="account-name" />
                            <lable class="lb-account lb">Tìm kiếm tài khoản</lable>
                        </form>
                        <button class="btn-search">
                            <i class="fa-solid fa-search"></i>
                            <span>Tìm kiếm</span>
                        </button>
                    </div>
                    <table class="list-account">
                        <thead>
                            <th>Mã tài khoản</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Quyền</th>
                            <th>Ban</th>
                            <th colspan="2">Thao tác</th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal">
                <div class="modal__header">
                    <div>
                        <i class="fa-solid fa-window-restore"></i>
                        <span class="modal__header-title"></span>
                    </div>
                    <button id="btn-close-account" class="btn-close">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <div class="modal__main">
                    <form>            
                        <span id="id_account" class= "modal-hide-id"></span>
                        <div class="form-group">
                            <input type="text" />
                            <lable class="lb-account-name lb">Tên tài khoản</lable>
                        </div>
                        <div class="form-group">
                            <input type="password" />
                            <lable class="lb-account lb">Mật khẩu</lable>
                        </div>
                        <div class="form-group">
                            <input type="text" />
                            <lable class="lb-account lb">Quyền</lable>
                        </div>
                    </form>
                </div>
                <div class="modal__footer">
                    <button id="btn-save-account" class="btn-save btn-control-modal">
                        <i class="fa-solid fa-save"></i>
                        <span>Lưu</span>
                    </button>
                    <button id="btn-update-account" class="btn-update btn-control-modal">
                        <i class="fa-solid fa-edit"></i>
                        <span>Cập nhật</span>
                    </button>
                    <button id="btn-delete-account" class="btn-delete btn-control-modal">
                        <i class="fa-solid fa-trash"></i>
                        <span>Xóa</span>
                    </button>
                </div>
            </div>
            <div class="overlay"></div>
        </div>
    `;

    const script = document.createElement('script');
    script.src = './Account/account.js';
    script.async = false;
    mainContent.appendChild(script);
});


var btnMnUser = document.getElementById('btn-mn-user');
btnMnUser.addEventListener('click', () => {
    mainContent.innerHTML = `
            <div class="item__container">
                        <div class="item__container-header">
                            <i class="fa-solid fa-face-grin-squint-tears"></i>
                            <span class="item-name">Người dùng</span>
                        </div>
                        <div class="item__container-main">
                            <div class="header">
                                <div class="title">Danh sách người dùng</div>
                            </div>
                            <div class="main">
                                <div class="search">
                                    <form>
                                        <input type="text" class="input-find-user" />
                                        <lable class="lb-user lb">Tìm kiếm người dùng</lable>
                                    </form>
                                    <select class="option">
                                        <option value="0">Mã người dùng</option>
                                        <option value="1">Tên người dùng</option>
                                        <option value="2">Giới tính</option>
                                        <option value="3">Số điện thoại</option>
                                        <option value="4">Mã tài khoản</option>
                                    </select>
                                    <button class="btn-search btn-find-user">
                                        <i class="fa-solid fa-search"></i>
                                        <span>Tìm kiếm</span>
                                    </button>
                                </div>
                                
                                <table class="list-user">
                                    <thead>
                                        <th>Mã người dùng</th>
                                        <th>Tên người dùng</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Nickname</th>
                                        <th>Avatar</th>
                                        <th>Mã tài khoản</th>
                                        <th colspan="2">Thao tác</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal">
                            <div class="modal__header">
                                <div>
                                    <i class="fa-solid fa-window-restore"></i>
                                    <span class="modal__header-title"></span>
                                </div>
                                <button id="btn-close-user" class="btn-close">
                                    <i class="fa-solid fa-times"></i>
                                </button>
                            </div>
                            <div class="modal__main">
                                <form class="form-info-user">
                                    <span id="id_user" class="modal-hide-id"></span>
                                    <div class="form-group">
                                        <input type="text" class="input-name" />
                                        <lable class="lb-user-name lb">Tên người dùng</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="date" class="input-birth"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-gender"/>
                                        <lable class="lb">Giới tính</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-phone"/>
                                        <lable class="lb">Số điện thoại</lable>
                                    </div>
                                    
                                    <div class="form-group">
                                        <input type="text" class="input-email"/>
                                        <lable class="lb">Email</lable>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="input-nickname"/>
                                        <lable class="lb">Nickname</lable>
                                    </div>
                                </form>
                            </div>
                            <div class="modal__footer">
                                <button id="btn-save-user" class="btn-save btn-control-modal">
                                    <i class="fa-solid fa-save"></i>
                                    <span>Lưu</span>
                                </button>
                                <button id="btn-update-user" class="btn-update btn-control-modal">
                                    <i class="fa-solid fa-edit"></i>
                                    <span>Cập nhật</span>
                                </button>
                                <button id="btn-delete-user" class="btn-delete btn-control-modal">
                                    <i class="fa-solid fa-trash"></i>
                                    <span>Xóa</span>
                                </button>
                            </div>
                        </div>
                        <div class="overlay"></div>
                    </div>
        `;
        const script = document.createElement('script');
        script.src = './User/user.js';
        script.async = false;
        mainContent.appendChild(script);

});


var listBtn = document.querySelectorAll('.container-left__main button');
listBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        listBtn.forEach((btn) => {
            btn.classList.remove('btn-active');
        });

        btn.classList.add('btn-active');
    });
});
