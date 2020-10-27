// Rather than use a library for that, stick with a simple function
// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-21.php
export function numberToRomanNumberals(num) {
  if (typeof num !== 'number') return false;

  let digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ],
    roman_num = '',
    i = 3;
  while (i--) roman_num = (key[+digits.pop() + i * 10] || '') + roman_num;
  return Array(+digits.join('') + 1).join('M') + roman_num;
}
