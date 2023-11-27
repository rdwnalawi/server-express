const API_URL = 'http://localhost:3000';

async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        const productContainer = document.getElementById('product-container');
        products.forEach((product) => {
            const newProduct = document.createElement('li');
            newProduct.textContent = `${product.name} - ${product.price}`;
            productContainer.appendChild(newProduct) ;
        })
    } catch (error) {
        console.log(products);
    }
}

getProducts(); 