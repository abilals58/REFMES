import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useStore } from "../../store/store";
import { observerLogin } from "../../store/userreducer";
import "../login/login.css";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx"

const observerloginSchema = z
  .object({
    observerid: z.string().min(1),
    password: z.string().min(1),
  });

function ObserverLogin() {
  const {register, handleSubmit, formState: { errors }} = useForm({resolver: zodResolver(observerloginSchema), mode: "all",});
  const [, dispatch] = useStore();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    const observer = {
      observerid: data.observerid,
      password: data.password,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/api/users/observerLogin`,observer)
      .then((res) => {
        if (res.status === 200 && res.data.message) {
          setErrorMessage(res.data.message);
        } else if (res.status === 200) {
          const observer = res.data;
          dispatch(observerLogin(observer));
          setErrorMessage("You logged in succesfully");
          navigate("/observer-auth");
        } else {
          setErrorMessage("Error! Please try again.");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setErrorMessage("Error! Please try again.");
      });
  }, [navigate]);
  
  return (
    <div className="fullscreen row justify-content-center align-items-center">
      <AppNavBarSingle/>
      <div className="col-10 col-sm-6 col-lg-4 justify-content-start">
        <div className="card p-1 mb-0 card-shadow">
          <div className="card-body">
            <div className="text-center">
              <h2 className="mt-2 mb-3">
                <b>OBSERVER SIGN IN</b>
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="errorMessage">{errorMessage}</p>

              <div className="mt-4 d-flex flex-column">
                <input {...register("observerid")} placeholder="observerid" type="observerid" className="btn-border input-style form-control"/>
              </div>

              <div className="mt-3 d-flex flex-column">
                <input {...register("password")} placeholder="Password" type="password" className="btn-border input-style form-control"/>
                <small className="align-self-start error-text">{errors.password?.message}</small>
              </div>

              <div className="mt-5 row text-center justify-content-center">
                <button type="submit" className="col-6 btn btn-block btn-success">SIGN IN</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
);
}

export default ObserverLogin;
