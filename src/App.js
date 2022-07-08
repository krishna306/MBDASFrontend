
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import AdminDashboard from "./Pages/AdminDashboard";
import DataAnalytics from "./Pages/DataAnalytics";
import Forget from "./Pages/Forget";
import DeceasedForm from "./Pages/DeceasedForm";
import Login from "./Pages/Login";
import NewUser from "./Pages/NewUser";
import Home from "./Pages/Home";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path ="/dataanalytics" element = {<DataAnalytics/>} />
      <Route path ="/form" element ={<DeceasedForm/>} />
      <Route path="/forget" element ={<Forget/>} />
      <Route path="/register" element={<NewUser/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
      <Route path ="/login" element = {<Login/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
      
  );
}

export default App;
// Uses local host at two placces 
// src\services\appApi.js  at Line number 6
// src\Pages\Forget.js at Line number 70