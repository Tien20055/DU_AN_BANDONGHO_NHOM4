function renderProduct(products) {
    // Kiểm tra nếu danh sách sản phẩm rỗng hoặc không tồn tại
    if (!products || products.length === 0) {
        document.getElementById("khungsp").innerHTML = "<p>Không có sản phẩm nào để hiển thị.</p>";
        console.log(products);
        return;
    }
    let testHtml = ``;
    products.forEach(sp => {
     testHtml += `
     <div class="sp">
         <img class="product-image" src="${sp.img}" alt="${sp.title}">
         <span class="text">VIP</span>
         <p class="mt">${sp.title}</p>
         <p class="gia" style="color: red; font-weight: bold;">${sp.price} VND</p>
         <input class="input-qty" id="soluong" min="1" max="100" type="number" value="1">
         <p class="xs">${sp.address}</p>
         <div class="dh">
             <button class="add-cart" data-product="${sp.id}" onclick = "addProduct(${sp.id})">Thêm vào giỏ hàng</button>
             <button class="order-btn" data-title="${sp.title}" data-price="${sp.price}">Đặt hàng</button>
         </div>
     </div>
     `
 });
 // Gắn HTML vào phần tử có id="khungsp"
 let khungspElement = document.getElementById("khungsp");
 if (khungspElement) {
     khungspElement.innerHTML = testHtml;

     // Thêm sự kiện click cho nút "Đặt hàng"
     document.querySelectorAll('.order-btn').forEach(button => {
         button.addEventListener('click', function () {
             const productElement = this.closest('.sp'); // Lấy phần tử cha chứa sản phẩm
             const title = this.getAttribute('data-title');
             const price = this.getAttribute('data-price');
             const quantity = productElement.querySelector('.input-qty').value;

             placeOrder(title, parseInt(price), parseInt(quantity));
         });
     });
 } else {
     console.error('Phần tử với id="khungsp" không tồn tại.');
 }
}
renderProduct(products);
  function placeOrder(title, price, quantity) {
    // Hiển thị thông báo xác nhận trước khi đặt hàng
    const confirmOrder = confirm(
        `Xác nhận đặt hàng:\n\n- Sản phẩm: ${title}\n- Giá mỗi sản phẩm: ${price}₫\n- Số lượng: ${quantity}\n- Tổng cộng: ${price * quantity}₫\n\nBạn có chắc chắn muốn đặt hàng không?`
    );

    if (confirmOrder) {
        // Lấy thông tin người dùng hiện tại từ localStorage
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));
        if (!currentuser) {
            alert("Vui lòng đăng nhập để thực hiện đặt hàng.");
            return;
        }

        // Thêm đơn hàng mới vào danh sách
        const newOrder = {
            id: Date.now(), // Tạo ID duy nhất cho đơn hàng
            title: title,
            price: price,
            quantity: quantity,
            total: price * quantity,
            date: new Date().toLocaleString(),
        };

        currentuser.orders.push(newOrder);

        // Lưu lại thông tin người dùng vào localStorage
        localStorage.setItem('currentuser', JSON.stringify(currentuser));

        // Hiển thị thông báo đặt hàng thành công
        alert(
            ` Đặt hàng thành công!\n\nThông tin đơn hàng:\n- Sản phẩm: ${title}\n- Số lượng: ${quantity}\n- Tổng tiền: ${price * quantity}₫\n\nCảm ơn bạn đã mua sắm!`
        );

        // Cập nhật giỏ hàng (nếu cần)
       
    } else {
        alert("Bạn đã hủy đặt hàng.");
    }
}


// function addoder(index) {
//     let products = JSON.parse(localStorage.getItem('products'));
//     let selectedProduct = products[index];
//     if (selectedProduct) {
//         alert(Bạn đã đặt hàng sản phẩm: ${selectedProduct.title}\nGiá: ${selectedProduct.price});
//         // Thực hiện thêm logic đặt hàng ở đây (ví dụ gửi dữ liệu lên server hoặc lưu trữ vào localStorage)
//     }
// }




function showCart() {
    let currentuser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    if (currentuser && currentuser.cart && currentuser.cart.length > 0) {
        document.querySelector('.cart-empty').style.display = 'none';
        let productCartHtml = '';

        currentuser.cart.forEach(item => {
            productCartHtml += `
            <li class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <img class="img-cart" src="${item.image}" alt="">
                    <p class="cart-item-title">${item.title}</p>
                    <span class="cart-item-price price">${item.price}₫</span>
                </div>
                <div class="cart-item-control">
                    <button class="cart-item-delete" onclick="deleteCartItem(${item.id})">Xóa</button>
                    <div class="buttons_added">
                        <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this, ${item.id})">
                        <input class="input-qty" max="100" min="1" type="number" value="${item.soluong}" onchange="updateQuantity(this, ${item.id})">
                        <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this, ${item.id})">
                    </div>
                </div>
            </li>`
            
        });

        document.querySelector('.cart-list').innerHTML = productCartHtml;
    } else {
        document.querySelector('.cart-empty').style.display = 'block';
        document.querySelector('.cart-list').innerHTML = `<p>Giỏ hàng của bạn đang trống.</p>`;
    }
}


