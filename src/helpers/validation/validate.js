export const regex = {
  cyrillic: /^[а-яё\s]+$/i,
  latin: /^[a-z\s]+$/i,
  multilang: /^[а-яёa-z\s]+$/i,
  name: /^[а-яёa-z-]+$/i,
  fullName: /^[-а-яёa-z\s]+$/i,
  date: /^\d{2}.\d{2}.\d{4}$/,
  year: /^[0-9]{4}$/,
  phone: /^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
  email:
    /^(?!.*[а-яА-ЯЁё#$%^&*])(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  snils: /^[0-9]{3}-[0-9]{3}-[0-9]{3}\s[0-9]{2}$/,
  payment: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
  passport: /^[0-9]{4}\s[0-9]{6}$/,
  innCommercial: /^[0-9]{10}$/,
  inn: /^[0-9]{11}$/,
  kpp: /^[0-9]{9}$/,
  number: /^[0-9]+$/,
  fractional: /^\d+(\.\d{1,3})?$/,
  pass: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).*$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
  svg: /^<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>$/i,
  mediaCertificateNumber: /^(?:[А-ЯA-Z]{2,3}\s*)?№\s*([А-ЯA-Z]\s*){2,3}\d{2,7}\s*-\s*\d{2,7}$/i,
};

function checkIfAdult(birthday) {
  const [day, month, year] = birthday.split('.');
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const age = currentYear - birthDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    return !(age - 1 < 18);
  } else {
    return age >= 18;
  }
}

export function strValidate(val, param, required = false, minLength = 0, maxLength = Infinity) {
  if (typeof val !== 'string' && required) {
    return 'Поле обязательно к заполнению';
  }

  val = val ? val.trim() : val;

  let reg = '';
  let msg = '';

  if (required && !val.length) {
    return 'Поле обязательно к заполнению';
  }

  if (!param || !val) {
    return '';
  } else if (param === 'letters') {
    reg = val.match(regex.cyrillic) ? regex.cyrillic : regex.latin;
    msg = 'Пожалуйста, используйте только буквы';
  } else if (param === 'name') {
    reg = regex.name;
    msg = `Неправильно указано имя`;
  } else if (param === 'fullName') {
    reg = regex.fullName;
    msg = `Неправильно указано ФИО`;
  } else if (param === 'cyrillic') {
    reg = regex.cyrillic;
    msg = 'Используйте только кириллицу';
  } else if (param === 'password') {
    reg = regex.pass;
    msg = 'Используйте надёжный пароль';
  } else if (param === 'phone') {
    reg = regex.phone;
    msg = 'Неправильно указан номер телефона';
  } else if (param === 'email') {
    reg = regex.email;
    msg = 'Неправильно указан email';
  } else if (param === 'inn') {
    reg = regex.inn;
    msg = 'Введен некорректный ИНН';
  } else if (param === 'kpp') {
    reg = regex.kpp;
    msg = 'Введен некорректный КПП';
  } else if (param === 'url') {
    reg = regex.url;
    msg = 'Неправильно указана ссылка';
  } else if (param === 'year') {
    reg = regex.year;
    msg = 'Неправильно указан год';
  } else if (param === 'number') {
    reg = regex.number;
    msg = 'Неправильно указано число';
  } else if (param === 'fractional') {
    reg = regex.fractional;
    msg = 'Неправильно указано число с плавающей точкой';
  } else if (param === 'mediaCertificateNumber') {
    reg = regex.mediaCertificateNumber;
    msg = 'Неправильно указан номер свидетельства СМИ';
  } else if (param === 'description') {
    if (val.length < minLength) {
      return `Минимальное количество символов: ${minLength}`;
    } else if (val.length > maxLength) {
      return `Максимальное количество символов: ${maxLength}`;
    }
  } else if (param === 'svg') {
    reg = regex.svg;
    msg = 'Неверный формат файла. Допустимо: SVG';
  } else if (!regex[param]) {
    console.warn('error validate-utils: regular expression is not found');
  } else {
    reg = regex[param];
    msg = 'Неверный формат';
  }
  return val.match(reg) ? '' : msg;
}

export function numValidate(value, required = false) {
  if (required && !value) {
    return 'Поле обязательно к заполнению';
  }

  return '';
}

export function dateValidate(
  val,
  canFuture = true,
  canPast = true,
  required = false,
  adult = false
) {
  if (required && !val.length) {
    return 'Поле обязательно к заполнению';
  }

  if (!required && !val.length) {
    return '';
  }

  const curYear = new Date().getFullYear();
  const splitDate = val.split('.');

  if (val.length && !val.match(regex.date)) {
    return 'Неверный формат даты';
  } else if (splitDate.length !== 3) {
    return 'Неверно указана дата';
  } else if (splitDate[0] > 31 || splitDate[1] > 12) {
    return 'Неверный формат даты';
  } else if (!canFuture && splitDate[2] > curYear) {
    return 'Год не может быть больше текущего';
  } else if (!canPast && splitDate[2] < 1900) {
    return 'Год не может быть меньше 1900х';
  } else if (adult && !checkIfAdult(val)) {
    return 'Не моложе 18 лет';
  }
  return '';
}

export function arrayValidate(array, required = false) {
  if (required && !array.length) {
    return 'Поле обязательно к заполнению';
  }

  return '';
}
