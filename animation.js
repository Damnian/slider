/*1. Na pewno potrzebujesz narzędzia do znalezienia listy wszystkich sliderów w
dokumencie (łatwo wyobrazić sobie jako funkcję przyjmującą dokument jako argument)
*/
// później zrobić querySelectorAll, tymczasowo na jednym
function getSlider(baseElement) {
  return baseElement.querySelector('.slider-container');
}
// I gdzieś indziej:
// const slider = getSlider(document);
/* Ogólnie nie rozumiem tej intencji, bo dlaczego pisać 4 linijki kodu, jak można od razu:
 const slider = document.querySelector('.slider-container');
 i koniec. Chyba, że chodzi o to, by fragment:
 const slider = getSlider(document);
 móc używać wiele razy jako zmienną lokalną w wielu innych funkcjach
*/

//-------------------------------------------------------------------------------

/*
2. Potrzebujesz narzędzia do zbudowania interfejsu (to byłaby funkcja przyjmująca
slider jako argument, i wykorzystując mniejsze funkcje generujące poszczególe elementy,
wzbogacała slider o elementy interfejsu).
*/
function createSliderInterface(baseElement) {
 const circlesContainer = createCircleContainer(document);
 baseElement.appendChild(circlesContainer).classList.add('circles-container');
 console.log(circlesContainer);
 const images = getImages(getSlider(document));
 createCircles(circlesContainer, images);
}
createSliderInterface(getSlider(document));
// 2a. - funkcja generująca element circle-container
function createCircleContainer(baseElement, selector) {
  const circlesContainer = baseElement.createElement('div');
  return circlesContainer;
}
// 2b. - funkcja generująca element circle
function createCircles(baseElement, imgList) {
  for (var i = 0; i < imgList.length; i++) {
    const circle = document.createElement('button');
    baseElement.appendChild(circle).classList.add('circle');
  }
  return;
}
// 2c. - funkcja generująca elementy leftBtn
function createSliderLeftBtn() {

}
// 2d. - funkcja generująca elementy rightBtn
function createSliderRightBtn() {

}

//-------------------------------------------------------------------------------

/*
3. Potem potrzebujesz narzędzia do znalezienia wszystkich obrazków w sliderze
(funkcja przyjmująca pojedynczy slider jako argument).
*/
function getImages(baseElement) {
  return baseElement.querySelectorAll('.slider-container__photo');
}

//-------------------------------------------------------------------------------

/*
4. Jako że docelowo zmieniać się ma też podświetlenie kółek na dole, to może
warto też mieć narzędzie do wyciągania listy kółek ze slidera.
*/
function getCircles(baseElement) {
  return baseElement.querySelectorAll('.circle');
}
