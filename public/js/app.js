const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');

const messageOne = document.querySelector('#Message1');
const messageTwo = document.querySelector('#Message2');

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";
    e.preventDefault();
    const location = searchTerm.value;

    const fetchURL = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
    fetch(fetchURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})