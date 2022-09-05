var proServices = new ProductServices();
var myCart = new Cart();


var getELE = id => document.getElementById(id);


// Create local storage
var setLocalStorage = () => localStorage.setItem("DSDT", JSON.stringify(myCart.cartArr));

// Clear local storage
var clearlocalStorage = () => {
    var checkItem = checkItemCart();
    if (checkItem) {
        alert("Xóa giỏ hàng thành công !");
        localStorage.removeItem("DSDT");

        var cartEmpt = [ ...myCart.cartArr];
        cartEmpt = [];
        showCart(cartEmpt);
        document.getElementById("mainCart").innerHTML = cartEmpt;

        getELE("pay-amount").innerHTML = "";
        document.querySelector("#cart__popup .close-btn").click();
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }
}

// Get local storage
var getLocalStorage = () => {
    if (localStorage.getItem("DSDT") != undefined) {
        myCart.cartArr = JSON.parse(localStorage.getItem("DSDT"));
    }
    showCart(myCart.cartArr);
}
getLocalStorage();

// Get product list data
function getProductList() {
    proServices.getProductList()
        .then(function (result) {
            showProducts(result.data);
            amountPrice();
        })
        .catch(function (error) {
            console.log(error);
        })
}
getProductList();

// show product list in UI
function showProducts(arrPros) {
    var content = "";
    arrPros.map(function (pro) {
        content += `
            <div class="col-md-6 col-xl-3">
                    <div class="product__item">
                        <div class="card">
                            <div class="card-header">
                                <img src=${pro.img}>
                            </div>
                            <div class="card-body">
                                <ul class="pro__content">
                                    <li class="pro__name">${pro.name}</li>
                                    <li class="pro__screen">${pro.screen}</li>
                                    <li class="pro__back-cam">${pro.backCamera}</li>
                                    <li class="pro__front-cam">${pro.frontCamera}</li>
                                    <li class="pro__desc">${pro.desc}</li>
                                </ul>
                            </div>
                            <div class="card-footer">
                            <span class="pro__prices">$${pro.price}</span>
                            <button class= "pro__addCart" onclick= "addToCart(${pro.id})" class="btn btn-primary">
                                Thêm vào giỏ hàng
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
        `
        document.querySelector(".row").innerHTML = content;
    })
}

// Filter product by type
function filterPros() {
    var arrPros = [];
    var mySelect = getELE("navSelect").value;
    proServices.getProductList()
        .then(function (result) {
            var arrData = result.data;
            arrData.map(function (product) {
                if (product.type === mySelect) {
                    arrPros.push(product);
                }
            });

            if (arrPros.length > 0) {
                showProducts(arrPros);
            } else {
                arrPros = arrData;
                showProducts(arrPros);
            }

        })
        .catch(function (error) {
            console.log(error);
        })
}

// Add product to cart
function addToCart(id) {
    proServices.getProductDetail(id)
        .then(function (result) {
            var getInfo = result.data;
            var idCheck = getInfo.id;

            var checkExist = isExist(idCheck);
            if (checkExist) {
                changeQuantiUp(idCheck);
            } else {
                var cartItem = new CartItem(getInfo.id, getInfo.img, Number(getInfo.price), getInfo.name, 1);
                cartItem.amount();

                myCart.addCartItem(cartItem);
                showCart(myCart.cartArr);
            }

            amountPrice();
            setLocalStorage();
        })
        .catch(function (error) {
            console.log(error);
        })
}

function isExist(id) {
    var result = false;
    for (var i = 0; i < myCart.cartArr.length; i++) {
        if (id === myCart.cartArr[i].id) {
            result = true;
        }
    }
    return result;
}

// Show cart
function showCart(myCart) {
    var content = "";
    var stt = 1;
    myCart.map(function (item) {
        content += `
            <tr>
                <td>${stt++}</td>
                <td>${item.namePro}</td>
                <td>
                    <button onclick= "changeQuantiDow(${item.id})" class= "btn btn-warning">-</button>
                    <span style= "padding: 0 12px">${item.quantity}</span>

                    <button onclick= "changeQuantiUp(${item.id})" class= "btn btn-info">+</button>
                </td>
                <td>$${(item.quantity * item.price).toLocaleString()}</td>
                <td>
                    <button onclick= "removeCartItem(${item.id})" class= "btn btn-danger">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `;
    })
    document.getElementById("mainCart").innerHTML = content;
}

// Increase cartItem
function changeQuantiUp(id) {
    var tempCart = myCart.cartArr;
    for (var i = 0; i < tempCart.length; i++) {
        if (id == tempCart[i].id) {
            tempCart[i].quantity++;
            setLocalStorage();
        }
    }

    amountPrice();
    showCart(tempCart);
    setLocalStorage();
}

// Decrease cartItem
function changeQuantiDow(id) {
    var tempCart = myCart.cartArr;
    for (var i = 0; i < tempCart.length; i++) {
        if (id == tempCart[i].id) {
            if (tempCart[i].quantity <= 1) {
                removeCartItem(tempCart[i].id);
                amountPrice();
                setLocalStorage();
            } else {
                tempCart[i].quantity--;
                setLocalStorage();
            }

        }
    }
    amountPrice();
    showCart(tempCart);
    setLocalStorage();
}

// Remove cartItem
function removeCartItem(id) {
    myCart.removeCartItem(id);
    amountPrice();
    showCart(myCart.cartArr);
    setLocalStorage();
}

// Total price
function amountPrice() {
    var sum = 0;
    for (var i = 0; i < myCart.cartArr.length; i++) {
        sum = sum + (myCart.cartArr[i].quantity * myCart.cartArr[i].price);
    }

    getELE("pay-amount").innerHTML = sum.toLocaleString();
}

// Check cart item quantity
function checkItemCart() {
    var sum = 0;
    var checkStatus = false;
    for (let i = 0; i < myCart.cartArr.length; i++) {
        sum += myCart.cartArr[i].quantity;
    }

    if (sum > 0) {
        checkStatus = true;
    }

    return checkStatus;
}