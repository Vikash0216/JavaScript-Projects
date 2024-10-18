const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchbox = document.querySelector(".searchbox input" );
const searchbtn = document.querySelector(".searchbox button" );
const input = document.getElementById("search");

const key = "c44e161b63c5d17851045461df9df905";
const temp = document.querySelector(".temp");
const cityname = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon= document.querySelector(".weather-icon");
const weatherbox = document.querySelector(".weatherbox");
const err = document.querySelector(".errortext");

async function checkweather(city) {
    const response = await fetch(url + city + `&appid=${key}`);
    if(response.status == 404){
        err.style.display = "block";
        weatherbox.style.visibility="hidden";
    } else{
        var data = await response.json();
    temp.innerHTML=Math.round(data.main.temp)+"°c";
    cityname.innerHTML=data.name + ` (${data.sys.country})`;
    humidity.innerHTML= data.main.humidity + "%";
    wind.innerHTML=data.wind.speed + " km/h" ;
    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/cloud.png";
    }
    
    else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    
    else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    
    else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    
    else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "images/cloud.png";
    }
    else if (data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
    }

    weatherbox.style.visibility="visible";
    err.style.display = "none";
    
    console.log(data);
    
    }
    
}

searchbtn.addEventListener("click",()=>{
    checkweather(searchbox.value);
})

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchbtn.click();
    }
  });
