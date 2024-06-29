import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";

const FilterSection = (props) => {

  const {retriveData,salrySata}=props;
  const [allValues, setValue] = useState({
    profile: {},
  });

  const token = Cookies.get("jwtToken");
  const empTypeList = [
    {
      labale: "full time",
      empId: "FULLTIME",
    },
    {
      labale: "part time",
      empId: "PARTTIME",
    },
    {
      labale: "Freelance",
      empId: "FREELANCE",
    },
    {
      labale: "internship",
      empId: "INTERNSHIP",
    },
  ];

  const salaryTypeList=[
    {
        labale: "10LPA and above",
        Id: "1000000",
    },
    {
        labale: "20LPA and above",
        Id: "2000000",
    },
    {
        labale: "30LPA and above",
        Id: "3000000",
    },
    {
        labale: "40LPA and above",
        Id: "4000000",
    },

]

  useEffect(() => {
    const apiCall = async () => {
      const api = "https://apis.ccbp.in/profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const responce = await fetch(api, options);
      // console.log("responce:",responce);
      const data = await responce.json();

      if (responce.ok === true) {
        console.log(data.profile_details);
        setValue({ ...allValues, profile: data.profile_details });
      }
    };

    apiCall();
  }, []);

  const onchangeEmpType=(e)=>{
    //console.log(e);
    retriveData(e.target.value,e.target.checked);
    
  }

  const onChangeSalary=(e)=>{
    //console.log(e.target.value);
    salrySata(e.target.value,e.target.checked);

  }

  return (
    <div>
      <div className="profile-cont">
        <img src={allValues.profile.profile_image_url} alt="" />
        <h1 className="profile-name">{allValues.profile.name}</h1>
        <p>{allValues.profile.short_bio}</p>
      </div>
      <hr />
      <h3 className="heading">Type Of Employment</h3>
      <ul className="emptype-list">
        {empTypeList.map((each) => {
          return (
            <li key={each.empId}>
              <input type="checkbox" className="checked" value={each.empId} id={each.empId} onChange={onchangeEmpType} />
              <label htmlFor={each.empId}>{each.labale}</label>
            </li>
          );
        })}
      </ul>
      <hr />
      <h3 className="heading">Type of salary</h3>
      <ul className="emptype-list">
        {
          salaryTypeList.map(each=>{
            return(
                <li key={each.Id}>
                    <input type="radio" className="check-box" value={each.Id} id={each.Id} onChange={onChangeSalary}/>
                    <label htmlFor={each.Id}>{each.labale}</label>
                </li>
            )
          })
        }
      </ul>
    </div>
  );
};
export default FilterSection;
