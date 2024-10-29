async function uploadBanner(file) {
    const formData = new FormData();
    formData.append('banner', file);

    try {
        const response = await fetch('http://localhost:5157/api/Banner/Upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Banner uploaded successfully:', data);
        } else {
            console.error('Failed to upload banner');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// document.getElementById('bannerInput').addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         uploadBanner(file);
//     }
// });

async function deleteBanner(bannerId) {
    try {
        const response = await fetch(`http://localhost:5157/api/Banner/Delete/${bannerId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Banner deleted successfully');
            // Thực hiện các hành động sau khi xóa thành công
        } else {
            console.error('Failed to delete banner');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// deleteBanner('bannerId_here');

