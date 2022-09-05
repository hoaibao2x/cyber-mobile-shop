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
    myOder.map(function (orderItem) {
        content += `
            <div class= "order__item">
                <div class= "row">
                    <div class= "col-md-6 text-center">
                        <img class= "order__image" src= "${orderItem.img}" />
                    </div>
                    <div class= "col-md-6">
                        <ul class= "order__desc">
                            <li>
                                <span class= "order__name">Tên sản phẩm: </br> ${orderItem.namePro}</span>
                            </li>
                            <li>
                                <span class= "order__quantity">Số lượng: <span class= "quantity__desc">${orderItem.quantity}</span></span>
                            </li>
                            <li>
                                <span class= "order__amount">Thành tiền: <span class= "amount__desc">$${(orderItem.quantity * orderItem.price).toLocaleString()}</span></span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        `
    });

    getELE("collapseOrder").innerHTML = content;
}

// Show total price
function showTotalPrice(myOrder) {
    var sum = 0;
    for (let i = 0; i < myOrder.length; i++) {
        sum = sum + (myOrder[i].quantity * myOrder[i].price);
    }

    return sum;
}
var calcPrice = showTotalPrice(myCart.cartArr);

getELE("collapseAmount").innerText = `Tổng tiền đơn đặt hàng: $${calcPrice.toLocaleString()}`;

// Remove order history
window.onclick = function () {
    localStorage.removeItem("DSDT");
};
