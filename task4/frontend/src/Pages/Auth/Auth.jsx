import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import Input from '../../Components/FormComponent/Input';


export default function Auth() {
  
  const state={
    unm: '',
    umail: '',
    upass: '',
    loginMode: true,
    err: {},
  }
  const [values, setValues] = useState({...state});
  const[working,setWorking] = useState(false); // state to track login or registration process running or not
  const navigate = useNavigate();              // to navigate routes

  axios.defaults.withCredentials = true;

  // Form validation function
  const validate = (names=['unm','umail', 'upass'],newValues=values) => {

    const rules = {
      unm: /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/g,
      umail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      upass: /^.{6,}$/,
    };

    const invalidMsg = {
      unm: "Please use Letters and Spaces ( ), hyphens (-), or apostrophes (') between name parts",
      umail: "Please enter a valid email address",
      upass: "Password must be at least 6 characters long",
    };

    const {err}=newValues;
  
    names.forEach(nm=>{
      if (!rules[nm].test(newValues[nm])) err[nm] = invalidMsg[nm];
      else delete err[nm];
    })

    setValues(()=>({ ...newValues,err})); 

    return Object.keys(err).length === newValues.loginMode-0;
  };

  const handleAuth = (e) => {
    e.preventDefault();
        
    if (validate()) {
      setWorking(true);
      axios.post('http://localhost:4000/auth', values)
      .then((res) => {
        if(res.data.status==='success')navigate('/');
        else alert(res.msg);
        setWorking(false)
      })
    }
  };

  const switchMode = () => {
    setValues({ ...values, loginMode: !values.loginMode });
  };

  const handleChange = (e) => {
    const {name}=e.target;
    const newValues={...values,[name]:e.target.value};

    validate([name], newValues);
  };

  return (
    <div id='Auth' className='d-flex p-3 justify-content-center align-items-center vh-100'>
      <form
        onSubmit={handleAuth}
        className="shadow rounded p-5"
        style={{
          background: '#fcfff5',
          maxWidth: '510px',
          width: '50vmax',
        }}
      >
        <h3 className='p-3 text-info mb-5 text-center '>
          <strong>USER MANAGER</strong>
        </h3>

        {!values.loginMode && (
          <Input
            values={values}
            onChange={handleChange}
            type="text"
            name="unm"
            placeholder="Full Name"
            value={values.unm}
          />
        )}

        <Input
          values={values}
          onChange={handleChange}
          type="email"
          name="umail"
          placeholder="Email Address"
          value={values.umail}
        />
        <Input
          values={values}
          onChange={handleChange}
          type="password"
          name="upass"
          placeholder="Password"
          value={values.upass}
        />

        <button className="btn text-white bg-info fs-5 mb-3 mt-3 p-3 w-100" id="login" type="submit">
          <strong>{working?'Working...':values.loginMode ? 'Login' : 'Register'}</strong>
        </button>

        <div className="text-center">
          {
            values.loginMode ? 
            <p>No account?{' '}<span className='text-info pointer' onClick={switchMode}>Register Here</span></p> :
            <p>Already a member?{' '}<span className='text-info pointer' onClick={switchMode}>Login Here</span></p>
          }
        </div>
      </form>
    </div>
  );
}
