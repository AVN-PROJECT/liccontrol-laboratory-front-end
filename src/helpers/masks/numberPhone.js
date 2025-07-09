const numberPhone = (value) => {
  let x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

  return (
    '+7' +
    (x[2] ? ' (' + x[2] : '') +
    (x[3] ? ') ' + x[3] : '') +
    (x[4] ? '-' + x[4] : '') +
    (x[5] ? '-' + x[5] : '')
  );
};

export default numberPhone;
