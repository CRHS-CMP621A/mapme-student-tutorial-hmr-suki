'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
console.log(form)
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

class Workout{
  date = new Date();
  id =(Date.now()+'').slice(-10);

  constructor(coords,distance,duration){
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout{
  constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence = cadence;
  }

}

class Cycling extends Workout{
  constructor(coords,distance,duration,elevationGain){
    super(coords,distance,duration);
    this.elevation = elevationGain;
  }

}

navigator.geolocation.getCurrentPosition(
    function (position) {
      //console.log(position);

      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      // var map = L.map("map").setView([51.505, -0.09], 13);
      const coords = [latitude, longitude];
      map = L.map("map").setView(coords, 13);
      console.log(latitude, longitude);



      map.on('click', function(mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
        






    })
    
  
      // var map = L.map("map").setView([51.505, -0.09], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
  
      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      alert("Could not get position");
    }
  );



  form.addEventListener('submit', function(e){
    e.preventDefault() ;
    const lat= mapEvent.latlng.lat;
    const lng= mapEvent.latlng.lng;

    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    let workout;
    let workouts = [];

    if (type == 'running'){
      const cadence = Number(inputCadence.value);
      workout= new Running([lat,lng],distance,duration,cadence);
    }

    if (type == 'cycling'){
      const elevation = +inputElevation.value;
      workout = new Cycling([lat,lng],distance,duration,elevation);
    }

    workouts.push(workout)

        L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth:250,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className:'running-popup',
        }))
        .setPopupContent('Workout')
        .openPopup();


        form.reset();
        

  console.log(workouts);

  })  
  
 inputType.addEventListener('change', function(){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
 })





// const run1=new Running([39.-12],5.2,24,178)
// const cycling1=new Running([39.-12],27,95,523)
// console.log(run1,cycling1)
 