async function fetchProducts(page, searchString, IdCate, from, to) {
    const url = new URL('http://localhost:5157/api/Product');

    // Set query parameters
    url.searchParams.append('page', page);
    if (searchString) url.searchParams.append('searchString', searchString);
    if (IdCate) url.searchParams.append('IdCate', IdCate);
    if (from) url.searchParams.append('from', from);
    if (to) url.searchParams.append('to', to);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();

        // Display data in the HTML
        displayProducts(data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: ${product.category}</p>
        `;
        container.appendChild(productDiv);
    });
}

// Call the function with specific parameters
fetchProducts(1, '', '123', 10, 100);