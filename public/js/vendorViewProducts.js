const form = document.querySelector('form');
const nameError = document.querySelector('.name_error');
const artistNameError = document.querySelector('.artistName_error');
const descriptionError = document.querySelector('.description_error');
const priceError = document.querySelector('.price_error');
const imageError = document.querySelector('.image_error');
const formData = new FormData();
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm')

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
        console.log(data)
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

editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    nameError.textContent = ' ';
    artistNameError.textContent = ' ';
    descriptionError.textContent = ' ';
    priceError.textContent = ' ';
    imageError.textContent = ' ';

    // getting values from the form
    const name = form.name.value;
    const artistName = form.artistName.value;
    const description = form.description.value;
    const price = form.price.value;
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
        console.log(data)
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

