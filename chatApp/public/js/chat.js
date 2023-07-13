const socket = io()

//element
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//template
const $messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    
    console.log(message)
    // function renderHello(){
    //     fetch('template.mustache')
    //     .then((response) => response.text())
    //     .then(() =>{
            const html = Mustache.render($messageTemplate)
            $messages.insertAdjacentHTML('beforeend', html)
    //     })
            
    // }
    
})
   
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }
       
        console.log('the message is delevered!')
    })
})
$sendLocationButton.addEventListener('click', () => { 
    if (!navigator.geolocation) {
        return alert('your browser not support geolocation')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('shared location!')
        })
    })
})