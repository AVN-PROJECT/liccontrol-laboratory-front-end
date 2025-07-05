const resetForm = (object) => {
  Object.keys(object).forEach((key) => {
    object[key] = '';
  });
};

export default resetForm;
