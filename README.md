login k redirect qua admin page,
them footer 
item array them hien chu vao anh maybe frost affect
neu con du lịeu them thi loading - them vao item row
hover show add to cart button -> click show modal have infomation to add to cart

category array doi mau thaanh den, khi chon active mau 
user edit profile - khong cho edit username va sdt, nut edit tuong minh len

error:
place order push k dc
edit product -chia ra edit anh rieng, update thong tin product rieng (de chung bi loi mat anh)
-UI:
.an thanh scroll bar
.an scrollbar
.CHINH ANH CHO VUA VOI VUNG CHUA

. tien 3 don vi
.cartscreen
.ỏderplace

.cart component chua chinh logic
.kiem tra lai cac trang khac
-doi email UI, chua check cu phap email
-admin edit order


lam su cung dc
- user nhan thong bao khi don hang duoc duyet
- redirect lai trang truoc do sau khi login, neu khong duoc thi popup (tiep tuc mua hang, ve trang chu)
- KT lai cac chuc nang
- Dockerize project

Mac : 1440 x 609
Screen : 1920 x 640

git clone:
npm i
npm i express mongoose body-parser cors jsonwebtoken --save
npm i react react-dom react-router @material-ui/icons

---

chua hien thong bao: VD: neu singup server error 400 thi thong bao email da ton tai
dang làm redirect : problem at login for ủsser and admin cannot redirect

tao user profile
lam tiep redirect

INFO
assets of templates are divided into

- js, jquery,plugins at public
- css, scss, font,.. at src

checkout button:
click: if da login redirect shipping , else login

checkout step: login - shipping - payment (code/atm momo) - place order

img path

    Redux
        <img src={`http://localhos0t:3000/assets/imgs/products/${product.thumbnail}`} />
        image={`http://localhost:300/assets/imgs/products/${product.thumbnail}`}

<img src={`http://localhost:3000/assets/imgs/products/${thumbnail}`}
Normal
img src="{`http://localhost:3000/assets/imgs/products/${this.props.product.thumbnail}`}"

    Material design

image={"http://localhost:3000/assets/imgs/products/"+this.props.product.thumbnail}
