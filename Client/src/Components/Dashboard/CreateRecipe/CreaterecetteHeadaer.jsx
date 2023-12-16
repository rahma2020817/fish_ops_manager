import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CreaterecetteHeadaer({ setData }) {
  const [recetteStatus, SetrecetteStatus] = useState(false);
  const [departmentStatus, SetDepartmentStatus] = useState(false);
  const filterShowClosedrecettes = () => {
    // axios POST request
    const options = {
      url: "http://localhost:3000/recette/get-recettes/closed",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { id: localStorage.getItem("organization_id") },
    };

    axios(options).then((response) => {
      // console.log(response);
      setData(response.data.recettes);
    });
  };
  const filterShowActiverecettes = () => {
    // axios POST request
    const options = {
      url: "http://localhost:3000/recette/get-recettes/active",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { id: localStorage.getItem("organization_id") },
    };

    axios(options).then((response) => {
      // console.log(response);
      setData(response.data.recettes);
    });
  };

  return (
    <div className="flex  w-10/12  m-auto justify-center text-center items-center  topNavigationBoxShadow bg-transparent mt-2 p-10   ml-12 h-14  ">
      {/* --> Main Create recette Button */}

      <div className="w-2/6 text-center">
        <Link to={"/post"}>
          <button
            type="submit"
            className="btnfont btn btn-md  bg-primary border-none hover:bg-black"
          >
            Create a new recipe
          </button>
        </Link>
      </div>

      {/* 2nd flex div */}

      <div className="w-full flex justify-end items-center mr-12  ">
        {/* ==> recette Status Button */}
        <button
          onClick={() => SetrecetteStatus(!recetteStatus)}
          className="btn bg-transparent text-secondry normal-case gap-2 ml-8  rounded-lg border-0 border-solid border-secondry hover:bg-primary  hover:border-solid hover:border-primary hover:text-white "
        >
          Recipes Status
        </button>
        {recetteStatus == true ? (
          <div className="top-36 right-96 absolute  dropdown-bottom">
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 "
            >
              <li onClick={filterShowActiverecettes}>
                <a>Active</a>
              </li>
              <li onClick={filterShowClosedrecettes}>
                <a>Closed</a>
              </li>
            </ul>
          </div>
        ) : null}
        { }
        { }
      </div>
    </div>
  );
}

export default CreaterecetteHeadaer;
