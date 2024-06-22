import {Routes,Route}from "react-router-dom"
import Home from "./components/home"
import Login from "./components/login" 
import Jobs from "./components/jobs" 
import DefaulPage from "./components/default"

const App=()=>{
  return(
    <>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/Login" element={ <Login /> }></Route>
      <Route path="/Jobs" element={ <Jobs /> }></Route>
      <Route path="/*" element={ <DefaulPage /> }></Route>
    </Routes>
  </>

  )
}
export default App;