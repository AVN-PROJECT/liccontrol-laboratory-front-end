export const regex = {
  cyrillic: /^[а-яё\s]+$/i,
  latin: /^[a-z\s]+$/i,
  multilang: /^[а-яёa-z\s]+$/i,
  name: /^[а-яёa-z-]+$/i,
  phone: /^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
  email:
    /^(?!.*[а-яА-ЯЁё#$%^&*])(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  innCommercial: /^[0-9]{10}$/,
  inn: /^[0-9]{10,12}$/,
  pass: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).*$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
};

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
  } else if (param === 'url') {
    reg = regex.url;
    msg = 'Неправильно указана ссылка';
  } else if (val.length < minLength) {
    return `Минимальное количество символов: ${minLength}`;
  } else if (val.length > maxLength) {
    return `Максимальное количество символов: ${maxLength}`;
  } else if (!regex[param]) {
    console.warn('error validate-utils: regular expression is not found');
  } else {
    reg = regex[param];
    msg = 'Неверный формат';
  }

  return val.match(reg) ? '' : msg;
}
