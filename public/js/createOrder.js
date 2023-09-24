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

// Script for creating an Order

const form = document.querySelector('.createOrder');
const hub = document.querySelector('.hub');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    var total = document.querySelector('#totalValue').innerHTML.slice(2).trim()
    const distributionHub = hub.distributionHub.value;
    total = Number((parseFloat(total)).toFixed(2))
    try {
        console.log(true);
        const res = await fetch('/addOrder', {
            method: 'POST',
            body: JSON.stringify({ total, distributionHub }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
        }
        else {
            location.assign('/orderConfirmation')
        }
    } catch (err) {
        console.log(err);
    }
});