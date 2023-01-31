import React, { useEffect, useState } from "react";
import axios from "axios";
import "../admin-auth/selectReferee.css";
import * as ReactBootstrap from "react-bootstrap";

function AdminSelectReferee({ currentweek, allData }) {
  const [resultMessage, setResultMessage] = useState("");

  // With this useState I wan't to collect the checked checkboxes
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

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

  }, [checkedCheckboxes]);

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  allData.sort(compare);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkedCheckboxes.length === 9) {
      var allarray = [];
      for (let i = 0; i < checkedCheckboxes.length; i++) {
        allarray.push(checkedCheckboxes[i]._id);

      }
      const newRefereesOfWeek = {
        week_no: currentweek,
        referee_ids: allarray
      };
      await axios.post(`${process.env.REACT_APP_URL}/api/admin/selectReferee`, newRefereesOfWeek)
        .then(res => {

        }).catch(err => console.log(err));
    }
    if (checkedCheckboxes.length !== 9) {
      setResultMessage("Please, select exactly 9 referees!");
    }
    else {
      setResultMessage("You have selected the referee list successfully!");
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="selectRefform">
        <div className="mt-3 container">
          <div className="row">
            {allData ?
              (allData.length > 0 ?
                allData.map((item) => {

                  return (
                    <div key={item.name} className="col-xl-3 col-sm-6 mb-5">

                      <input
                        value={item.name}
                        type="checkbox"
                        checked={checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.name === item.name)}
                        onChange={() => handleCheckboxChange(item)} />{item.name}
                    </div>

                  );
                }) : <p>No Referee yet !!!</p>) :
              <div className="d-flex justify-content-center">
                <ReactBootstrap.Spinner animation="border" />
              </div>
            }
          </div>
        </div>
        <p className="selectRefereeResultMessage">{resultMessage}</p>
        <label>
          <button style={{ marginLeft: "500px" }} type="submit" className="btn btn-block col-8 btn-success">CONFIRM THE LIST</button>
        </label>
      </form>
    </div>
  )
};
export default AdminSelectReferee;