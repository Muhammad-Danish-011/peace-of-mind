import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Avengers404/global/Sidebar';
import Home from './Avengers404/pages/home/Home';
import Councler from './Avengers404/pages/councler/Councler';
import Calendar from './Avengers404/pages/calendar/Calendar';
import Form from './Avengers404/pages/form/Form';
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/councler' element={<Councler />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/form' element={<Form/>} />
      </Routes>
    </Sidebar>
  </BrowserRouter>
    </div>
  );
}

export default App;

