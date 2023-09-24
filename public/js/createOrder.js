const form = document.querySelector('.createOrder');
const hub = document.querySelector('.hub');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    var total = document.querySelector('#totalValue').innerHTML.slice(3).trim()
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