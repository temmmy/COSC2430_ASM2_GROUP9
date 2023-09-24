const form = document.querySelector('.formChange');

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append('image', image);
    try {
        const res = await fetch('/updateProfilePicture', {
            method: 'POST',
            // body: JSON.stringify({ username, password, profilePicture, name, address }),
            // headers: { 'Content-Type': 'application/json' }
            body: formData,
        });

        data = await res.json()
        if (data.errors) {
        }
        else {
            location.reload();
        }
    } catch (err) {
        console.log(err);
    }
});