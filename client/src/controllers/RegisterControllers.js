import axios from 'axios';
import User from '../models/Users'

function RegisterControllers() {
    var self = this;
    var Users = new Array(User);

    axios.get('http://localhost:9000/api/users')
        .then(function (res) {
            res.data.forEach(function (user) {
                const temp = {
                    name: user.name,
                    email: user.email,
                }
                Users.push(temp);
            })
            Users.shift();
        })
        .catch(err => {
            console.log(err);
        })

    self.validate = function (state) {
        const regexp = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
        const errors = {
            namedError: '',
            emailError: '',
            passwordError: ''
        };
        if (!state.name) {
            errors.namedError = "Please enter name"
        }
        let obj = Users.find(o => o.name === state.name);
        if (obj) {
            errors.namedError = "This name already exists"
        }

        if (state.name.length < 6 || state.name.length > 40) {
            errors.namedError = 'Your name must be contains between 6 and 40 characters '
        }
        if (!state.email) {
            errors.emailError = 'Please enter a valid email'
        } else if (!state.email.match(regexp)) {
            errors.emailError = (
                <span style={{ color: 'red' }}> Your email address must be valid</span>
            )
        }
        let obj2 = Users.find(o => o.email === state.email);
        if (obj2) {
            errors.emailError = "This email address already exists"
        }

        if (state.password.length < 4 || state.password.length > 40) {
            errors.passwordError = 'Your password must be contains between 4 and 40 characters'
        }
        return errors;
    }

    self.register = function(state) {

        const registered = {
            name: state.name,
            email: state.email,
            password: state.password
        }

        axios.post('http://localhost:9000/api/auth/register', registered)
                .then(function (res) {
                    console.log(res.data);
                    window.location.href = '/login';
                }, (error) => {
                    console.log(error);
                });
    }

    return self;
};

export default RegisterControllers;