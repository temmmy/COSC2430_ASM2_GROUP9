const form = document.querySelector('form');
const usernameError = document.querySelector('.username_error');
const passwordError = document.querySelector('.password_error');
const profilePictureError = document.querySelector('.profilePicture_error');
const businessNameError = document.querySelector('.businessName_error');
const businessAddressError = document.querySelector('.businessAddress_error');
const formData = new FormData();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  usernameError.textContent = ' ';
  passwordError.textContent = ' ';
  profilePictureError.textContent = ' ';
  businessNameError.textContent = ' ';
  businessAddressError.textContent = ' ';

  // getting values from the form
  const username = form.username.value;
  const password = form.password.value;
  const profilePicture = document.getElementById('profilePicture').files[0];
  const businessName = form.businessName.value;
  const businessAddress = form.businessAddress.value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('profilePicture', profilePicture);
  formData.append('businessName', businessName);
  formData.append('businessAddress', businessAddress);

  try {
    const res = await fetch('/vendorREG', {
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
      businessNameError.textContent = data.errors.businessName;
      businessAddressError.textContent = data.errors.businessAddress;
    }
    if (data.vendor) {
      location.assign('/vendorLOG');
    }
  } catch (err) {
    console.log(err);
  }
});
