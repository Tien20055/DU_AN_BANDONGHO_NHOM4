
function renderProduct(sp) {
    let products = JSON.parse(localStorage.getItem('products'));
    let testHtml = '';
    products.forEach(sp => {
        testHtml += `
        <div class="sp">
                        <img src="${sp.img}" alt="">
                        <span class="text"> VIP</span>
                        <p class="mt">${sp.title}</p>
                        <p class="gia" style="color: red; font-weight: bold;">${sp.price}</p>
                        <p class="xs">${sp.address}</p>
                        <div class="dh">
                            <button">Thêm gỏi hàng</button>
                            <button><a href="">Đặt hàng</a></button>
                        </div>
                    </div>
    `
    });
    document.getElementById("khungsp").innerHTML = testHtml;
}
renderProduct()
function phantrang(sp,trangHt,sotrang){
    const start = (trangHt-1)*sotrang;
    const end =  start + sotrang;
    const phantrangSP =  sp.slice(start,end);
    renderProduct(phantrangSP);
}
function thietlapphantrang(tongsp,sotrang){
    const pageNavList = document.querySelector('.sotrang')
    pageNavList.innerHTML = '';
    const trangdem = Math.ceil(tongsp / sotrang)
    for (let page = 1; page <= trangdem; page++) {
        let node = document.createElement('li');
        node.classList.add('page-nav-item');
        node.innerHTML = `<a href="javascript:;">${page}</a>`;
        
        if (trangHt === page) {
            node.classList.add('active');
        }

        node.addEventListener('click', function () {
            trangHt = page;
            localStorage.setItem('trangHt', trangHt); // Lưu trạng thái trang
            displayList(sp, trangHt, sotrang); // Gọi displayList với sản phẩm và trang hiện tại

            // Cập nhật lớp active
            let t = document.querySelectorAll('.page-nav-item.active');
            for (let i = 0; i < t.length; i++) {
                t[i].classList.remove('active');
            }
            node.classList.add('active');

        //     // Cuộn đến phần dịch vụ
        //     document.getElementById("home-service").scrollIntoView();
        });

        pageNavList.appendChild(node); // Thêm phần tử li vào danh sách
    }
}
phantrang(sp,trangHt,sotrang) 
thietlapphantrang(tongsp,sotrang)


// //Giỏ hàng
// let giohang = new Array();
// function themgiohang(x){
//     let sp = x.parentElment.children;

// }

// function showcart() {
// let x = document.getElementById("showcart");
//     if (x.style.display === "block") {
      

 
//         x.style.display = "none"; // Sửa từ == thành =
//     } 
//     else {

     
//         x.style.display = "block"; // Sửa từ == thành =
//     }
// }

// let showcart = document.getElementById('showcart')
// function showcart() {
//     if (showcart.style.display === "none") {
//         showcart.classList.add('show')
//     }else{
//         showcart.classList.remove('show')
//     }
// }
// showcart()


