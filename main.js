//date
let date = document.getElementById('date');
//wheather condition
let condition = document.getElementById('air-condition');
//logitude,latitude
let longitude = document.getElementById('log');
let latitude = document.getElementById('lat');
//temp condition 
let temp = document.getElementById('temp');
let hum = document.getElementById('humidity');
let wind = document.getElementById('wind');
//air condition
let c_mono = document.getElementById('co');
let n_mono = document.getElementById('no');
let n_dmono = document.getElementById('nod');
let ozone = document.getElementById('o3');
let sulpher = document.getElementById('su');
let ammonia = document.getElementById('nh');
//date access function
let da = new Date()
date.innerHTML = da.toDateString()

//error elements
let errorEle = document.getElementById("error")
//reuslt elements
let resultEle = document.getElementById("result")
//user fields
let input = document.getElementById('input')
let btn = document.getElementById('btn')
//api related
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const apiKey = "5ff277e049b7310341342c80a41d7167";


//wheather data fetch
async function genrateResult() {
    const responce = await fetch(apiUrl + `${input.value}` + `&appid=${apiKey}`)
    const data = await responce.json()
    console.log(data)
    if(responce.status == 404){
      errorEle.style.display = 'block'
      resultEle.style.display = 'none'
    }else if(input.value == ""){
      resultEle.style.display = 'none'
      errorEle.style.display = 'block'
    }else{
      resultEle.style.display = 'block'
      errorEle.style.display = 'none'
      const lon = data.coord.lon;
      const lat = data.coord.lat;
        //lon,lat
      longitude.innerHTML = lon;
      latitude.innerHTML = lat;
      airResult(lon, lat)
        //temp,hum,wind
      temp.innerHTML = data.main.temp;
      hum.innerHTML = data.main.humidity;
      wind.innerHTML = data.wind.speed;
    }
}

async function airResult(lon, lat) {
    const apiUrl2 = "http://api.openweathermap.org/data/2.5/air_pollution?";
    const airResponce = await fetch(`${apiUrl2}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const airData = await airResponce.json()

    console.log(airData)

    let mainCondition = { ...airData.list[0].main }
    let mainelements = { ...airData.list[0].components }

    //elements in air
    c_mono.innerHTML = mainelements.co
    n_mono.innerHTML = mainelements.no
    n_dmono.innerHTML = mainelements.no2
    ozone.innerHTML = mainelements.o3
    sulpher.innerHTML = mainelements.so2
    ammonia.innerHTML = mainelements.nh3


    if (mainCondition.aqi == 1) {
        condition.innerHTML = 'GOOD'
    } else if (mainCondition.aqi == 2) {
        condition.innerHTML = 'FAIR'
    } else if (mainCondition.aqi == 3) {
        condition.innerHTML = 'MODERATE'
    } else if (mainCondition.aqi == 4) {
        condition.innerHTML = 'POOR'
    } else if (mainCondition.aqi == 5) {
        condition.innerHTML = 'VERY POOR'
    }
}

//button elemnts onclick function
btn.addEventListener('click', () => genrateResult());




