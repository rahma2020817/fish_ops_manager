import "./App.css";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Registration from "./Pages/Auth/Registration";
import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import VerifyOPT from "./Pages/Auth/VerifyOPT";
import EnterNewPassword from "./Pages/Auth/EnterNewPassword";
import HomePage from "./Pages/Dashboard/HomePage";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import CreateRecipe from "./Pages/CreateRecipe/CreateRecipe";
import PostRecipe from "./Pages/CreateRecipe/PostRecipe";
import CargoDetailPage from "./Pages/Cargo/CargoDetail/CargoDetailPage";
import CargoItemDetailPage from "./Pages/Cargo/CargoItemDetail/CargoItemDetailPage";
import CargoForm from "./Pages/Cargo/CargoForm/CargoForm";
import CargoItemForm from "./Pages/Cargo/CargoForm/ItemDetailsForm";

import { useEffect } from "react";

function App() {
//  const isAuthenticated = localStorage.getItem("token");
//  useEffect(() => { }, [isAuthenticated]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgetpwd" element={<ForgetPassword />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/verifyotp" element={<VerifyOPT />} />
        <Route path="/newpassword" element={<EnterNewPassword />} />
        <Route path="/createrecipe" element={<CreateRecipe />}></Route>
        <Route path="/post" element={<PostRecipe />}></Route>
        <Route path="/cargo/:id" element={<CargoDetailPage />}></Route>
        <Route path="/cargo/item/:id" element={<CargoItemDetailPage />}></Route>
        <Route path="/cargo/add" element={<CargoForm />}></Route>
        <Route path="/cargo/item/add/:id" element={<CargoItemForm />}></Route>
        <Route
          path="/home"
          element={
             <HomePage />
            // <ProtectedRoute
              // isSignedIn={isAuthenticated}
              // children={<HomePage />}
            // ></ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;