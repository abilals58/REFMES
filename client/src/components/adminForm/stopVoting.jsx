import React from 'react'
import "./formTabs.css"
import MatchDataPage from '../../pages/match-importance/match-data'

function StopVoting({FormData,setFormData}) {
const handleClick=()=>{

}
  return (
    <>
    <div className='voting-stop-button'>
      <button onClick={handleClick} className='btn-succes'>Stop Vote</button>
    </div>
    <div className='decided-referee-container'>
      <MatchDataPage Week={parseInt(FormData.newWeek) - 1} />
    </div>
    </>
  )
}

export default StopVoting