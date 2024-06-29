import {Routes,Route}from "react-router-dom"
import Home from "./components/home"
import Login from "./components/login" 
import Jobs from "./components/jobs" 
import DefaulPage from "./components/default"
import ProtectedRaute from "./components/protectedRaute"
import DesplayJobDetails from "./components/displayJobDetails"

const App=()=>{
  return(
    <>
    <Routes>
      <Route path="/" element={ <ProtectedRaute Component={Home} /> } />
      <Route path="/Login" element={ <Login /> }></Route>
      <Route path="/Jobs" element={ <ProtectedRaute  Component={Jobs} /> }></Route>
      <Route path="/Jobs/:id" element={ <ProtectedRaute  Component={DesplayJobDetails} /> }></Route>
      <Route path="/*" element={ <DefaulPage /> }></Route>
    </Routes>
  </>

  )
}
export default App;