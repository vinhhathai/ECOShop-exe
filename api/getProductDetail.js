async function fetchProductById(id) {
    const url = `http://localhost:5157/api/Product/${id}`; // URL cho sản phẩm cụ thể

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const product = await response.json();

        // Hiển thị sản phẩm trong HTML
        displayProduct(product);
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
}

function displayProduct(product) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Xóa nội dung trước đó

    // Tạo phần tử hiển thị sản phẩm
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Category: ${product.category}</p>
    `;
    container.appendChild(productDiv);
}

// Gọi hàm với id sản phẩm cụ thể
fetchProductById('productId_here');
