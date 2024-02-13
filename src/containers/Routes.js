import "./Routes.css";
import Profile from "./../pages/Profile/Profile";
import Login from "./../pages/Login/Login";
import Register from "./../pages/Register/Register";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import App from "./App";
import Bridge from "./bridge"


function MyRoutes() {
    const [userstate, setUserState] = useState({});
    return (
        <div className="Routes">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            userstate && userstate._id ? (
                                <Profile
                                    setUserState={setUserState}
                                    username={userstate.fname}
                                />
                            ) : (
                                <Login setUserState={setUserState}/>
                            )
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={<Login setUserState={setUserState}/>}
                    ></Route>
                    <Route path="/signup" element={<Register/>}></Route>
                    <Route path="*" element={<h1>404 Not Found</h1>}></Route>
                    <Route path="/dashboard" element={Bridge}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default MyRoutes;
