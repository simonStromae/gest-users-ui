import React, {useState, useCallback} from "react";
import { useForm } from "react-hook-form";
import { Link, withRouter } from "react-router-dom"
import app from "../firebaseConfig";

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'


function Register({ history }) {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const {register, handleSubmit, watch, formState:{ errors }} = useForm();

    const onSubmit = (data) => {
        handleSignUp(data);
    };

    const handleSignUp = useCallback(async (data) => {
        setEmailError("");
        setPasswordError("");

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, data.email, data.password );
            history.push("/registerStep");

        } catch (error) {
            switch(error.code){
                case "auth/email-already-in-use":
                    setEmailError("This email is already in use. Please fill in another.");
                    break;
                case "auth/invalid-email":
                    setEmailError("Incorrect email. Please fill in a valid email.");
                    break;
                
                case "auth/weak-password":
                    setPasswordError("Weak password. Please strengthen your password.");
                    break;
                }
            }
    }, [history]);

    return (
      <div class="container-fluid">
        <div class="row" style={{"height": "100vh"}}>
            <div class="col-sm-6 d-flex justify-content-center align-items-center">
                <div>
                    <div class="mb-5" style={{ "position": "absolute", "top": "50px", "left": "35%" }}>
                        <p>
                            Already have an account ? <Link to="/login" class="text-decoration-none text-dark fw-bold">Login</Link>
                        </p>
                    </div>
    
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 class="my-4">Sign Up</h2>
        
                            <div class="mt-5 mb-4">
                                <label class="form-label">Email</label>
                                <div class="form-group">
                                    <input type="text" {...register("email", {required:'Email is a required field'})} class="form-control" placeholder="Email"/>
                                    {errors.email && <span className="text-danger mt-2 d-block">{errors.email.message}</span>}
                                    {emailError && <span className="text-danger mt-2 d-block">{emailError}</span>}
                                </div>
                            </div>

                            <div class="my-4">
                                <label class="form-label">Password</label>
                                <div class="form-group">
                                    <input type="password" {...register("password", {required:'Password is a required field', minLength:{value: 8, message:'Your password must be at least 8 characters long'}})} class="form-control" placeholder="Password"/>
                                    {errors.password && <span className="text-danger mt-2 d-block">{errors.password.message}</span>}
                                    {passwordError && <span className="text-danger mt-2 d-block">{passwordError}</span>}
                                </div>
                            </div>

                            <div class="mt-5">
                                <label class="form-label">
                                    <input className="me-2" type="checkbox" required/>
                                    I have read and accept the <a href="#" class="text-dark fw-bold">Terms of service</a> and <a href="#" class="text-dark fw-bold">Privacy policy</a>
                                </label>
                            </div>

                            <div class="my-4">
                                <button type="submit" class="w-100 btn btn-dark btn-hover">Create an account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 bg-purple justify-content-center align-items-center d-none d-sm-block">
                <div class=" d-flex justify-content-end">
                    <img src="assets/img/pattern.svg" alt="" style={{"position":"absolute", "top": 0, "right": 0}}/>
                    <img src="assets/img/pattern.svg" alt="" style={{"position":"absolute", "top": "90px", "right": "112px"}}/>
                    <img src="assets/img/pattern.svg" alt="" style={{"position":"absolute", "top": "178px", "right": 0}}/>
                </div>
                
                <div style={{"position": "absolute", "top": "35%", "left": "62%"}}>
                    <p class="text-uppercase mb-3" style={{"font-size": "13px"}}>tips & tricks</p>
                    <h3 class="mb-2">Use your phone</h3>
                    <div class="d-flex mt-3">
                        <span style={{"width":"3px;", "height": "70px", "background":"#fff", "border-radius":"2px", "display": "block"}}></span>
                        <p class="w-50 ms-3" style={{"font-weight": "300;", "font-size": "14px"}}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Sed libero ut repellat doloremque ullam totam expedita dolores error eum saepe,
                            facere labore voluptates earum dolore dignissimos quam ad nobis voluptatem?
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-end" style={{"position": "absolute", "bottom": 0, "right": 0, "width": "40%"}}>
                    <img src="assets/img/pattern.svg" alt="" style={{"position":"absolute", "top": "-30px", "right": "89%"}}/>
                    <img src="assets/img/trick-1.png" class="w-100 z-10" alt=""/>
                    <div class="z-100" style={{"position":"absolute", "height":"296px", "width": "100%", "background": "rgba(103, 58, 183, 0.5)", "filter": "blur(199px)"}}></div>
                </div>
            </div>
        
        </div>
    </div>
    );
  }

export default withRouter(Register);