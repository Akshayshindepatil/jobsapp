import "./index.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AlertLink } from "react-bootstrap";

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
