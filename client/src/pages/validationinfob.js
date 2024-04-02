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
  } else if (!values.Uname.match(letters)) {
    error.Uname = "Name must only string";
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

  else if(values.phone ===""){
    error.phone = "Invalid Phone Format";
  }
  else if(!validator.validate(values.phone)){
    error.phone = "Invalid Phone Format";
  }
  else {
    error.phone = "Invalid Phone Format";

  }


  if (!values?.email) {
    error.email = "Email Required";
  }
  if (!values?.email?.includes("@")) {
    error.email = "Email Invalid";
  }
if(!values?.phone){
  error.phone="Phone Required"
}
  if (!values?.loc) {
    error.loc = "Location must Filled";
  } else {
    console.log("Data Added succesfully");
    error.check = "Data Added SuccessFully";
  }
  if (!/^[#.0-9a-zA-Z\s,_]+$/.test(values.loc)) {
    error.loc = "Invalid Address";
  }
  if (!values?.type) {
    error.type = "Type Required";
  }

  return error;
}

