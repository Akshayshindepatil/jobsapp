import "./index.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const DisplayJobDetails = () => {
  const [allValue, setValue] = useState({
    jobData: null,
    similarJob: [],
  });
  console.log(allValue.similarJob);
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
  }, []);

  return (
    <div className="main-con">
      {allValue.jobData && (
        <ul>
          <li className="jobs-card-cont">
            <div className="top-section">
              <img
                src={allValue.jobData.company_logo_url}
                alt="company logo"
                className="web-logo"
              />
              <div>
                <h4>{allValue.jobData.title}</h4>
                <FaStar className="icons-star" />
                <span>{allValue.jobData.rating}</span>
              </div>
            </div>
            <div className="location-emp-cont">
              <div>
                <FaBriefcase className="m-2" />
                <span>{allValue.jobData.location}</span>
                <FaLocationDot className="m-2" />
                <span>{allValue.jobData.employment_type}</span>
              </div>
              <div>
                <h3>{allValue.jobData.package_per_annum}</h3>
              </div>
            </div>
            <hr className="bg-col" />
            <h4>Description</h4>
            <p>{allValue.jobData.job_description}</p>
            <div>
              <h4>Skills</h4>
              {allValue.jobData.skills.map((skill, index) => (
                <div className="skill-d" key={index}>
                  <div className="img-d">
                    <img src={skill.image_url} alt={skill.name} />
                  </div>
                  <div className="img-d">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h4>Life of Company</h4>
              <div className="Life-of-compony">
                <p>{allValue.jobData.life_at_company.description}</p>
                <img
                  src={allValue.jobData.life_at_company.image_url}
                  alt="life at company"
                />
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DisplayJobDetails;
