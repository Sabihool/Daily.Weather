let failed_dtl = document.querySelector(".failed-details")

let all_detail = document.querySelector(".all-details ")


let discover_dtl = document.querySelector(".discover-details")






let srchInput = document.getElementById("search-input");
let suggestion = document.querySelector(".suggestion");
let nav = document.querySelector(".nav");
let srchIcon = document.querySelector(".nav span");






let cityName = document.querySelector(".city-name")

let temperature = document.querySelector(".temperature")

let wTypeName = document.querySelector(".whether-type-name")


let windSpeed = document.querySelector(".wind-speed")

let humidity = document.querySelector(".humidity")
let weatherType = document.querySelector(".whether-type")



let load = document.querySelector(".load-box")

srchInput.onclick = () => {
  suggestion.style.transform = "translateY(0)";
};



function find(city) {
  const apikey = "330f61bc96418f62f4b51be170555f5c";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`City not found: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
   //   console.log("Weather Data:", data);
      
      
     console.log(data) 
      
      
      
   cityName.innerHTML = data.name
  
  temperature.innerHTML = Math.floor(data.main.temp)
    
  wTypeName.innerHTML = data.weather[0].description    
  
  windSpeed.innerHTML = data.wind.speed    
  humidity.innerHTML = data.main.humidity    
      
      
 let imgSrc = `image/${data.weather[0].main.toLowerCase()}.png`
      
 weatherType.src = imgSrc   
      
      let lat = data.coord.lat;
    let lon = data.coord.lon;

   let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;

    

    fetch(url2)
      .then((response) => {

        return response.json();
      })
      .then((data) => {
   //     console.log("Weather Data for Feni (forecast):", data);
  

let forcastbox = document.querySelector(".forcast-scroll")
 forcastbox.innerHTML = ""
 
      for (var i = 0; i < 5; i++) {
     
forcastbox.innerHTML += ` 

<div class="forcast-card">
  <div class="forcast-time">${data.list[i].dt_txt.split(" ")[1].substring(0, 5)}</div>

<img src="image/${data.list[i].weather[0].main.toLowerCase()}.png" alt="" class="forcast-card-image">


 <p class="temperature">${Math.floor(data.list[i].main.temp - 273)}</p>
 </div>`  
   
   
   
    
        
      }

  
  
  
  
      })    
      
  
      
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error.message);
    
all_detail.style.display = 'none'  
discover_dtl.style.display = 'none'  
failed_dtl.style.display = 'flex'  
  
  
 suggestion.innerHTML = "" 
  
    
 fetchCity()
  
    });
    
    
}

srchIcon.onclick = () => {
  suggestion.style.transform = "translate(-100%)";


  if (srchInput.value === "") {

  } else {

    
    
    console.log(srchInput.value)
   
all_detail.style.display = 'block'  
discover_dtl.style.display = 'none'  
failed_dtl.style.display = 'none'  
   
     
   find(srchInput.value.toLowerCase().trim())
  
  
 
   srchInput.value = ""

  load.style.display = "flex"  
  setTimeout(() =>{
    
  load.style.display = "none"  
    
    
    
  },3000)  
  


   fetchCity()
   
  }
};


function fetchCity() {
  



fetch("popular_cities.json")
  
  
  .then((response) => response.json())
  .then((data) => {
    // Render all place cards initially
    data.forEach((cityData) => {
      suggestion.innerHTML += `
        <div class="place-card">
          <div>
            <span class="material-symbols-outlined">my_location</span>
          </div>
          <div>
            <h1>${cityData.city}</h1>
            <h3>${cityData.country}</h3>
          </div>
          <span class="material-symbols-outlined arrow">arrow_upward</span>
        </div>
      `;
    });

    // Add event listeners to arrows
    let arrows = document.querySelectorAll(".arrow");
    arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        let card = arrow.closest('.place-card');
        let h1 = card.querySelector('h1');
        srchInput.value = h1.textContent;
      });
    });

    // Handle keyup event to filter place cards
    
    
    
    
 let clickCard = document.querySelectorAll(".place-card");
   
    
clickCard.forEach(card => {
     card.addEventListener('click', () => {
     
      let h1 = card.querySelector('h1');
       
     //   let card1 = card.querySelector("h1");
 suggestion.style.transform = "translateY(100%)"; 
 
  console.log(h1.textContent)
     
   
   
   
       
    find(h1.textContent)   
all_detail.style.display = 'block'  
discover_dtl.style.display = 'none'  
failed_dtl.style.display = 'none'  

load.style.display = "flex"  
 
 srchInput.value = ""
 
  setTimeout(() =>{
    
  load.style.display = "none"  
    
    
    
  },3000)  
  

       
    //  srchInput.value = h1.textContent;
      });
    });
    
    
    
    
    
    srchInput.addEventListener('keyup', () => {
      let searchValue = srchInput.value.toLowerCase();
      let allCards = document.querySelectorAll('.place-card');

      allCards.forEach(card => {
        let cityName = card.querySelector('h1').textContent.toLowerCase();
        if (cityName.includes(searchValue)) {
          card.style.display = 'flex'; // Show matching card
        } else {
          card.style.display = 'none'; // Hide non-matching card

        }





      });
    });

  });











}

fetchCity()









