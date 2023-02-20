
const app= document.querySelector('.weather-app');
const temp= document.querySelector('.temp');
const dateop = document.querySelector('.date');
const dayop =document.querySelector('.day');
const conditionop = document.querySelector('.condition');
const cloud= document.querySelector('.cloud');
const humid = document.querySelector('.humidity');
const wind= document.querySelector('.wind');
const form=document.querySelector('#locip');
const search= document.querySelector('.search');
const locname=document.querySelector('.name');
const submit = document.querySelector('.submit');


//adding submit event to the form

form.addEventListener('submit',(e)=>{
    if(search.value.length==0){
        alert('Please eneter city first !');
    }
    else{
        cityInput =search.value;
        //fetch weather data from API
        fetchWeatherData();
        search.value="";
        //app.style.opacity = "0";
    }

    e.preventDefault();
});

//function to return day of the week from date
function dayOfTheWeek(day, month,year){
    const weekday = ["sunday", "Monday", "Tuesday", "Thursday","Friday", "Saturday"];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

//function to fetch data from API
function fetchWeatherData(){
    fetch(`http://api.weatherstack.com/current?access_key=560196431d0724490a46978d9a2eedde&query=${cityInput}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);

        temp.innerHTML =data.current.temperature + "&#176"; 
        conditionop.innerHTML = data.current.weather_descriptions[0];
        const date = data.location.localtime;
        const y= parseInt(date.substr(0,4));
        const m= parseInt(date.substr(5,2));
        const d=parseInt(date.substr(8,2));

        dateop.innerHTML= `${d}, ${m}  ${y}`;
        // dayop.innerHTML = `${dayOfTheWeek(d,m,y)}`;

        locname.innerHTML = data.location.name;

        cloud.innerHTML = data.current.cloudcover + "%";
        humid.innerHTML =data.current.humidity + "%";
        wind.innerHTML =data.current.wind_speed +"km/h";

        let timeOfDay ="day";

        const code= data.current.weather_descriptions[0];

        if(!data.current.is_day){
            timeOfDay="night";
        }


        //to cahnge the background as per the weather and day/night timings
        if(timeOfDay=="day"){
            if( code.includes("Sunny")){
                app.style.backgroundImage = `url(./images/day/clear.jpg)`;
            }
            else if(code.includes("Rainy")){
                app.style.backgroundImage = `url(./images/day/rainy.jpg)`;
            }
            else if(code.includes("Haze")){
                app.style.backgroundImage = `url(./images/day/snowy.jpg)`;
            }
            else if(code.includes("cloudy")){
                app.style.backgroundImage = `url(./images/day/cloudy.jpg)`
            }
        }
        else if(timeOfDay=="night"){
            if( code.includes("Sunny")){
                app.style.backgroundImage = `url(./images/night/clear-night.jpg)`;
                submit.style.background = "#181e27";
            }
            else if(code.includes("Rainy")){
                app.style.backgroundImage = `url(./images/night/rainy-night.jpg)`;
                submit.style.background = "#181e27";
            }
            else if(code.includes("Haze")){
                app.style.backgroundImage = `url(./images/night/snowy-night.jpg)`;
                submit.style.background = "#181e27";
            }
            else if(code.includes("cloudy")){
                app.style.backgroundImage = `url(./images/night/cloudy-night.jpg)`;
                submit.style.background = "#181e27";
            }
        }
       
    });

    


}
