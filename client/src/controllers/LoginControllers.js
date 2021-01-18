import axios from "axios";

function LoginControllers() {
  var self = this;

  self.validate = function (state) {
    const regexp = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    const errors = {
      emailError: "",
      passwordError: "",
    };
    if (!state.email) {
      errors.emailError = "Please enter a valid email";
    } else if (!state.email.match(regexp)) {
      errors.emailError = (
        <span style={{ color: "red" }}> Your email address must be valid</span>
      );
    }
    if (state.password.length < 4 || state.password.length > 40) {
      errors.passwordError =
        "Your password must be contains between 4 and 40 characters";
    }
    return errors;
  };

  self.login = function (state) {
    const LoginState = {
      email: state.email,
      password: state.password,
    };

    axios.post("http://localhost:9000/api/auth/login", LoginState).then(
      function (res) {
        console.log(res.data);
        window.localStorage.setItem("email", res.data.user.email);
        window.localStorage.setItem("name", res.data.user.name);
        if (window.localStorage.roomId) {
            window.location.href = `/watch/room/${window.localStorage.roomId}`
        } else {
          window.location.href = "/";
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return self;
}

export default LoginControllers;
