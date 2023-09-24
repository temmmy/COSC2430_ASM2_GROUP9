// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Authors: 
// Nguyen Chi Nghia (s3979170)
// Tran Bao Khoi (s3926093)
// Tran Hoang Son (s3978450)
// Bui Cong Duy (s3978546)
// Hoang Quoc Dat (s3979331)
// Acknowledgement: https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp 

// Customer Registration

const form = document.querySelector('form');
const usernameError = document.querySelector('.username_error');
const passwordError = document.querySelector('.password_error');
const profilePictureError = document.querySelector('.profilePicture_error');
const nameError = document.querySelector('.name_error');
const addressError = document.querySelector('.address_error');
const formData = new FormData();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  usernameError.textContent = ' ';
  passwordError.textContent = ' ';
  profilePictureError.textContent = ' ';
  nameError.textContent = ' ';
  addressError.textContent = ' ';

  // getting values from the form
  const username = form.username.value;
  const password = form.password.value;
  const profilePicture = document.getElementById('profilePicture').files[0];
  const name = form.name.value;
  const address = form.address.value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('profilePicture', profilePicture);
  formData.append('name', name);
  formData.append('address', address);

  try {
    const res = await fetch('/customerREG', {
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
      nameError.textContent = data.errors.name;
      addressError.textContent = data.errors.address;
    }
    if (data.customer) {
      location.assign('/customerLOG');
    }
  } catch (err) {
    console.log(err);
  }
});
