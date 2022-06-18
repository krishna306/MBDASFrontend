
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import DataAnalytics from "./Pages/DataAnalytics";
import Forget from "./Pages/Forget";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewUser from "./Pages/NewUser";
function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path ="/dataanalytics" element = {<DataAnalytics/>} />
      <Route path ="/form" element ={<Home/>} />
      <Route path="/forget" element ={<Forget/>} />
      <Route path="/register" element={<NewUser/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
      
  );
}

export default App;
