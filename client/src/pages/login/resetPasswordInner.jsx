import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, {message: "Password must be at least 8 character"}).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*';."_)(+,/:>\]<=?@\\^`|[}{~-])/,
      {message: "Password must contain uppercase, lowercase, numeric and special character"}),
    repassword: z.string().min(1),

  });

function ResetPasswordInner({user_id}) {

  const {register, handleSubmit, formState: { errors }} = useForm({resolver: zodResolver(ResetPasswordSchema), mode: "all",});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    const  user = {
      _id: user_id,
      password: data.password,
      repassword: data.repassword
    };

    // console.log("user id: ", user._id);
    // console.log("password: ", user.password);
    // console.log("repassword: ", user.repassword);

    if(user.password !== user.repassword){

        setErrorMessage("Confirmation password is wrong, please try again!");
    }
    else {

        //setErrorMessage("Your password is updated, you can login to the website!");
        

        axios.post(`${process.env.REACT_APP_URL}/api/users/reset-password/`, user)
              .then(res => {

                //console.log("return", res);

                if(res.data){

                  setErrorMessage("Your password is updated, you can login to the website!");
                  navigate('/login');

                }

              });

    }

    })

  return (
      <div className="col-10 col-sm-6 col-lg-4 justify-content-start">
        <div className="card p-1 mb-0 card-shadow">
          <div className="card-body">
            <div className="text-center">
              <h2 className="mt-2 mb-3">
                <b>Reset Password</b>
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="errorMessage">{errorMessage}</p>
              <div className="mt-3 d-flex flex-column">
                <input {...register("password")} placeholder="Password" type="password" className="btn-border input-style form-control"/>
                <small className="align-self-start error-text">{errors.password?.message}</small>
              </div>
              <div className="mt-3 d-flex flex-column">
                <input {...register("repassword")} placeholder="Password (re-enter)" type="repassword" className="btn-border input-style form-control"/>
                <small className="align-self-start error-text">{errors.repassword?.message}</small>
              </div>

              <div className="mt-5 row text-center justify-content-center">
                <button type="submit" className="col-6 btn btn-block btn-success">Reset Your Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
);
}

export default ResetPasswordInner;
