import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Confetti from "react-confetti";
import { MdAddCircleOutline, MdClose } from "react-icons/md";

function PostRecipe() {
  const [filters, setFilters] = useState([]);
  const navigate = useNavigate();
  const [apiFetched, setAPIFetched] = useState(false);
  const [text, setText] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    filterTags: [],
    image: null,
  });

  const handleAdd = () => {
    setFilters([...filters, text]);
    setText("");
  };

  const handleDelete = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const imgFilehandler = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      console.log(reader.result);
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
      reader.onerror = function () {
        console.log(reader.error);
      };
    };
  };

  const handleSubmit = async () => {
    const postData = {
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients.split(","),
      filterTags: filters,
      image: formData.image,
    };

    console.log(postData);
    const options = {
      url: "http://localhost:3000/recipe/create-recipe",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: postData,
    };

   await axios(options)
      .then((response) => {
        if (response.status === 201) {
          setAPIFetched(true);
        } else {
          console.log(response.data)
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        // Gérer les erreurs
      });
  };

  const handleNext = () => {
    // navigate to /home
    navigate("/forum");
  };

  return (
    <div className="flex bg-white mb-8">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Recipes"} />
        </div>
        <h1 className="heading1 ml-12  mt-2 text-transparent text-3xl sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-black ">CREATE YOUR OWN RECIPE</h1>
            
        {apiFetched ? (
          <div>
            <Confetti style={{ width: "90%" }} height={220} />

            <div
              className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
              id="modal-id"
            >
              <div className="absolute bg-black opacity-80 inset-0 z-0" />
              <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                <div>
                  <div className="text-center p-5 flex-auto justify-center">
                    <svg
                      fill="rgb(1,160,20)"
                      className="w-16 h-16 block m-auto text-blue-500"
                      viewBox="0 0 24 24"
                      id="d9090658-f907-4d85-8bc1-743b70378e93"
                      data-name="Livello 1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>prime</title>
                      <path
                        id="70fa6808-131f-4233-9c3a-fc089fd0c1c4"
                        data-name="done circle"
                        d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z"
                      />
                    </svg>
                    <h2 className="text-xl font-bold py-4">Congratulations</h2>
                    <p className="text-sm text-gray-500 px-8">
                      Recipe has been posted successfully
                    </p>
                  </div>
                  <div className="p-3 mt-2 text-center space-x-4 md:block">
                    <button
                      onClick={handleNext}
                      className="text-lg mb-2 md:mb-0 bg-gray-900 px-5 py-2 shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-black"
                    >
                      Continue...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

      <div className="modalShadow bg-white block m-auto w-4/5 mt-14 p-8 rounded-lg">
  <h2 className="heading2b text-center text-primarytext">
    Create New Recipe
  </h2>

  <p className="line1 text text-secondrytext w-4/5 m-auto text-center mb-6">
    Share your recipes to showcase your skills and help others find the perfect recipe.
  </p>

  <div className="flex flex-col w-4/5 mt-5 m-auto">
    <div className="w-full mr-1">
      <label className="label block line1 mb-2" htmlFor="title">
        Title
      </label>
      <div className="flex items-center">
        <input
          name="title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
          placeholder="Delicious Vegan Pasta"
          autoComplete="on"
          className="input input-bordered w-full max-w-sm p-2 rounded"
        />
      </div>
    </div>
  </div>

  <div className="flex w-4/5 m-auto mt-4">
    <div className="w-1/2">
      <label className="label block line1 mb-2" htmlFor="filters">
        Filters
      </label>
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          placeholder="Add Filters"
          onChange={(e) => setText(e.target.value)}
          autoComplete="on"
          className="input input-bordered h-10 max-w-sm inline p-2 rounded-l"
        />
        <button
          className="inline text-center text-gray-600 text-2xl ml-2 mt-1 hover:text-black hover:font-bold"
          onClick={handleAdd}
        >
          <MdAddCircleOutline />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap">
        {filters.map((filter, index) => (
          <div
            key={index}
            value={filter}
            className="option bg-blue-500 text-white rounded-2xl m-1 p-2 font-semibold"
          >
            {filter}
            <span
              className="ml-2 text-white cursor-pointer"
              onClick={() => handleDelete(index)}
            >
              <MdClose />
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="flex flex-col w-4/5 mt-4 m-auto">
    <label className="label block line1 mb-2" htmlFor="ingredients">
      Ingredients
    </label>
    <div className="flex items-center">
      <textarea
        id="ingredients"
        value={formData.ingredients}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            ingredients: e.target.value,
          }))
        }
        placeholder="Enter the ingredients separated by commas"
        className="input input-bordered w-full max-w-sm p-2 rounded"
        rows={3}
      ></textarea>
    </div>
  </div>

  <div className="flex flex-col w-4/5 mt-4 m-auto">
    <label className="label block line1 mb-2" htmlFor="instructions">
      Instructions
    </label>
    <div className="flex items-center">
      <textarea
        id="instructions"
        value={formData.description}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            description: e.target.value,
          }))
        }
        placeholder="Enter the instructions separated by commas"
        className="input input-bordered w-full max-w-sm p-2 rounded"
        rows={6}
      ></textarea>
    </div>
  </div>

  <div className="flex flex-col w-4/5 m-auto mt-4">
    <div>
      <label className="label block line1 mb-2">
        Select a cover photo
      </label>
      <label
        htmlFor="filePicker"
        className="text-sm btn w-18 m-auto bg-primary border-none hover:bg-black rounded-md text-white p-2 cursor-pointer"
      >
        Upload
      </label>
      <input
        accept="image/*"
        type="file"
        id="filePicker"
        onChange={imgFilehandler}
        style={{ visibility: "hidden" }}
      />
      {formData.image === "" || formData.image === null ? (
        ""
      ) : (
        <img
          width={200}
          height={200}
          src={formData.image}
          alt="Cover"
          className="mt-3 rounded-md"
        />
      )}
    </div>
    <div>
      <p className="text-secondrytext line2 mt-2">
        *The cover photo will be displayed on the recipe page
      </p>
    </div>
  </div>

  <div className="mt-8 text-center">
    <button
      onClick={handleSubmit}
      type="submit"
      className="btnfont btn btn-wide bg-primary border-none hover:bg-black text-white p-3 rounded-lg"
    >
      NEXT
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

export default PostRecipe;
