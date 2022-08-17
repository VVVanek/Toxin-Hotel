const dropdown = document.querySelector('.dropdown'),
   dropdownInput = dropdown.querySelector('.dropdown__input'),
   dropdownContent = dropdown.querySelector('.dropdown__content'),
   dropdownCaret = dropdown.querySelector('.dropdown__caret'),
   dropdownContentMenu = dropdown.querySelector('.dropdown__menu'),
   dropdownBtnClear = dropdown.querySelector('.dropdown__button-clear'),
   dropdownMenuItem = dropdownContentMenu.querySelectorAll('.dropdown__menu-item'),
   dropdownCounterBtns = dropdownContentMenu.querySelectorAll('.dropdown__counter-btn'),
   dropdownInputCounters = document.querySelectorAll('.dropdown__counter-count');


function dropdownToggleContent() {
   dropdownInput.addEventListener('click', () => {
      dropdownInput.classList.toggle('dropdown_input-focus');
      dropdownInput.classList.toggle('content-open');
      dropdownContent.classList.toggle('hidden');
      dropdownCaret.classList.toggle('dropdown_caret-rotate');
   });
}


dropdownCounterBtns.forEach(btn => {
   btn.addEventListener('click', function () {
      const direction = this.dataset.direction;
      const inputCounter = this.parentElement.querySelector('.dropdown__counter-count');
      const currentValue = +inputCounter.value;
      let newValue;
      const dropdownInputGuestsValues = ["Сколько гостей", "Гостей", "Гостя", "Гость"];
      const dropdownInputBabysValues = ["Младенцев", "Младенца", "Младенец"];

      const btnMinus = this.parentElement.querySelector('.dropdown__counter-btn-minus');

      if (direction === 'plus') {
         newValue = currentValue + 1;
         newValue > 99 ? newValue = currentValue : '';
         btnMinus.classList.add('btnActive');
      } else {
         newValue = (currentValue - 1) > 0 ? currentValue - 1 : 0;
      }

      inputCounter.value = newValue;
      inputSum = +dropdownInputCounters[0].value + +dropdownInputCounters[1].value;

      function checkInputSum() {
         if (inputSum == 0) {
            dropdownInput.value = dropdownInputGuestsValues[0];
            btnMinus.classList.remove('btnActive');
         } else if (inputSum % 10 == 1 && inputSum != 11) {
            dropdownInput.value = `${inputSum} ${dropdownInputGuestsValues[3]}`;
         } else if (inputSum >= 10 && inputSum <= 20) {
            dropdownInput.value = `${inputSum} ${dropdownInputGuestsValues[1]}`;
         } else if (inputSum % 10 == 2 || inputSum % 10 == 3 || inputSum % 10 == 4) {
            dropdownInput.value = `${inputSum} ${dropdownInputGuestsValues[2]}`;
         } else {
            dropdownInput.value = `${inputSum} ${dropdownInputGuestsValues[1]}`;
         }
      }

      checkInputSum();

      if (+dropdownInputCounters[2].value == 1) {
         inputSum++;
         checkInputSum();
         dropdownInput.value += `, ${+dropdownInputCounters[2].value} ${dropdownInputBabysValues[2]}`;
      } else if (+dropdownInputCounters[2].value % 10 == 1 && +dropdownInputCounters[2].value != 11) {
         inputSum += +dropdownInputCounters[2].value;
         checkInputSum();
         dropdownInput.value += `, ${+dropdownInputCounters[2].value} ${dropdownInputBabysValues[2]}`;
      } else if (+dropdownInputCounters[2].value >= 10 && +dropdownInputCounters[2].value <= 20) {
         inputSum += +dropdownInputCounters[2].value;
         checkInputSum();
         dropdownInput.value += `, ${+dropdownInputCounters[2].value} ${dropdownInputBabysValues[0]}`;
      } else if (+dropdownInputCounters[2].value % 10 == 2 || +dropdownInputCounters[2].value % 10 == 3 || +dropdownInputCounters[2].value % 10 == 4) {
         inputSum += +dropdownInputCounters[2].value;
         checkInputSum();
         dropdownInput.value += `, ${+dropdownInputCounters[2].value} ${dropdownInputBabysValues[1]}`;
      } else if (+dropdownInputCounters[2].value != 0) {
         inputSum += +dropdownInputCounters[2].value;
         checkInputSum();
         dropdownInput.value += `, ${+dropdownInputCounters[2].value} ${dropdownInputBabysValues[0]}`;
      }


      function toggleDropdownClearBtn() {
         if (dropdownInput.value != "Сколько гостей") {
            dropdownBtnClear.classList.remove('hidden');
         } else {
            dropdownBtnClear.classList.add('hidden');
         }
      }

      toggleDropdownClearBtn();


      dropdownBtnClear.addEventListener('click', () => {
         dropdownInput.value = "Сколько гостей";
         btnMinus.classList.remove('btnActive');
         inputCounter.value = 0;
         toggleDropdownClearBtn();
      });


   });
});

dropdownToggleContent();
