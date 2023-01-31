import React from "react";
import AppNavBar from "../../components/appnavbar.jsx";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useCallback, useState } from "react";
import { useStore } from "../../store/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./report-page.css";


function ReportPage(){


    const ReportSchema = z
    .object({
        report: z.string().min(1),
    });
    const [state, dispatch] = useStore();
    const {register, handleSubmit, formState: { errors }} = useForm({resolver: zodResolver(ReportSchema), mode: "all",});
    const [submitted, setSubmitted] = useState(false);
    const {user: currentUser} = state;
    //console.log("username", username);

    const onSubmit = useCallback((data) => {

        const user = {
            username: currentUser.user.username,
            report: data.report
        };

        console.log("data username", user.username);
        console.log("data report", user.report);


        axios
            .post(`${process.env.REACT_APP_URL}/api/users/registerReport/`, user)
              .then(res => {
                //console.log("return", res);
                setSubmitted(true);

              });
    });

    return(
        <div>
            <AppNavBar/>
            <div className="report-page-container">
                <div className="row report-page-header"> <h1> Report Page</h1> </div>
                <div className="row report-page-form">
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            {!submitted && <label className="report-page-label">Please write your report and click send report.</label>}
                            {submitted && <label className="report-page-label">Your report is submitted, please check your email for response.</label>}
                            <textarea {...register("report")} className="report-page-text-area form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <input type="submit" name="submitButton" className="btn btn-success" value={`Send report`}/>
                        </div>
                    </form>                
                </div>
            </div>         
        </div>
    )

}

export default ReportPage