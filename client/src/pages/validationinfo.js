var validator = require("email-validator");
const emailValidator = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "aol.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "mail.com",
  "edu.pk",
  "nu.edu.pk",
  ".pk",
];
export default function validationinfo(values) {
  var letters = /^[a-zA-Z\-]+$/;
  var format = /[!@#$%^&/*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let error = {};
  if (values?.Uname?.length > 0) {
    for (let i = 0; i < values.Uname.length; i++) {
      if (
        values.Uname.charCodeAt(i) != 32 &&
        (values.Uname.charCodeAt(i) < 65 || values.Uname.charCodeAt(i) > 122)
      ) {
        error.Uname = "Kindly Exclude Special Characters";
      }
    }
  }
  const name = values?.Uname?.replace(/\s/g, "");
  if (format.test(name) === true) {
    error.Uname = "Wrong Format";
  }
  if (!values.Uname) {
    error.Uname = "Name Required";
  } else if (values?.Uname?.length <= 2) {
    error.Uname = "Name must greater than 2";
  } 

  if (values.email === "") {
    error.email = "Invalid Email Format";
  } else if (values.email !== "") {
    let SplitEmail = values?.email?.split("@")[1];
    if (!emailValidator?.includes(SplitEmail)) {
      error.email = "Invalid Email Format";
    }

    // emailValidator.includes()
  } else if (!validator?.validate(values.email)) {
    error.email = "Invalid Email Format";
  }
  if (validator.validate(values?.email) && values?.email != "") {
    if (
      values?.email?.charCodeAt(0) < 65 ||
      values?.email?.charCodeAt(0) > 122
    ) {
      error.email = "Invalid Email Format";
    } else {
      for (let i = 0; i < values?.email?.length; i++) {
        if (values?.email?.charCodeAt(i) != 46) {
          if (values?.email?.charCodeAt(i) < 48) {
            error.email = "Invalid Email Format";
          }
          if (values.email.charCodeAt(i) > 122) {
            error.email = "Invalid Email Format";
          }
        }
      }
    }
  }
  if (!values?.email) {
    error.email = "Email Required";
  }
  if (!values?.email?.includes("@")) {
    error.email = "Email Invalid";
  }
  if (!values?.loc) {
    error.loc = "Location must Filled";
  }
  if (!values?.password) {
    error.password = "Password Required";
  } else if (!values?.Cpassword) {
    error.Cpassword = "Password Required";
  }
  if (values?.password?.length < 6) {
    error.password = "Password Must Greater than Length 6";
  }
  if (values?.Cpassword?.length < 6) {
    error.Cpassword = "Password Must Greater than Length 6";
  }
  if (values?.password !== values?.Cpassword) {
    error.Cpassword = "Password Does not Match";
  }
  if (values?.type.length < 1) {
    error.type = "Please mention type";
  } else {
    // console.log("Data Added succesfully");
    error.check = "Data Added SuccessFully";
  }
  if (!/^[#.0-9a-zA-Z\s,_]+$/.test(values.loc)) {
    error.loc = "Invalid Address";
  }
  return error;
}

