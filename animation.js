window.addEventListener('load', function(){
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
  function createSliderInterface() {
    createSliderLeftBtn(document, slider);
    createSliderRightBtn(document, slider);
    const circlesContainer = createCircleContainer(document, slider);
    createCircles(circlesContainer, images);
    return;
  }
// 2a. - funkcja generująca element circle-container
  function createCircleContainer(baseElement, selector) {
    const circlesContainer = baseElement.createElement('div');
    selector.appendChild(circlesContainer).classList.add('circles-container');
    return circlesContainer;
  }
// 2b. - funkcja generująca elementy circle
  function createCircles(baseElement, imgList) {
    for (var i = 0; i < imgList.length; i++) {
      const circle = document.createElement('button');
      baseElement.appendChild(circle).classList.add('circle');
    }
    return;
  }
// 2c. - funkcja generująca element leftBtn
  function createSliderLeftBtn(baseElement, selector) {
    const sliderLeftBtn = baseElement.createElement('button');
    selector.appendChild(sliderLeftBtn).classList.add('slider-container__btn', 'slider-container__btn--left');
    return sliderLeftBtn;
  }
// funkcja pobierająca leftBtn
  function getLeftBtn(baseElement) {
    return baseElement.querySelector('.slider-container__btn--left');
  }
// 2d. - funkcja generująca element rightBtn
  function createSliderRightBtn(baseElement, selector) {
    const sliderRightBtn = baseElement.createElement('button');
    selector.appendChild(sliderRightBtn).classList.add('slider-container__btn', 'slider-container__btn--right');
    return sliderRightBtn;
  }
// funkcja pobierająca rightBtn
  function getRightBtn(baseElement) {
    return baseElement.querySelector('.slider-container__btn--right');
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
  function getCirclesContainer(baseElement) {
    return baseElement.querySelector('.circles-container');
  }
  function getCircles(baseElement) {
    const circles = baseElement.querySelectorAll('.circle');
    circles[0].classList.add('active');
    return circles;
  }

//-------------------------------------------------------------------------------

/*
5. Funkcja do automatycznej zmiany zdjęć
*/
  let currentNumber = 0;

  function changeImage(elem1, elem2) {
    currentNumber = currentNumber + 1;
    if (currentNumber == elem1.length) {
      currentNumber = 0;
    }
    for (var i = 0; i < elem1.length; i++) {
      elem1[i].classList.remove('active');
      elem1[currentNumber].classList.add('active');
      elem2[i].classList.remove('active');
      elem2[currentNumber].classList.add('active');
    }
    return;
  }


//-------------------------------------------------------------------------------

/*
6. Funkcja następne zdjęcie dla rightBtn
*/
  function rightClick() {
    window.clearInterval(interval);
    changeImage(images, circles);
    interval = window.setInterval(changeImage, timeInterval, images, circles);
  }
//-------------------------------------------------------------------------------

/*
7. Funkcja poprzednie zdjęcie dla leftBtn
*/
  function leftClick(elem1, elem2) {
    window.clearInterval(interval);
    currentNumber = currentNumber - 1;
    if (currentNumber < 0) {
      currentNumber = elem1.length - 1;
    }
    for (var i = 0; i < elem1.length; i++) {
      elem1[i].classList.remove('active');
      elem1[currentNumber].classList.add('active');
      elem2[i].classList.remove('active');
      elem2[currentNumber].classList.add('active');
    }
    interval = window.setInterval(changeImage, timeInterval, images, circles);
    return;
  }

//-------------------------------------------------------------------------------

/*
8. Funkcja zmiany zdjęć po kliknięciu odpowiedniego circle
*/
  function circleClick(circlesContainer, elem1, elem2) {
    circlesContainer.addEventListener('click', function(ev) {

      if (ev.target.nodeName === 'BUTTON') {
        let circlesArray = Array.from(elem2);
        currentNumber = circlesArray.indexOf(ev.target);
        window.clearInterval(interval);

        for (var i = 0; i < elem1.length; i ++) {
          images[i].classList.remove('active');
          images[currentNumber].classList.add('active');

          elem2[i].classList.remove('active');
          elem2[currentNumber].classList.add('active');
        }
        interval = window.setInterval(changeImage, timeInterval, images, circles);
      }
    return;
    }, false);
    return;
  }
/*
9. Funkcja dopasowująca rozmiary slidera
*/
  function matchSlider(elem1, elem2) {
    let heightArray = [];
    for (var i = 0; i < elem1.length; i++) {
      var sliderPhotoHeight = elem1[i].offsetHeight;
      heightArray.push(sliderPhotoHeight);
    }
    function sortNumber(a, b) {
      return a - b;
    }
    heightArray.sort(sortNumber);

    let smallestPhotoHeight = heightArray[0] + 'px';
    elem2.style.height = smallestPhotoHeight;
  }

// *****************************************************************************
// ustawienie czasu dla slidera
  const timeInterval = 3500;

// *****************************************************************************
// wywoływanie funkcji
  const slider = getSlider(document),
        images = getImages(slider);

  createSliderInterface();

  const sliderRightBtn = getRightBtn(slider),
        sliderLeftBtn = getLeftBtn(slider),
        circlesContainer = getCirclesContainer(slider),
        circles = getCircles(circlesContainer);

  let interval = window.setInterval(changeImage, timeInterval, images, circles);

  sliderRightBtn.addEventListener('click', rightClick, false);
  sliderLeftBtn.addEventListener('click', function() {leftClick(images, circles)}, false);

  circleClick(circlesContainer, images, circles);

  matchSlider(images, slider);
  window.addEventListener('resize', function() { matchSlider(images, slider) }, false);

}, false);