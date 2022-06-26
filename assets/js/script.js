// Ottiene la posizione corrente dell'utente
window.navigator.geolocation.getCurrentPosition(ifAllowed, ifDisabled);

// Selezionatori del dom
const weatherIcon = document.querySelector('.icon');
const weatherLocation = document.querySelector('.location');
const weatherTemperature = document.querySelector('.temperature');

// Funzione eseguita in caso di Geolocalizzazione disattivata
function ifDisabled(error) {
  weatherLocation.innerHTML = `<strong>Errore</strong>:<br> Geolocalizzazione disattivata, o non rilevata.<br> Riprovare.`;
  console.log(error);
}

// Funzione da eseguire in caso di Geolocalizzazione attivata
function ifAllowed(position) {
  console.log(position);

  // Dati API
  const apiKey = '36abad04603f9bf4452b0860ff89034b';
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const units = 'metric';
  const language = 'it';
  const link = 'https://api.openweathermap.org/data/2.5/weather';
  const apiCallUrl = `${link}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;


  // Chiamata API

  fetch(apiCallUrl)
  .then(function (response) {
    const data = response.json();
    return data;
  })
  .then(function (data) {
    //console.log(data);

      // Inserimento nel dom dei dati ottenuti
      weatherLocation.innerText = data.name;
      weatherTemperature.innerText = `${data.main.temp}° C`;
      weatherIcon.src = `assets/img/${data.weather[0].icon}.png`;

    })
    // Gestione in caso di errore durante la chiamata
    .catch(function (err) {
      console.log(err);
      weatherTemperature.innerText = 'Errore. Riprovare più tardi.';
    }
    );
}