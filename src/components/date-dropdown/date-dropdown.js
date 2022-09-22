import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const twoInputsWrapp = document.querySelector('.text-field-wrapp__date-dropdown');
let dp = new AirDatepicker(twoInputsWrapp, {
   range: true,
   nextHtml: '<span><i class="fa-sharp fa-solid fa-arrow-right"></i></span>',
   prevHtml: '<span><i class="fa-sharp fa-solid fa-arrow-left"></i></span>',
   navTitles: {
      days: 'MMMM yyyy',
   },
});


if (!dp.visible) {
   dp.$datepicker.classList.remove('-inline-');
}

function toggleDp() {
   dp.$datepicker.classList.toggle('-inline-');
}

twoInputsWrapp.querySelector('.date-dropdown_input-left').addEventListener('click', () => {
   toggleDp();
});

twoInputsWrapp.querySelector('.date-dropdown_input-right').addEventListener('click', () => {
   toggleDp();
});














