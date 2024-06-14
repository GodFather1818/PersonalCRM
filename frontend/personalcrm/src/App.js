import React from 'react'
import NavbarE from './components/Navbar'
import { Route, Routes} from "react-router-dom" 
import Tasks from "./components/Tasks"
import Calendar from "./components/Calendar"
import Home from './components/Home'
import CreateTask from './components/CreateTask'
import TaskDetail from './components/TaskDetail'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      
    
        <NavbarE />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route  path="tasks/createone" element={<CreateTask />}/>
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
          <Route path='calendar' element={<Calendar />} />
        </Routes>
  
    </div>
  )
}

export default App
