import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminContainer from "./containers/AdminContainer";
import InquiryContainer from "./containers/InquiryContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InquiryContainer />} />
        <Route path="/admin" element={<AdminContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
