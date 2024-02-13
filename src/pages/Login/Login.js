import React, {useState, useEffect} from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import {useNavigate, NavLink} from "react-router-dom";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "../../containers/App";
import MyRoutes from "../../containers/Routes";
import {createStore} from "redux";
import rootReducer from "../../reducers";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const Login = ({setUserState}) => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        username: "",
        password: "",
    });

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    };
    const validateForm = (values) => {
        const error = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            error.username = "Username is required";
        }
        if (!values.password) {
            error.password = "Password is required";
        }
        return error;
    };

    const loginHandler = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(user));
        setIsSubmit(true);
        // if (!formErrors) {

        // }
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(user);
            // navigate("/dashboard", { replace: true });


            axios.post("http://localhost:8000/api/v1/auth/login/", user).then((res) => {
                if (res.data.access_token) {
                    ReactDOM.render(
                    <Provider store={store}>
                        <App/>
                    </Provider>,
                    document.getElementById('root')
                );
                }else {
                    alert("Invalid Credentials");
                }
                // setUserState(res.data.user);

            }).catch((err) => {
                alert("Invalid Credentials", err);
            })
        }
    }, [formErrors]);
    return (
        <div className={loginstyle.login}>
            <form>
                <h1>Login</h1>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={changeHandler}
                    value={user.username}
                />
                <p className={basestyle.error}>{formErrors.username}</p>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={changeHandler}
                    value={user.password}
                />
                <p className={basestyle.error}>{formErrors.password}</p>
                <button className={basestyle.button_common} onClick={loginHandler}>
                    Login
                </button>
            </form>
            <NavLink to="/signup">Not yet registered? Register Now</NavLink>
        </div>
    );
};
export default Login;
