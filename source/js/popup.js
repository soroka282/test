const City = {
    'nord-park': 'Северный парк',
    'renesans': 'Ренесанс',
    'station': 'Станция Столичная',
    'compas-city': 'Компасс сити',
    'summer': 'Лето',
    'brooklen': 'Бруклин',
    'garden': 'Сказочный сад',
    'monblan': 'Монблан',
    'color': 'Краски',
  }

  const canvas = document.querySelector('.canvas');
  const itemHouses = document.querySelectorAll('.houses__item');
  const popup = document.querySelector('.popup__wrap');

  const popupTitle = document.querySelector('.popup__title');

  itemHouses.forEach((itemHouse) => {


    itemHouse.addEventListener('click', (evt) => {
      evt.preventDefault();

      for (let key in City) {
        if (key === evt.target.dataset.house) {
          popupTitle.textContent = City[key];
        }
      }

      popup.classList.add('popupAnimation');
      canvas.classList.remove('visually-hidden');

    });

    itemHouse.addEventListener('blur', (evt) => {
      evt.preventDefault();
      popup.classList.remove('popupAnimation');
      canvas.classList.add('visually-hidden');

    });
  });