function deleteCartItem(itemId) {
    // Lấy thông tin người dùng hiện tại từ localStorage
    let currentuser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;

    if (currentuser && currentuser.cart) {
        // Lọc giỏ hàng để loại bỏ sản phẩm có id trùng với itemId
        currentuser.cart = currentuser.cart.filter(item => item.id !== itemId);

        // Cập nhật giỏ hàng trong localStorage
        localStorage.setItem('currentuser', JSON.stringify(currentuser));

        // Hiển thị lại giỏ hàng
        showCart();

        // Thông báo xoá thành công
        alert('Sản phẩm đã được xoá khỏi giỏ hàng.');
    } else {
        alert('Không tìm thấy giỏ hàng hoặc người dùng hiện tại.');
    }
}

// Gọi hàm hiển thị giỏ hàng
function openCart() {
    let Cart = document.getElementById("showcart");
    let modal = document.getElementsByClassName("modal")[0]; // Lấy phần tử đầu tiên trong danh sách
    body = document.body
    // Kiểm tra xem Cart và modal có tồn tại không
    if (Cart && modal) {
        if (Cart.style.display === 'none' || modal.style.display === 'none') {
            Cart.style.display = 'block';
            modal.style.display = 'block';
            body.style.overflow = 'hidden';
        } else {
            Cart.style.display = 'none';
            modal.style.display = 'none';
            body.style.overflow = "auto";
        }
    }

    console.log(Cart);
}
function closeModal() {
    let Cart = document.getElementById("showcart");
    let modal = document.getElementsByClassName("modal")[0]; // Lấy phần tử đầu tiên trong danh sách

    // Kiểm tra xem Cart và modal có tồn tại không
    if (Cart && modal) {
        if (Cart.style.display === 'none' || modal.style.display === 'none') {
            Cart.style.display = 'block';
            modal.style.display = 'block';
            body.style.overflow = 'hidden';
        } else {
            Cart.style.display = 'none';
            modal.style.display = 'none';
            body.style.overflow = "auto";
        }
    }

}


function addcart(productId) {
    // Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem('products'));

    // Tìm sản phẩm theo ID
    const selectedProduct = products.find(product => product.id == productId);

    if (!selectedProduct) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }

    // Lấy người dùng hiện tại từ localStorage
    let currentuser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : {};

    // Khởi tạo giỏ hàng nếu chưa có
    if (!currentuser.cart) {
        currentuser.cart = [];
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingIndex = currentuser.cart.findIndex(item => item.id == productId);

    if (existingIndex === -1) {
        // Thêm sản phẩm mới vào giỏ hàng
        currentuser.cart.push({
            id: selectedProduct.id,
            image: selectedProduct.img,
            title: selectedProduct.title,
            price: selectedProduct.price,
            soluong: 1, // Mặc định số lượng là 1
        });
    } else {
        // Cập nhật số lượng nếu sản phẩm đã tồn tại
        currentuser.cart[existingIndex].soluong += 1;
    }

    // Lưu lại thông tin vào localStorage
    localStorage.setItem('currentuser', JSON.stringify(currentuser));

    // Cập nhật hiển thị giỏ hàng
    showCart();
}


// document.querySelectorAll('.add-cart').forEach(button => {
//     button.addEventListener('click', () => {
//         const productId = button.getAttribute('data-product'); // Lấy ID sản phẩm từ thuộc tính
//         addcart(productId); // Gọi hàm addcart với ID sản phẩm
//         console.log("cccc");
        
//     });
// });
// document.querySelectorAll('.add-cart').forEach(btn =>{
//     btn.addEventListener('click', () =>{
//         console.log("mmmm");
        
//     })
// })
function addProduct(productId) {
    // document.querySelectorAll('.add-cart').forEach(btn =>{
        // const productId = btn.getAttribute('data-product'); // Lấy ID sản phẩm từ thuộc tính
        addcart(productId); // Gọi hàm addcart với ID sản phẩm
    // })
}


function getproduct(item) {
    let products = JSON.parse(localStorage.getItem('products'));
    let infoProductCart = products.find(sp => item.id === sp.id);
    let product = {
        ...infoProductCart,
        ...item
    }
    return product
}


// tìm kiếm
function searchProducts() {
    let searchInput = document.getElementById('search-input').value.trim();
    let products = JSON.parse(localStorage.getItem('products'));

    // Lọc sản phẩm có tên chứa từ khóa tìm kiếm
    let filteredProducts = products.filter(value => {
        return value.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
                searchInput
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
            );
    });

    // Hiển thị danh sách sản phẩm đã lọc
    renderProduct(filteredProducts);
}

// Khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input').addEventListener('keypress', function (event) {// Lấy phần tử input có id="search-input"
            if (event.key === "Enter") {
                searchProducts(); // Gọi hàm tìm kiếm
            }
        });
         products = JSON.parse(localStorage.getItem('products'));
    renderProduct(products);
});





