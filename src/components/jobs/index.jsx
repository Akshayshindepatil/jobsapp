
import { useEffect, useState } from 'react';
import DisplayJobs from '../displayJobs';
import FilterSection from '../filterSection';
import Header from '../header';
import './index.css';
import Cookies from 'js-cookie';

const Jobs=()=>{
  const[allValues,setValue]=useState({
    jobsData:[],
    empType:[],
    salaryRange:"",
    serchData:""
    

  });



    const token =Cookies.get("jwtToken");
    
    useEffect(()=>{
        const fechedData= async()=>{
          const api=`https://apis.ccbp.in/jobs?employment_type=${allValues.empType}&minimum_package=${allValues.salaryRange}&search=${allValues.serchData}`
          const options = {
            method: 'GET',
            headers : {
                Authorization : `Bearer ${token}` 
            }
          }

          const responce= await fetch(api,options);
         
          const data=await responce.json();
          console.log(data.jobs);
          if(responce.ok===true){
            setValue({...allValues,jobsData:data.jobs})
          }
      

      
        }
        fechedData();

    },[allValues.serchData,allValues.empType,allValues.salaryRange])

    const onChangeIn=(e)=>{
      // console.log(e.key)
      if(e.key ==="Enter"){
        setValue({...allValues,serchData:e.target.value})
        console.log(e.target.value);
      }
     

    }


   const retriveFilterdata =(value,checked)=>{

        if(checked===true){
          setValue({...allValues,empType:[...allValues.empType, value]});
        
        }else{
          setValue({...allValues,empType:allValues.empType.filter(each=> each!==value)})
          
        }
      
        
   }

   const retriveSalaryData=(value,checked)=>{
    if(checked===true){
      setValue({...allValues,salaryRange:value})

    }else{
      // setValue({...allValues,salaryRange:""});

    }


   }
    
    return(
      <div>
         <Header/>
         <div className='filter-display-all-job-cont'>
            <div className='filter-section-cont'><FilterSection retriveData={retriveFilterdata} salrySata={retriveSalaryData}/></div>
            <div className='dispaly-all-jobs'> 
              <input type="serch" className='serch-bar' placeholder='serch' onKeyDown={onChangeIn} />
              <ul className='List-item'>
              {
                allValues.jobsData.map((each)=>
                <DisplayJobs jobsItem={each} key={each.id}/>
              )
              }
              </ul>
              </div>

         </div>
      </div>
       
    )
}
export default Jobs;