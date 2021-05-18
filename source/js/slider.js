import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const sliderSquare = document.querySelector('.filter__slider-square');
const sliderCost = document.querySelector('.filter__slider-cost');

const inputSquareBefore = document.querySelector('#square-before');
const inputSquareAfter = document.querySelector('#square-after');
const inputCostBefore = document.querySelector('#cost-before');
const inputCostAfter = document.querySelector('#cost-after');

const inputsSquare = [inputSquareBefore, inputSquareAfter];
const inputsCost = [inputCostBefore, inputCostAfter];

const getLinkData = (slider, inputs) => {
  slider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
  });

  inputs.forEach(function (input, handle) {

    input.addEventListener('change', function () {
      slider.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function (e) {

        const values = slider.noUiSlider.get();
        const value = Number(values[handle]);

        const steps = sliderSquare.noUiSlider.steps();

        const step = steps[handle];

        let position;

        switch (e.which) {

            case 13:
              slider.noUiSlider.setHandle(handle, this.value);
                break;

            case 38:

                position = step[1];

                if (position === false) {
                    position = 1;
                }

                if (position !== null) {
                  slider.noUiSlider.setHandle(handle, value + position);
                }

                break;

            case 40:

                position = step[0];

                if (position === false) {
                    position = 1;
                }

                if (position !== null) {
                  slider.noUiSlider.setHandle(handle, value - position);
                }

                break;
        }
    });
  });
}

noUiSlider.create(sliderSquare, {
    start: [32, 186],
    connect: true,
    step: 1,
    range: {
        'min': 0,
        'max': 200
    },
    format: {
      to: function (value) {
      return value + '';
      },
      from: function (value) {
      return Number(value);
  }
}
});

getLinkData(sliderSquare, inputsSquare);


noUiSlider.create(sliderCost, {
  start: [1.5, 17.5],
  connect: true,
  range: {
      'min': 0,
      'max': 30
  }
});

getLinkData(sliderCost, inputsCost);
