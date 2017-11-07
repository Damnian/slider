/* 
zamysł: slider, który dopasowuje się wysokością do najniższego obrazka
i skaluje przy zmianie szerokości okna.

*/


// tworzę zmienne globalne pobierając elementy slidera
const sliderContainer = document.querySelector('.slider-container');
const images = sliderContainer.querySelectorAll('.slider-container__photo');
const rightBtn = sliderContainer.querySelector('.slider-container__btn--right');
const leftBtn = sliderContainer.querySelector('.slider-container__btn--left');
// ustawiam interwał - czas, po którym zmieni się zdjęcie
const timerInterval = 3500;

// i tu mi się zaburza porządek działania / estetyka / brakuje mi kolejności, ale
// "tak musi być, żeby działało", bo nie wiem jak to "ładniej" ułożyć ;)

// ustawiam początkową wartość / zmienną dla funkcji changeOpacity, createCircle, circleClick
let currentNumber = 0;

// wywołuję funkcję createCircle, żeby utworzyła tyle circle-buttonów ile
// jest zdjęć upakowanych w sliderze
createCircle();

// pobieram wszystkie circle, bo potrzebne są do funkcji changeOpacity, circleClick
const circles = document.querySelectorAll('.circle');

// ustawiam pierwszemu zdjęciu i circlowi klasę (klasą nadaję opacity)
images[currentNumber].classList.add('active');
circles[currentNumber].classList.add('active');

// uruchamiam interwał z funkcją zmieniającą zdjęcia automatycznie
var timer = window.setInterval(changeOpacity, timerInterval);
// przypisuję buttonom funkcję
rightBtn.addEventListener('click', rightClick, false);
leftBtn.addEventListener('click', leftClick, false);

/* funkcja zmieniająca automatycznie zdjęcia
wyżej ustawiałem currentNumber na 0 i z tego wychodzę
tutaj zmieniam currentNumber po kolei, a jak osiągnie odpowiednią długość,
to ustawi znowu na 0. wszystkim zdjęciom i circle usuwam klasę avtive (która
nadaje opacity), a aktualnemu numerowi nadaję tę klasę
*/
function changeOpacity() {
  currentNumber = currentNumber + 1;
  if (currentNumber == images.length) {
    currentNumber = 0;
  }
  for (var i = 0; i < images.length; i ++) {
    images[i].classList.remove('active');
    images[currentNumber].classList.add('active');

    circles[i].classList.remove('active');
    circles[currentNumber].classList.add('active');
  }
}

// CREATE CIRCLE BUTTONS //
/*
tworzę diva i wrzucam go do slidera, nadaję mu klasę
dla każdego obrazka tworzę button, dołączam do w/w diva i nadaję klasę
na koniec wywołuję funkcję circleClick ale nie jestem przekonany, czy to dobrze,
że znajduje się ona w tym miejscu. Chciałbym albo powinienem ją wywołać zupełnie
oddzielnie, musiałbym przekazać lokalną zmienną circleContainer do drugiej funkcji.
Albo drugi raz zadeklarować zmienną lokalną circleContainer (tzn w funkcji circleClick).
Właściwie nie wiem jak to zrobić poprawnie
*/
function createCircle() {
  const circlesContainer = document.createElement('div');
  sliderContainer.appendChild(circlesContainer).classList.add('circles-container');
  for (var i = 0; i < images.length; i++) {
    const circle = document.createElement('button');
    circlesContainer.appendChild(circle).classList.add('circle');
  }
  circleClick(circlesContainer);
}

// CIRCLE CLICK //
/*
funkcja, dzięki której po kliknięciu circle zmienimy na zdjęcie mu odpowiadające.
Robię event delegation na container z circlami
Mam node list z buttonami
Jeśli kliknę noda BUTTON to robię z node list zwykłą tablicę
currentNumber przypisuję index klikniętego buttona
Przy kliknięciu czyszczę interval (żeby odstęp czasowy był równy)
Nadaję / usuwam klasę active jak w funkcji changeOpacity
Ustawiam od nowa interval (żeby odstęp czasowy był równy)
*/
function circleClick(circlesContainer) {
  circlesContainer.addEventListener('click', function(ev) {

    if (ev.target.nodeName === 'BUTTON') {
      let circlesArray = Array.from(circles);
      currentNumber = circlesArray.indexOf(ev.target);
      window.clearInterval(timer);

      for (var i = 0; i < images.length; i ++) {
        images[i].classList.remove('active');
        images[currentNumber].classList.add('active');

        circles[i].classList.remove('active');
        circles[currentNumber].classList.add('active');
      }
      timer = window.setInterval(changeOpacity, timerInterval);
    }
  }, false);
}

// RIGHT BUTTON //
// no tutaj to wiadomo
function rightClick() {
  window.clearInterval(timer);
  changeOpacity();
  timer = window.setInterval(changeOpacity, timerInterval);
}

// LEFT BUTTON //
// to samo co rightClick, tylko currenNumber trzeba zmniejszać
function leftClick() {
  window.clearInterval(timer);
  currentNumber = currentNumber - 1;
  if (currentNumber < 0) {
    currentNumber = images.length - 1;
  }
  for (var i = 0; i < images.length; i++) {
      images[i].classList.remove('active');
      images[currentNumber].classList.add('active');

      circles[i].classList.remove('active');
      circles[currentNumber].classList.add('active');
  }
  timer = window.setInterval(changeOpacity, timerInterval);
}

// SLIDER CONTAINER //
/*
Ta funkcja ma za zadanie dopasować wysokość slidera do najniższego zdjęcia,
które jest w nim zawarte
Deklaruję pustą tablicę
Dla każdego obrazka pobieram jego wysokość
Umieszczam wysokości w tablicy
Sortuję tablicę, dzięki czemu najmniejsza wysokość jest na 1 pozycji
Pobieram index 0, czyli 1 pozycję z tabeli, czyli najmniejszą wysokość
Nadaję sliderContainer wysokość najmniejszego zdjęcia
*/
function matchSlider() {
  let heightArray = [];
  for (var i = 0; i < images.length; i++) {
    var sliderPhotoHeight = images[i].offsetHeight;
    heightArray.push(sliderPhotoHeight);
  }
  heightArray.sort();
  let smallestPhotoHeight = heightArray[0] + 'px';
  sliderContainer.style.height = smallestPhotoHeight;
}
//wywołuję w/w funkcję po załadowaniu okna, bo mogą być błędy wyświetlania
window.addEventListener("load", matchSlider, false);
//wywołuję w/w funkcję przy zmniejszaniu okna (nie wiem czy nie potrzebny
//tu jest throttle / debounce)
window.addEventListener('resize', matchSlider, false);

