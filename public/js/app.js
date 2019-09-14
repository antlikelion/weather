console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(`오류 : ${data.error}`)
//         }
//         console.log(`지역 : ${data.location}`)
//         console.log(`예보 : ${data.forecast}`)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = '예보 정보를 받아오고 있습니다. 잠시만 기다려주세요.'
    messageTwo.textContent = null

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = `오류 : ${data.error}`
                return console.log(`오류 : ${data.error}`)
            }
            console.log(`지역 : ${data.location}`)
            messageOne.textContent = `지역 : ${data.location}`
            console.log(`예보 : ${data.forecast}`)
            messageTwo.textContent = `예보 : ${data.forecast}`
        })
    })
})