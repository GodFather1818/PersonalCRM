import React from 'react'
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
import Footer from "./components/Footer"
import Journal from './components/Journal'
import JournalDetail from './components/JournalDetail'
import CreateJournal from './components/CreateJournal'

function App() {

  return (
    <div>
        <NavbarE />
        <main className=''>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route  path="tasks/createone" element={<CreateTask />}/>
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/contacts' element = {<Contacts />} />
          <Route path='/contacts/createone' element={< CreateContact />}  />
          <Route path="/entries" element = {<Journal />} />
          <Route path='/entries/createone' element={<CreateJournal />} /> 
          <Route path='/entries/:id' element={<JournalDetail />} />
        </Routes>
        </main>
        <Footer />
  
    </div>
  )
}

export default App;
