var myCart = new Cart();

var getELE = id => document.getElementById(id);

// Get local storage
var getLocalStorage = () => {
    if (localStorage.getItem("DSDT") != undefined) {
        myCart.cartArr = JSON.parse(localStorage.getItem("DSDT"));
        if (myCart.cartArr.length > 0) {
            getELE("top__title").innerText = "Đơn hàng của bạn sẽ được giao trong vài ngày tới";

            getELE("img__delivery").style.display = "inline";
            getELE("img__empty__cart").style.display = "none";
            getELE("myCollapse").style.display = "inline";
        } 
    }
    showOderContent(myCart.cartArr);
}
getLocalStorage();

// Show oder content
function showOderContent(myOder) {
    var content = "";
    myOder.map(function (oderItem) {
        content += `
            <div class= "oder__item">
                <div class= "row">
                    <div class= "col-md-6 text-center">
                        <img class= "oder__image" src= "${oderItem.img}" />
                    </div>
                    <div class= "col-md-6">
                        <ul class= "oder__desc">
                            <li>
                                <span class= "oder__name">Tên sản phẩm: </br> ${oderItem.namePro}</span>
                            </li>
                            <li>
                                <span class= "oder__quantity">Số lượng: <span class= "quantity__desc">${oderItem.quantity}</span></span>
                            </li>
                            <li>
                                <span class= "oder__amount">Thành tiền: <span class= "amount__desc">$${(oderItem.quantity * oderItem.price).toLocaleString()}</span></span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        `
    });

    getELE("collapseOder").innerHTML = content;
}

// Show total price
function showTotalPrice(myOder) {
    var sum = 0;
    for (let i = 0; i < myOder.length; i++) {
        sum = sum + (myOder[i].quantity * myOder[i].price);
    }

    return sum;
}
var calcPrice = showTotalPrice(myCart.cartArr);

getELE("collapseAmount").innerText = `Tổng tiền đơn đặt hàng: $${calcPrice.toLocaleString()}`;

// Remove order history
window.onclick = function () {
    localStorage.removeItem("DSDT");
};
