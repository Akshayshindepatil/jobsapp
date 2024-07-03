import "./index.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AlertLink } from "react-bootstrap";
// {job_details: {…}, similar_jobs: Array(3)}
// job_details
//  :  "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png"
// company_website_url : "https://about.netflix.com/en"
// employment_type: "Internship"
// id:"bb95e51b-b1b2-4d97-bee4-1d5ec2b96751"
// job_description: "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support."
// life_at_company : {description: 'Our core philosophy is people over process. Our cu…us common ground. We want to entertain the world.', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png'}
// location: "Delhi"
// package_per_annum:  "10 LPA"
// rating :  4

// title: "Devops Engineer"

// company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png"
// employment_type: "Freelance"
// id: "2b40029d-e5a5-48cc-84a6-b6e12d25625d"
// job_description:  "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration."
// location: "Delhi"
// rating : 4
// title: "Frontend Engineer"

// 1: {id: '3cc666e5-23a5-4981-ade2-61115f95ac0b', title: 'Frontend Engineer', company_logo_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png', location: 'Mumbai', employment_type: 'Part Time', …}
// 2: {id: '96e1ddb6-930c-4ca4-a80e-998ce410c6cf', title: 'Frontend Engineer', company_logo_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png', location: 'Bangalore', employment_type: 'Freelance', …}
// length: 3

const DisplayJobDetails = () => {
  const [allValue, setValue] = useState({
    jobData: null,
    similarJob: [],
  });

  const { id } = useParams();
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const jobApiDetails = async () => {
      const api = `https://apis.ccbp.in/jobs/${id}`;
      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(api, option);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setValue({
          ...allValue,
          jobData: data.job_details,
          similarJob: data.similar_jobs,
        });
      } else {
        setValue({ ...allValue, jobData: null, similarJob: [] });
      }
    };

    jobApiDetails();
  }, [id, token]); // Added dependencies

  return (
    <div className="main-cont">
      {allValue.jobData ? (
        <div className="display-card">
          <div className="logo-card">
            <img src={allValue.jobData.company_logo_url} alt="" />
            <div className="m-2">
              <h4>{allValue.jobData.title}</h4>
              <div>
                <FaStar className="rating" />
                <span>{allValue.jobData.rating}</span>
              </div>
            </div>
          </div>
          <div className="location-emp-lpa">
            <div className="loc-type">
              <FaBriefcase className="m-2" />
              <span>{allValue.jobData.employment_type}</span>
              <FaLocationDot className="m-2 " />
              <span>{allValue.jobData.location}</span>
            </div>
            <div>
              <h4>{allValue.jobData.package_per_annum}</h4>
            </div>
          </div>
          <hr className="bg-white" />
          <div>
            <h4>Discription</h4>
            <p>{allValue.jobData.job_description}</p>
          </div>

          <div className="skill-data">
            <h4>Skills</h4>
            {allValue.jobData.skills.map((each) => {
              return (
                <div key={each.name} className="skill">
                  <img
                    src={each.image_url}
                    alt=""
                    className="m-2"
                    height={30}
                  />
                  <span>{each.name}</span>
                </div>
              );
            })}
          </div>
          <div>
            <h4>Life Of Company</h4>
            <div className="d-flex">
              <p className="p-4">
                {allValue.jobData.life_at_company.description}
              </p>
              <img
                src={allValue.jobData.life_at_company.image_url}
                alt=""
                height={250}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Or some loading indicator
      )}

      <div className="job-card">
        {allValue.similarJob.map((each) => {
          return (
            <li className="similar-job-card">
              <div className="card-box">
                <img src={each.company_logo_url} alt="logo" className="m-2" />
                <div>
                  <h4>{each.title}</h4>
                  <div>
                    <FaStar className="rating" />
                    {each.rating}
                  </div>
                </div>
                
              </div>
              <div>
                  <FaBriefcase className="m-2" />
                  <span>{each.employment_type}</span>
                  <FaLocationDot className="m-2 " />
                  <span>{each.location}</span>
                </div>
                <hr className="bg-white" />
                <div >
                  <h4>Disciption</h4>
                  <p>{each.job_description}</p>
                </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayJobDetails;
