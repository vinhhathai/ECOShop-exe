
    // const logoutBtn = document.getElementById('logout-btn');

    // // Hàm xóa tất cả cookie
    // function clearAllCookies() {
    //     document.cookie.split(";").forEach((cookie) => {
    //         const eqPos = cookie.indexOf("=");
    //         const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    //         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    //     });
    // }

    // // Sự kiện đăng xuất
    // if (logoutBtn) {
    //     logoutBtn.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         alert('Đăng xuất thành công!');
            
    //         // Xóa cookie
    //         clearAllCookies();

    //         // Chuyển hướng về trang đăng nhập
    //         window.location.href = '/view/sign-in-page.html';
    //     });
    // }

    // URL API
    const apiUrl = 'http://localhost:5157/api/Category';

    // Hàm lấy danh mục từ API
    async function fetchCategories() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.$values || [];
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    // Hàm render danh mục dưới dạng tab
    function renderCategories(categories) {
        const tabsContainer = document.getElementById('category-tabs');
        const tabContentContainer = document.getElementById('category-tab-content');

        if (!tabsContainer || !tabContentContainer) {
            console.warn('Tabs container or tab content container not found.');
            return;
        }

        categories.forEach((category, index) => {
            const isActive = index === 0 ? 'active' : ''; // Tab đầu tiên là active

            // Tạo nút tab
            const tab = document.createElement('li');
            tab.classList.add('nav-item');
            tab.innerHTML = `
                <button type="button" class="nav-link text-uppercase ${isActive}"
                    id="${category.idCate}-tab" data-bs-toggle="tab"
                    data-bs-target="#${category.idCate}-tab-pane" role="tab"
                    aria-controls="${category.idCate}-tab-pane"
                    aria-selected="${isActive === 'active'}">
                    ${category.nameCate}
                </button>
            `;
            tabsContainer.appendChild(tab);

            // Tạo nội dung tab
            const tabPane = document.createElement('div');
            tabPane.classList.add('tab-pane', 'fade', isActive);
            tabPane.id = `${category.idCate}-tab-pane`;
            tabPane.setAttribute('role', 'tabpanel');
            tabPane.setAttribute('aria-labelledby', `${category.idCate}-tab`);
            tabPane.innerHTML = `<p>Nội dung cho danh mục ${category.nameCate}</p>`;
            tabContentContainer.appendChild(tabPane);
        });
    }

    // Fetch và render danh mục khi trang được load
    window.onload = async () => {
        const categories = await fetchCategories();
        renderCategories(categories);
    };
