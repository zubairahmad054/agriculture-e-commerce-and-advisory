import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Formsucces = () => {

const history=useNavigate();

  const logout =()=>
  {
    localStorage.removeItem("User_login");
    history('/');
  }
    return (
      <div className="App"style={{marginTop:"20%"}}>
  <button onClick={logout}>logout</button><br/><br/>
  
  
      </div>
    );
}

export default Formsucces