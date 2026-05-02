const GOElement=document.querySelector('.js-search-btn')
const inputElement=document.querySelector('.js-city-input')
const errorAlert=document.querySelector('.js-alert')
const weatherCard=document.querySelector('.js-weather-card')

const apiKey=`2d9215fab54afdad838eb6ee0f7af02d`
// const someOneApikey=`12818dd6e2ae63980dc20793e1a6b94f`
GOElement.addEventListener('click',()=>{

 const city=inputElement.value.trim()
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then((response)=>{
    if (!response.ok) {
      throw new Error('City not found')
    }
    return response.json()
  })
  .then((data)=>{
const card=
   ` 
    <div class="card-top">
        <div class="city-name js-city-name">${data.name}</div>
        <div class="country js-country">${data.sys.country}</div>
      </div>

      <div class="temp-row">
        <div class="temp js-temp">${data.main.temp.toFixed(1)}</div>
        <div class="unit">°C</div>
      </div>

      <div class="description js-description">${data.weather[0].description}</div>

      <div class="stats">
        <div class="stat">
          <div class="stat-label">Feels Like</div>
          <div class="stat-value js-feels-like">${data.main.feels_like.toFixed(1)}°C</div>
        </div>
        <div class="stat">
          <div class="stat-label">Humidity</div>
          <div class="stat-value js-humidity">${data.main.humidity}%</div>
        </div>
        <div class="stat">
          <div class="stat-label">Wind</div>
          <div class="stat-value js-wind">${data.wind.speed} km/h</div>
        </div>
      </div>
      `
weatherCard.innerHTML=card
      errorAlert.classList.add('hidden')
   weatherCard.style.display='block'
   document.querySelector('.js-city-input').value=''
  })
  .catch((error)=>{
     weatherCard.style.display='none'
    errorAlert.classList.remove('hidden')
    errorAlert.textContent=error.message
  })
})

