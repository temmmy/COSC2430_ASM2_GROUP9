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

// Script for Vendor managing inventory

const form = document.querySelector('form');
const nameError = document.querySelector('.name_error');
const artistNameError = document.querySelector('.artistName_error');
const descriptionError = document.querySelector('.description_error');
const priceError = document.querySelector('.price_error');
const imageError = document.querySelector('.image_error');
const formData = new FormData();
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm')
const editButtons = document.querySelectorAll('.edit-btn');

// Add product
addForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    nameError.textContent = ' ';
    artistNameError.textContent = ' ';
    descriptionError.textContent = ' ';
    priceError.textContent = ' ';
    imageError.textContent = ' ';

    // getting values from the form
    const name = addForm.name.value;
    const artistName = addForm.artistName.value;
    const description = addForm.description.value;
    const price = addForm.price.value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('artistName', artistName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
        const res = await fetch('/addProduct', {
            method: 'POST',
            // body: JSON.stringify({ username, password, profilePicture, name, address }),
            // headers: { 'Content-Type': 'application/json' }
            body: formData,
        });

        data = await res.json()
        if (data.errors) {
            console.log(true)
            nameError.textContent = data.errors.name;
            artistNameError.textContent = data.errors.artistName;
            descriptionError.textContent = data.errors.description;
            console.log(data.errors.price)
            priceError.textContent = data.errors.price
            imageError.textContent = data.errors.image;
        }
        else {
            location.reload();
        }
    } catch (err) {
        console.log(err);
    }
});

editButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('edit-btn')) {
            // Get product details from data attributes
            const name = e.target.getAttribute('data-name');
            console.log(name)
            const artistName = e.target.getAttribute('data-artistName');
            const description = e.target.getAttribute('data-description');
            const price = e.target.getAttribute('data-price');
            const image = e.target.getAttribute('data-image');
            const id = e.target.getAttribute('data-id')
            // Populate the modal's fields
            document.getElementById('EditName').value = name;
            document.getElementById('EditArtistName').value = artistName;
            document.getElementById('EditDescription').value = description;
            document.getElementById('EditPrice').value = price;
            document.getElementById('productID').value = id;
            document.getElementById('oldImage').value = image;

            const imageDisplay = document.createElement('img');
            imageDisplay.src = "/images/" + image;
            imageDisplay.alt = name;
            imageDisplay.width = 100;
            const imageContainer = document.getElementById('Preview');
            imageContainer.innerHTML = '';  // clear previous image
            imageContainer.appendChild(imageDisplay);
        }
    });
})


editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // getting values from the form
    const name = editForm.EditName.value;
    const artistName = editForm.EditArtistName.value;
    const description = editForm.EditDescription.value;
    const price = editForm.EditPrice.value;
    const id = editForm.productID.value;
    const oldImage = editForm.oldImage.value;
    const image = document.getElementById('EditImage').files[0];;

    nameError.textContent = ' ';
    artistNameError.textContent = ' ';
    descriptionError.textContent = ' ';
    priceError.textContent = ' ';
    imageError.textContent = ' ';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('artistName', artistName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('oldImage', oldImage)
    formData.append('id', id)
    try {
        const res = await fetch('/editProduct/' + id, {
            method: 'POST',
            // body: JSON.stringify({ username, password, profilePicture, name, address }),
            // headers: { 'Content-Type': 'application/json' }
            body: formData,
        });

        data = await res.json()
        if (data.errors) {
            nameError.textContent = data.errors.name;
            artistNameError.textContent = data.errors.artistName;
            descriptionError.textContent = data.errors.description;
            priceError.textContent = data.errors.price;
            imageError.textContent = data.errors.image;
        }
        else {
            location.reload();
        }
    } catch (err) {
        console.log(err);
    }
});



