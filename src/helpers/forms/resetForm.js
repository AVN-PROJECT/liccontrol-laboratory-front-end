const resetForm = (object) => {
  Object.keys(object.value).forEach((key) => {
    object.value[key] = '';
  });
};

export default resetForm;
