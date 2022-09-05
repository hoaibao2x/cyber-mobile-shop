function CartItem(id, img, price, namePro, quantity) {
    this.id = id;
    this.img = img;
    this.price = price;
    this.namePro = namePro;
    this.quantity = quantity;

    this.amount = function () {
        return this.price * this.quantity; 
    }
}