import React, { useEffect, useState } from "react";
import axios from "axios";
import "../adminRefSelect/adminRefSelect.css";
import * as ReactBootstrap from "react-bootstrap";

function AdminRefSelectPage ( {currentWeek, allData, formData, setFormData} ){

    const [resultMessage, setResultMessage] = useState("");

    //console.log(formData);
    const [checkedCheckboxes, setCheckedCheckboxes] = useState(formData.checkedCheckboxes);
    
    const handleCheckboxChange = (event,data) => {
        event.preventDefault();
        event.stopPropagation()
        const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.name === data.name)
        if (isChecked) {
            setCheckedCheckboxes(
            checkedCheckboxes.filter(
                (checkedCheckbox) => (checkedCheckbox.name !== data.name)
            ));
        } else {
            setCheckedCheckboxes(checkedCheckboxes.concat(data));
        }
    };

    useEffect(() => {
        setFormData({...formData, checkedCheckboxes:checkedCheckboxes});
        if(checkedCheckboxes.length !==9)
        {
            setResultMessage("Please, select exactly 9 referees!");
        }
        if(checkedCheckboxes.length ===9)
        {
            setResultMessage("You have selected the referee list,click next button.");
        }
        
    }, [checkedCheckboxes]);

    function compare(a, b) {
      if (a.name < b.name){return -1;}
      if (a.name > b.name){return 1;}
      return 0;
    }

    allData.sort(compare);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if (checkedCheckboxes.length === 9) {
            var allarray=[];
            for (let i=0; i<checkedCheckboxes.length;i++) {
                allarray.push(checkedCheckboxes[i]._id); 
            }

            const newRefereesOfWeek ={
                week_no: currentWeek,
                referee_ids: allarray
            };

            await axios.post(`${process.env.REACT_APP_URL}/api/admin/selectReferee`, newRefereesOfWeek).then(res =>{

            }).catch(err=>console.log(err));

        }

        if (checkedCheckboxes.length !== 9){
            setResultMessage("Please, select exactly 9 referees!");
        } else {
            setResultMessage("You have selected the referee list successfully!");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}  className="selectRefform">
                <div className="container mt-5" style={{width: "1080px",overflow: "hidden"}}>
                    <div style={{marginBottom: "2rem"}}>
                        <p>Select exactly 9 referees for the pre-match rating section of Week {currentWeek+1}:</p>
                    </div>
                    <div className="row">
                    { allData ?
                    
                    (allData.length > 0 ?
                        allData.map((item) => {
                            return(
                            <div style={{overflow: "hidden"}} key={item.name} className="ck-button col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                                <label style={{width: "80%"}}>
                                    <input style={{width: "100%"}} value={item.name} type="checkbox" checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.name === item.name)} onChange={(event) => handleCheckboxChange(event,item)}/><span>{item.name}</span>
                                </label>
                            </div>
                            );
                        })
                        :
                        <p>No Referee yet !!!</p>
                    )
                    :
                    <div className="d-flex justify-content-center">
                        <ReactBootstrap.Spinner animation="border"/>
                    </div>
                    }
                    </div>
                </div>

                <p className="selectRefereeResultMessage">{resultMessage}</p>
            </form>
        </div>
    )
};
export default AdminRefSelectPage;