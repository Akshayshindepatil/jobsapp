import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const token = Cookies.get("jwtToken");
const navigate=useNavigate();  
useEffect(()=>{
  if(token !== undefined){
    navigate("/")
  }

},[])

  const [allValues, setValues] = useState({
    userName: "",
    password: "",
    showErrorMsg:false,
    errorMsg:"",
  });

  const onChangeSubmite = async (e) => {
    e.preventDefault();
     console.log(allValues.userName);
     console.log(allValues.password);

    let api = "https://apis.ccbp.in/login";
    let userDetail = {
      username: allValues.userName,
      password: allValues.password
    };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetail),
    };
    const responce = await fetch(api, options);
    console.log(responce);
    const data = await responce.json();
    console.log(data);

    if(responce.ok === true){
      setValues({...allValues,showErrorMsg:false,errorMsg:""});
      console.log(data);
      Cookies.set("jwtToken",data.jwt_token);
      navigate("/");


    }else{
      setValues({...allValues,showErrorMsg:true,errorMsg:data.error_msg})
    }
    
  };

  const onChangeuser = (e) => {
    //console.log(e.target.value);
    setValues({ ...allValues, userName: e.target.value });
  };
  const onChangePassword = (e) => {
    // console.log(e.target.value);
    setValues({ ...allValues, password: e.target.value });
  };

  return (
    <div className="container1">
     <div style={{display:"flex", alignItems:"center"}}>
     <img width={70} height={50} src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
     <h1> Login </h1>
     </div>

      <div className="form-data">
        <form onSubmit={onChangeSubmite}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChangeuser}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChangePassword}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {
          allValues.showErrorMsg ? (<p className="text-danger" >{allValues.errorMsg}</p>) : null

        }
      </div>
    </div>
  );
};
export default Login;
