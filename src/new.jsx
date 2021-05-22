import { useState, useRef } from 'react';
import axios from 'axios';

const CowinEntry = () => {

  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ isDisable, setDisable ] = useState(true);
  const pinCode = useRef();

  const handleChange = (event) => {
    if (pinCode.current.value && !validatePinCode()) {
      setErrorMessage('Enter valid pincode');
      setDisable(true);
    } else {
      setErrorMessage(null);
      if(pinCode.current.value) {
        setDisable(false);
      }
    }
  }

  const validatePinCode = () => {
    console.log(pinCode.current.value)
    const pincode = /^[1-9][0-9]{5}$/;
    if(pinCode.current.value.match(pincode)) return true;
    return false;
  }

  const submit = async () => {
      const url = 'http://localhost:5000/';
      const body = {
        pinCode: pinCode.current.value
      }
      const response = await axios.post(url, body);
      console.log(response.data);
      if(response.data.statusCode === 500) {
        setErrorMessage(response.data.body.message);
      }
  }

  const mainStyle = {
    textAlign: 'center',
    marginTop: '100px'
  } 

  const headerStyle = {
    textAlign: 'center',
  }

  const inputStyle = {
    height: '20px',
    borderRadius: '5px'
  }

  const buttonStyle = {
    backgroundColor: 'green',
    borderRadius: '5px',
    width: '80px'
  }

  const randomStyle = {
    marginTop: '30px',
  }

  const textStyle = {
    color: 'white'
  }

  return (
    <div className="cowin-body">
      <div  className="cowin-header" style={headerStyle}>
          <h1>Cowin slot updates</h1>
      </div>

      <div className="cowin-form" style={mainStyle}>
        <input 
          type="text" 
          placeholder="Enter pincode" 
          onChange={handleChange} 
          style={inputStyle}
          ref={pinCode}
        /> <br/>
        <div style={randomStyle}>
          <a href="https://t.me/hsysgwbwj" target="blank">
            <button style={buttonStyle} onClick={submit} disabled={isDisable}>
              Join
            </button>
          </a>
        </div>
      </div>

      {
       errorMessage ? (<h1 style={textStyle}>{errorMessage}</h1>) : null
      }

    </div>
  )
}

export default CowinEntry;
