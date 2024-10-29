function submitDiscount() {
    const code = document.getElementById('code').value;
    const description = document.getElementById('description').value;
    const discountAmount = parseFloat(document.getElementById('discountAmount').value);
    const expiryDate = document.getElementById('expiryDate').value;
    const minimumOrderAmount = parseFloat(document.getElementById('minimumOrderAmount').value);
  
    const discountData = {
      code: code,
      description: description,
      discountAmount: discountAmount,
      expiryDate: expiryDate,
      minimumOrderAmount: minimumOrderAmount
    };
  
    fetch('http://localhost:5157/api/Discount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(discountData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Discount added successfully');
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to add discount');
    });
  }

  function getDiscounts() {
    fetch('http://localhost:5157/api/Discount', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const discountsList = document.getElementById('discountsList');
      discountsList.innerHTML = "<h2>Discounts</h2>";
  
      data.forEach(discount => {
        const discountItem = document.createElement('div');
        discountItem.innerHTML = `
          <p><strong>Code:</strong> ${discount.code}</p>
          <p><strong>Description:</strong> ${discount.description}</p>
          <p><strong>Amount:</strong> ${discount.discountAmount}</p>
          <p><strong>Expiry:</strong> ${new Date(discount.expiryDate).toLocaleString()}</p>
          <p><strong>Min Order:</strong> ${discount.minimumOrderAmount}</p>
          <hr>
        `;
        discountsList.appendChild(discountItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch discounts');
    });
  }
  