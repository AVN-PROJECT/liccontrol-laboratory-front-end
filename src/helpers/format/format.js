const formatDate = (str) => {
  if (!str) {
    return '';
  }
  if (str.includes('.')) {
    const [d, m, y] = str.split('.');
    return `${y}-${m}-${d}`;
  }
  return str;
};

export default formatDate;
