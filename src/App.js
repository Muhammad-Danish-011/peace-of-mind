import AvailabilityTable from "./components/AppointmentAvailability";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
return(
  <>
  <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<AvailabilityTable />}   />
      </Routes>
  </BrowserRouter>
  </>
)
}

export default App;
