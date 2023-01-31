import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useStore } from "../../store/store";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx"

const adminLoginSchema = z
  .object({
    password: z.string().min(1),
  });

function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(adminLoginSchema), mode: "all", });
  const [, dispatch] = useStore();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    const user = {
      password: data.password,
    };
    if (user.password === "CS308Team1admin") {
      setErrorMessage("You logged in succesfully");
      navigate("/admin");
    }
    else { setErrorMessage("Error! Please try again."); }
  }, [navigate, dispatch]);

  return (
    <div className="fullscreen row justify-content-center align-items-center">
      <AppNavBarSingle />
      <div className="col-10 col-sm-6 col-lg-4 justify-content-start">
        <div className="card p-1 mb-0 card-shadow">
          <div className="card-body">
            <div className="text-center">
              <h2 className="mt-2 mb-3">
                <b>ADMIN LOGIN</b>
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="errorMessage">{errorMessage}</p>
              <div className="mt-3 d-flex flex-column">
                <input {...register("password")} placeholder="Password" type="password" className="btn-border input-style form-control" />
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

export default AdminLogin;
