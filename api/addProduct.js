function submitProduct() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
  
    fetch('http://localhost:5157/api/Product', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Product added successfully');
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to add product');
    });
  }
  