const searchBtn = document.querySelector('#btn-search')
searchBtn.addEventListener('click', function(){
 
const departureInput = document.querySelector('#departure').value
const arrivalInput =document.querySelector('#arrival').value
const dateInput =document.querySelector('#date').value

// const trips = {departure: departureInput, arrival: arrivalInput, date: dateInput }
// console.log(trips)

fetch('http://localhost:3000/trips',{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departureInput, arrivalInput, dateInput }),
	}).then(res => res.json())
      .then(backendData => {
        console.log(backendData)
    })

// fetch('http://localhost:3000/trips')
//     .then(res => res.json())
//     .then(data =>{

//         console.log(data)
//     })
    
//     console.log('hello')
    
})

    