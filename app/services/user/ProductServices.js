function ProductServices() {
    this.getProductList = function () {
        return axios({
            method: 'get',
            url: 'https://62f3954aa84d8c9681270b89.mockapi.io/Products'
        })
    }
    this.getProductDetail = function (id) {
        return axios({
            method: 'get',
            url: `https://62f3954aa84d8c9681270b89.mockapi.io/Products/${id}`
        })
    }
}   