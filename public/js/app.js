const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading weather data'
    messageTwo.textContent = ''

    const address = search.value

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    })
})
})