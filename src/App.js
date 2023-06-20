import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './global/Sidebar';
import Home from './pages/home/Home';
import Councler from './pages/councler/Councler';
import Calendar from './pages/calendar/Calendar';
import Form from './pages/form/Form';
import './App.css';
import Navbar from './global/Navbar';
import SurveyComponent from './Components/SurveyComponent';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
    <Sidebar>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/councler' element={<Councler />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/form' element={<Form/>} />
      </Routes>
    </Sidebar>
  </BrowserRouter>

  {/* <SurveyComponent></SurveyComponent> */}
    </div>
  );
}

export default App;

