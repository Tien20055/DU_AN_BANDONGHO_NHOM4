let products = [{
    id: 1,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ CASIO- NAM- MTHPH27',
    img: '../imgaes/sp/1.webp',
    category: 'Nam',
    price: 10000000,
    desc: 'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 2,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ QLYM- NAM- PIHCH472',
    img: '../imgaes/sp/2.webp',
    category: 'Nam',
    price: 2500000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 3,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ TISSOT- NAM - DPACN006 ',
    img: '../imgaes/sp/3.webp',
    category: 'Lucsury',
    price: 2670000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 4,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ CANIVAR- NAM -8110G',
    img: '../imgaes/sp/4.webp',
    category: 'Lucsury',
    price: 5100000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 5,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ TISSOT - NỮ - 703HCNGH0',
    img: '../imgaes/sp/7.webp',
    category: 'Nữ',
    price: 300000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 6,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ CASIO- NAM -570 -EXPH',
    img: '../imgaes/sp/5.webp',
    category: 'Nam',
    price: 4999999,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 7,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ SEKIO- NỮ -NNHCF2514',
    img: '../imgaes/sp/8.webp',
    category: 'Nữ',
    price: 5999000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 8,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ CASIO- NAM- 4300SOCV',
    img: '../imgaes/sp/6.webp',
    category: 'Lucsury',
    price: 2300000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 9,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ LONGINES- NAM- 600GH',
    img: '../imgaes/sp/9.webp',
    category: 'Lucsury',
    price: 7800000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 10,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ GATTI- NAM - 8283VH',
    img: '../imgaes/sp/10.webp',
    category: 'Lucsury',
    price: 8900000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 11,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ TISSON- NỮ -507 -2147',
    img: '../imgaes/sp/11.webp',
    category: 'Lucsury',
    price: 4000000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
{
    id: 12,
    status: 1,
    address: 'Xuất xứ : Thụy Điển',
    title: 'Đồng hồ GATTI- NAM- 8970VT',
    img: '../imgaes/sp/12.webp',
    category: 'Lucsury',
    price: 2300000,
    desc:'Đồng hồ HUB cao cấp sang trong phù hợp với các quý ông'
},
]
localStorage.setItem("products" , JSON.stringify(products))

function createAminAcount() {
    let account = localStorage.getItem('account');
    if (!account) {
        account = [];
        account.push({
            fullName: 'Nguyen Van Tien',
            email: 'tien@gmail.com',
            password: '123456',
            cart:[]
        })
        localStorage.setItem('account', JSON.stringify(account));
    }
}
createAminAcount()
