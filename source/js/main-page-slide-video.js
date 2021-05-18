const LEFT_TEXT_NEXT = -680;
const LEFT_TEXT_BACK = 0;

const nextButton = document.querySelector('.info__button-next');
const backButton = document.querySelector('.info__button-back');
const videoBg1 = document.querySelector('#bgvideo1');
const textInfo = document.querySelectorAll('.info__text');

nextButton.classList.add('info__button--active');

nextButton.addEventListener('click', () => {

  if (!nextButton.classList.contains('info__button--active')) {

    textInfo.forEach((i) => {
      i.style.left = LEFT_TEXT_NEXT + 'px';
    });

    nextButton.classList.add('info__button--active');
    backButton.classList.remove('info__button--active');


    videoBg1.classList.add('bg-animation');
    videoBg1.classList.remove('bg-animation-reverse');
  }
});

backButton.addEventListener('click', () => {

  textInfo.forEach((i) => {
    i.style.left = LEFT_TEXT_BACK + 'px';
  });

  backButton.classList.add('info__button--active');
  nextButton.classList.remove('info__button--active');


  videoBg1.classList.remove('bg-animation');
  videoBg1.classList.add('bg-animation-reverse');

});
