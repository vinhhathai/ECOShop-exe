function updatePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Optional: Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
  
    const passwordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
  
    fetch('http://localhost:5157/api/ChangePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passwordData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Password updated successfully');
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to update password');
    });
  }

  function uploadAvatar() {
    const form = document.getElementById('uploadAvatarForm');
    const formData = new FormData(form);
  
    fetch('http://localhost:5157/api/uploadAvatar', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Avatar uploaded successfully');
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to upload avatar');
    });
  }
  
  