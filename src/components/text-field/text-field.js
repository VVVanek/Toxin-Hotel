import Inputmask from 'inputmask';

const inputsWithMask = document.querySelectorAll('.text-field_mask');

inputsWithMask.forEach((inp) => {
   Inputmask('datetime', {
      inputFormat: 'dd.mm.yyyy',
      placeholder: '00.00.0000',
   }).mask(inp);
});
