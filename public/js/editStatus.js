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


// Script for shippers to edit status

const form = document.querySelector('form');
const buttons = document.querySelectorAll('.data')
var status
var id

buttons.forEach(button => {
    button.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('data')) { // Remove the dot (.) before 'data'
            e.preventDefault();
            id = e.target.getAttribute('data-id');
            console.log(true);
            status = e.target.getAttribute('data-status');
        }
    });
});

form.addEventListener('submit', async (event) => {
    const newStatus = form.distributionHub.value
    console.log(newStatus)
    event.preventDefault();
    try {
        const res = await fetch('/editStatus', {
            method: 'POST',
            body: JSON.stringify({ id, newStatus }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
        }
        else {
            location.reload()
        }
    } catch (err) {
        console.log(err);
    }
});
