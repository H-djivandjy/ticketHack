const searchBtn = document.querySelector('#btn-search')
searchBtn.addEventListener('click', function(){
 
const departureInput = document.querySelector('#departure').value
const arrivalInput =document.querySelector('#arrival').value
const dateInput =document.querySelector('#date').value

console.log(dateInput)

const tripObj = {
    departure: departureInput,
    arrival: arrivalInput,
    date: dateInput,
}

if (!departureInput || !arrivalInput || !dateInput){
    document.querySelector('#content-right').textContent = 
        `<div id="content-right">
        <img class="img" src="images/notfound.png"/>
        <p class="text">Itinary not found</p>
      </div>`
      return;
}

fetch('http://localhost:3000/trips',{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tripObj),
	}).then(res => res.json())
      .then(backendData => {
        const tripsArray = backendData.trips

        for(let i=0; i<tripsArray.length; i++){
            const departure = tripsArray[i].departure
            const arrival = tripsArray[i].arrival
            const date = tripsArray[i].date
            const price = tripsArray[i].price

            
            console.log()

        }



        document.querySelector('#content-right').textContent = 
        `<div id="content-right">
        <p>Paris > Lyon</p>
      <p>17:11</p>
      <p>83$</p>
      <button id="book-btn" style="height:25px">Book</button>
      </div>`

    })

// fetch('http://localhost:3000/trips')
//     .then(res => res.json())
//     .then(data =>{

//         console.log(data)
//     })
    
//     console.log('hello')
    
})

    