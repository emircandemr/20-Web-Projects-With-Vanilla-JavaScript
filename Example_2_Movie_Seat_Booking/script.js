const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)") ;
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");
let ticketPrice = Number(movieSelect.value);

populateUI();



const updateSelectedCount = () => {

    const selectedSeats = document.querySelectorAll(".row .seat.selected")

    const seatsIndex = [...selectedSeats].map( (seat) => {
        return [...seats].indexOf(seat)
    })

    console.log(seatsIndex)
    
    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice

}

const setMovieData = (index , price) => {

    localStorage.setItem("selectedMovie" , index);
    localStorage.setItem("selectedPrice" , price);

}


movieSelect.addEventListener("change" , (e) => {
    ticketPrice = Number(e.target.value);
    setMovieData(e.target.selectedIndex , e.target.value)
    updateSelectedCount()
})


function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    
    if(selectedSeats !==null && selectedSeats.length > 0){
        seats.forEach( (seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovie")

    if(selectedMovieIndex !==null){
        movieSelect.selectedIndex = selectedMovieIndex
    }

}

container.addEventListener("click" , (e) => {

    if(e.target.classList.contains("seat") && 
    !e.target.classList.contains("occupied")){

        e.target.classList.toggle("selected");

        updateSelectedCount()


    }

})

updateSelectedCount()