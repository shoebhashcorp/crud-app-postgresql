const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = " firstName field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = " lastName field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "address  field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
