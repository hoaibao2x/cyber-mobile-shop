function Cart() {
    this.cartArr = [];

    this.addCartItem = function (item) {
        this.cartArr.push(item);
    }

    this.findIndex = function (idInput) {
        var viTri = -1;
        this.cartArr.map(function (item, index) {
            if (item.id == idInput) {
                viTri = index;
            }
        })

        return viTri;
    }

    this.removeCartItem = function(id) {
        var viTri = this.findIndex(id);

        if (viTri > -1) {
            this.cartArr.splice(viTri, 1);
        }
    }
}