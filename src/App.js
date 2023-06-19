import AvailabilityTable from "./components/AppointmentAvailability";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meeting from "./components/Room/Meeting";

function App() {
return(
  <>
  <BrowserRouter>
  <Routes>
        <Route exact path="/" element={<AvailabilityTable />}   />
        <Route path='/room/:roomId' element={<Meeting />} />
      </Routes>
  </BrowserRouter>
  </>
)
}

export default App;
