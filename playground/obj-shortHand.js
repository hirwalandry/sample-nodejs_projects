const product = {
    label: 'red noteBook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const products = (type, { label,price }) => {
    console.log(type, label, price)

}

products('order', product);