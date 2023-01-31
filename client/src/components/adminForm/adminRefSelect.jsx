import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import "./formTabs.css";
import * as ReactBootstrap from "react-bootstrap";

function AdminRefSelect({currentweek,allData,FormData,setFormData}) {
    const [resultMessage, setResultMessage] = useState("");
    console.log(FormData);
  
      // With this useState I wan't to collect the checked checkboxes
      const [checkedCheckboxes, setCheckedCheckboxes] = useState(FormData.checkedCheckboxes);
    
      // This is my handler method that gets triggered when a checkbox get's checked/unchecked
      // ..and toggles the state of the checkbox
      const handleCheckboxChange = (data) => {
        const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.name === data.name)
        if (isChecked) {
          setCheckedCheckboxes(
            checkedCheckboxes.filter(
              (checkedCheckbox) => checkedCheckbox.name !== data.name
            )
          );
        } else {
          setCheckedCheckboxes(checkedCheckboxes.concat(data));
        }
      };


      useEffect(() => {
        console.log(checkedCheckboxes);
        setFormData({...FormData,checkedCheckboxes:checkedCheckboxes,newWeek:parseInt(currentweek)})
    }, [checkedCheckboxes]);
    //console.log(allData);
    function compare( a, b ) {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name){
        return 1;
      }
      return 0;
    }
  allData.sort(compare);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(checkedCheckboxes);
    if(checkedCheckboxes.length === 9){
      var allarray=[];
      for(let i=0; i<checkedCheckboxes.length;i++){
        allarray.push(checkedCheckboxes[i]._id);
        
      }
      const newRefereesOfWeek ={
        week_no: currentweek,
        referee_ids: allarray
      };
      await axios.post(`${process.env.REACT_APP_URL}/api/admin/selectReferee`,newRefereesOfWeek)
      .then(res =>{
          console.log(res.data);
  
      }).catch(err=>console.log(err));
    }
    if(checkedCheckboxes.length !== 9){
      setResultMessage("Please, select exactly 9 referees!");
    }
    else{
      setResultMessage("You have selected the referee list successfully!");
    }

  }

  return (
    <div>
        <form  onSubmit={handleSubmit}  className="selectRefform">
        <div className="col-12 referee-select-container">
            <div className="row">
            { allData ?
                (allData.length > 0 ?
                    allData.map((item) => {
                        return(
                                <div key={item.name} className="col-xl-3 col-sm-6 mb-5">
                                
                                    <input
                                    value={item.name}
                                    type="checkbox"
                                    checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.name === item.name)}
                                    onChange={() => handleCheckboxChange(item)}/>{item.name}
                                </div>
                                );
                    }) :<p>No Referee yet !!!</p>)            :
                    <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border" />
                  </div>
            }
            </div>
        </div>
        </form>
    </div>
  )
}

export default AdminRefSelect