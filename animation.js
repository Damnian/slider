window.addEventListener('load', function(){
/*1. Na pewno potrzebujesz narzędzia do znalezienia listy wszystkich sliderów w
dokumencie (łatwo wyobrazić sobie jako funkcję przyjmującą dokument jako argument)
*/
// później zrobić querySelectorAll, tymczasowo na jednym
  function getSlider(baseElement) {
    return baseElement.querySelector('.image-slider');
  }
  function getImagesContainer(baseElement) {
    return baseElement.querySelector('.images-container');
  }
/*
2. Potrzebujesz narzędzia do zbudowania interfejsu (to byłaby funkcja przyjmująca
slider jako argument, i wykorzystując mniejsze funkcje generujące poszczególe elementy,
wzbogacała slider o elementy interfejsu).
*/
  function createSliderInterface(baseElement, elem2, elem3 ) {
    const circlesContainer = createCircleContainer(baseElement, elem2);
    createCircles(circlesContainer, elem3);
    createSliderLeftBtn(baseElement, elem2);
    createSliderRightBtn(baseElement, elem2);
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
    selector.appendChild(sliderLeftBtn).classList.add('images-container__btn', 'images-container__btn--left');
    return sliderLeftBtn;
  }
// funkcja pobierająca leftBtn
  function getLeftBtn(baseElement) {
    return baseElement.querySelector('.images-container__btn--left');
  }
// 2d. - funkcja generująca element rightBtn
  function createSliderRightBtn(baseElement, selector) {
    const sliderRightBtn = baseElement.createElement('button');
    selector.appendChild(sliderRightBtn).classList.add('images-container__btn', 'images-container__btn--right');
    return sliderRightBtn;
  }
// funkcja pobierająca rightBtn
  function getRightBtn(baseElement) {
    return baseElement.querySelector('.images-container__btn--right');
  }

//-------------------------------------------------------------------------------

/*
3. Potem potrzebujesz narzędzia do znalezienia wszystkich obrazków w sliderze
(funkcja przyjmująca pojedynczy slider jako argument).
*/
  function getImages(baseElement) {
    return baseElement.querySelectorAll('.images-container__image');
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
  function changeImage(elem1, elem2) {
    const image = elem1.querySelector('.images-container__image.active'),
          circle = elem2.querySelector('.circle.active');
    if (image.nextElementSibling == null) {
      elem1.lastElementChild.classList.remove('active');
      elem1.firstElementChild.classList.add('active');
      elem2.lastElementChild.classList.remove('active');
      elem2.firstElementChild.classList.add('active');
    }
    if (image.classList.contains('active')) {
      image.classList.remove('active');
      image.nextElementSibling.classList.add('active');
      circle.classList.remove('active');
      circle.nextElementSibling.classList.add('active');
    }
    return;
  }


//-------------------------------------------------------------------------------

/*
6. Funkcja następne zdjęcie dla rightBtn
*/
  function rightClick() {
    // window.clearInterval(interval);
    changeImage(imagesContainer, circlesContainer);
    // interval = window.setInterval(changeImage, timeInterval, imagesContainer, circlesContainer);
    return;
  }
//-------------------------------------------------------------------------------

/*
7. Funkcja poprzednie zdjęcie dla leftBtn
*/
  function leftClick(elem1, elem2) {
    // window.clearInterval(interval);

    const image = elem1.querySelector('.images-container__image.active'),
          circle = elem2.querySelector('.circle.active');

    if (image.previousElementSibling == null) {
      elem1.firstElementChild.classList.remove('active');
      elem1.lastElementChild.classList.add('active');
      elem2.firstElementChild.classList.remove('active');
      elem2.lastElementChild.classList.add('active');
    }
    if (image.classList.contains('active')) {
      image.classList.remove('active');
      image.previousElementSibling.classList.add('active');
      circle.classList.remove('active');
      circle.previousElementSibling.classList.add('active');
    }

    // interval = window.setInterval(changeImage, timeInterval, imagesContainer, circlesContainer);
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
        interval = window.setInterval(changeImage, timeInterval, imagesContainer, circlesContainer);
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
    return;
  }

// *****************************************************************************
// wywoływanie funkcji
  const slider = getSlider(document),
        imagesContainer = getImagesContainer(slider),
        images = getImages(imagesContainer),
        timeInterval = slider.getAttribute('data-timer');

  createSliderInterface(document, slider, images);

  const sliderRightBtn = getRightBtn(slider),
        sliderLeftBtn = getLeftBtn(slider),
        circlesContainer = getCirclesContainer(slider),
        circles = getCircles(circlesContainer);

  let interval = window.setInterval(changeImage, timeInterval, imagesContainer, circlesContainer);

  sliderRightBtn.addEventListener('click', function() {
    window.clearInterval(interval);
    rightClick();
    interval = window.setInterval(changeImage, timeInterval, imagesContainer, circlesContainer);
  }, false);

  sliderLeftBtn.addEventListener('click', function() {
    window.clearInterval(interval);
    leftClick(imagesContainer, circlesContainer)
    interval = window.setInterval(changeImage, timeInterval, imagesContainer, circlesContainer);
  }, false);

  circleClick(circlesContainer, images, circles);

  matchSlider(images, imagesContainer);
  window.addEventListener('resize', function() { matchSlider(images, imagesContainer) }, false);

}, false);
