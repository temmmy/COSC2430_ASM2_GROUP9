const form = document.querySelector('form');
const usernameError = document.querySelector('.username_error');
const passwordError = document.querySelector('.password_error');
const profilePictureError = document.querySelector('.profilePicture_error');
const shipperNameError = document.querySelector('.shipperName_error');
const distributionHubError = document.querySelector('.distributionHub_error');
const formData = new FormData();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  usernameError.textContent = ' ';
  passwordError.textContent = ' ';
  profilePictureError.textContent = ' ';
  shipperNameError.textContent = ' ';
  distributionHubError.textContent = ' ';

  // getting values from the form
  const username = form.username.value;
  const password = form.password.value;
  const profilePicture = document.getElementById('profilePicture').files[0];
  const shipperName = form.shipperName.value;
  const distributionHub = form.distributionHub.value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('profilePicture', profilePicture);
  formData.append('shipperName', shipperName);
  formData.append('distributionHub', distributionHub);

  try {
    const res = await fetch('/shipperREG', {
      method: 'POST',
      // body: JSON.stringify({ username, password, profilePicture, name, address }),
      // headers: { 'Content-Type': 'application/json' }
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    if (data.errors) {
      usernameError.textContent = data.errors.username;
      passwordError.textContent = data.errors.password;
      profilePictureError.textContent = data.errors.profilePicture;
      shipperNameError.textContent = data.errors.shipperName;
      distributionHub.textContent = data.errors.distributionHub;
    }
    if (data.shipper) {
      location.assign('/shipperLOG');
    }
  } catch (err) {
    console.log(err);
  }
});
