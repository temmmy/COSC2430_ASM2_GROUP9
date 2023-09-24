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

// Script for updating pictureProfile

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