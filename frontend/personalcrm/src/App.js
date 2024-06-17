import React, {useEffect} from 'react'
import NavbarE from './components/Navbar'
import { Route, Routes} from "react-router-dom" 
import Tasks from "./components/Tasks"
import Calendar from "./components/Calendar"
import Home from './components/Home'
import CreateTask from './components/CreateTask'
import TaskDetail from './components/TaskDetail'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from './components/Contacts'
import CreateContact from './components/CreateContact'



function App() {
 
  return (
    <div>
        <NavbarE />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route  path="tasks/createone" element={<CreateTask />}/>
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/contacts' element = {<Contacts />} />
          <Route path='/contacts/create' element={< CreateContact />}  />
        </Routes>
  
    </div>
  )
}

export default App;
