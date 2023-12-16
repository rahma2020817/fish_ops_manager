import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CreatedrecetteElement from "../../Components/Dashboard/CreateRecipe/CreatedrecetteElement";
import CreaterecetteHeadaer from "../../Components/Dashboard/CreateRecipe/CreaterecetteHeadaer";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
function CreateRecipe() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      // axios POST request
      const options = {
        url: "http://localhost:3000/recipe/create-recipe",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id: localStorage.getItem("organization_id") },
      };

      axios(options).then((response) => {

        setData(response.data.jobs);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen ">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background ">
        <div className="p-0">
          <TopNavigationBar title={"Recipes"} />
          <h1 className="heading1 ml-12  mt-2 text-transparent text-3xl sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-black ">MAKE YOUR OWN RECIPE</h1>
            
          <CreaterecetteHeadaer setData={setData} />
        </div>

        <div className="ml-8 flex flex-wrap  gap-6 mt-12 w-11/12 m-auto p-2">
          <CreatedrecetteElement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
