import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx"
import axios from "axios";

const ForgotPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid email")
  });

function ForgotPassword() {

  const {register, handleSubmit, formState: { errors }} = useForm({resolver: zodResolver(ForgotPasswordSchema), mode: "all",});
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback((data) => {
    const user = {
      email: data.email,
    };

    axios
    .post(`${process.env.REACT_APP_URL}/api/users/forgotpassword`,user)
    .then(res => {
      console.log(res);
      if(res.status === 200 && res.data.msg){

        console.log("User with given email does not exist");
        setErrorMessage("User with given email does not exist!");
      }

      else{ //if(res.status === 200)

        console.log("valid email: ", res.data.user.email);
        setErrorMessage("Reset password message is sending to your email!");
      }
    })

  })
  
  return (
    <div className="fullscreen row justify-content-center align-items-center">
      <AppNavBarSingle/>
      <div className="col-10 col-sm-6 col-lg-4 justify-content-start">
        <div className="card p-1 mb-0 card-shadow">
          <div className="card-body">
            <div className="text-center">
              <h2 className="mt-2 mb-3">
                <b>Forgot Password</b>
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="errorMessage">{errorMessage}</p>
              <div className="mt-3 d-flex flex-column">
                <input {...register("email")} placeholder="Email" type="email" className="btn-border input-style form-control"/>
                <small className="align-self-start error-text">{errors.email?.message}</small>
              </div>

              <div className="mt-5 row text-center justify-content-center">
                <button type="submit" className="col-6 btn btn-block btn-success">Reset Your Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
);
}

export default ForgotPassword;
