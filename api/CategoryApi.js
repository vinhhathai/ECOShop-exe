const apiUrl = 'http://localhost:5157/api/Category';
    const categoryTableBody = document.querySelector('#categoryTable tbody');
    const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));

    let selectedCategoryId = null;

    // Function to get the authToken from localStorage
    function getAuthToken() {
      return localStorage.getItem('authToken');
    }

    // Fetch and display categories
    async function loadCategories() {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}` // Include the token in the headers
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching categories:', errorData.message);
          throw new Error('Failed to fetch categories: ' + errorData.message);
        }

        const result = await response.json();
        console.log('Fetched categories:', result); // Log the entire response
        console.log(result.$values)
        // Check if the 'success' flag is true and data is an array
        if (result && Array.isArray(result.$values)) {
          console.log(result.$values)
          // Clear the current table body
          categoryTableBody.innerHTML = '';

          // Loop through each category and create a row
          result.$values.forEach(category => {
            const row = `
           <tr>
             <td>${category.idCate}</td>
             <td>${category.nameCate}</td>
             <td>
               <button class="btn btn-warning btn-sm" onclick="editCategory('${category.idCate}', '${category.nameCate}')">Chỉnh sửa</button>
               <button class="btn btn-danger btn-sm" onclick="showDeleteModal('${category.idCate}')">Xoá</button>
             </td>
           </tr>
         `;
            categoryTableBody.innerHTML += row;
          });
        } else {
          console.error('No data available or operation was not successful');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }



    // Add or update category
    document.getElementById('categoryForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameCate = document.getElementById('categoryName').value;

      try {
        const method = selectedCategoryId ? 'PUT' : 'POST';
        const url = selectedCategoryId ? `${apiUrl}/${selectedCategoryId}` : apiUrl;

        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}` // Include the token in the headers
          },
          body: JSON.stringify({ nameCate }),
        });

        categoryModal.hide();
        loadCategories();
      } catch (error) {
        console.error('Error saving category:', error);
      }
    });

    // Open modal to add category
    document.getElementById('addCategoryBtn').addEventListener('click', () => {
      selectedCategoryId = null;
      document.getElementById('categoryForm').reset();
      document.getElementById('categoryModalLabel').innerText = 'Add Category';
      categoryModal.show();
    });

    // Edit category
    function editCategory(id, nameCate) {
      selectedCategoryId = id;
      document.getElementById('categoryName').value = nameCate;
      document.getElementById('categoryModalLabel').innerText = 'Edit Category';
      categoryModal.show();
    }

    // Show delete confirmation modal
    function showDeleteModal(id) {
      selectedCategoryId = id;
      confirmDeleteModal.show();
    }

    // Confirm delete category
    document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
      try {
        await fetch(`${apiUrl}/${selectedCategoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}` // Include the token in the headers
          }
        });
        confirmDeleteModal.hide();
        loadCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    });

    // Load categories on page load
    window.onload = loadCategories;