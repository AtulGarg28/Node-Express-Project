const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real_value = document.getElementById("temp_real_value");
const tempStatus = document.getElementById("tempStatus");
const data_hide = document.querySelector(".temp_layer");


const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Give a city name first.`;
        data_hide.classList.add("data_hide");
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=1e91e2a2e0761eee9f5c633e3cb4327d`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = await [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_value.innerText = (arrData[0].main.temp-273.15).toFixed(2);
            console.log(arrData);

            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear" || tempMood == "Sunny"){
                tempStatus.innerHTML = `<i class="fa fa-sun" style="color: #eccc68;"></i>`
            }
            else if(tempMood == "Clouds"){
                tempStatus.innerHTML = `<i class="fa fa-cloud"></i>`
            }
            else if(tempMood == "Rain"){
                tempStatus.innerHTML = `<i class="fa fa-rain" style="color: #a4b0be;"></i>`
            }
            else{
                tempStatus.innerHTML = `<i class="fa fa-sun" style="color: #eccc68;"></i>`
            }
            data_hide.classList.remove("data_hide");
        }
        catch{
            city_name.innerText = `Pls enter a valid city name.`;
            data_hide.classList.add("data_hide");
        }
        
    }
};
submitBtn.addEventListener("click",getInfo);