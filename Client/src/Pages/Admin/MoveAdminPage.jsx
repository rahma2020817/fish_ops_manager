import React, { useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";

function MoveAdminPage() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [allComment, setCmment] = useState({});


  useEffect(() => {
    // Fetch user profile from the server
    const fetchUserProfile = async () => {
      const options = {
        url: `http://localhost:3000/user/${id}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json;charset=UTF-8",
        },
      };

      await axios(options)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setUserProfile(response.data);
          } else {
            console.log(response.data);
            alert("Something went wrong while fetching user profile. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle errors
        });
    };

    // Fetch user posts
    const fetchUserPosts = async () => {
      const options = {
        url: `http://localhost:3000/recipe/get-user-recipes/${id}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json;charset=UTF-8",
        },
      };

      await axios(options)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setUserPosts(response.data);
          } else {
            console.log(response.data);
            alert("Something went wrong while fetching user posts. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle errors
        });
    };

    fetchUserProfile();
    fetchUserPosts();
  }, []);

  const fetchComments = async (postId) => {
    // Fetch comments for the post from the server
    const options = {
      url: `http://localhost:3000/recipe/get-comments/${postId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    await axios(options)
      .then((response) => {
        if (response.status === 200) {
          setCmment((prevComments) => ({
            ...prevComments,
            [postId]: response.data,
          }));
        } else {
          console.log(response.data);
          alert("Something went wrong while fetching comments. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle errors
      });
  };

  const setAllPostsComments = async () => {
    for (const post of userPosts) {
      await fetchComments(post._id);
    }
  };

  useEffect(() => {
    setAllPostsComments();
  }, [userPosts]);

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background ">
        <div className="flex flex-wrap gap-4">
          <TopNavigationBar title={"Fridge Inventory"} />
          <div className="container p-8">
            <h1 className="text-3xl sm:text-5xl font-semibold text-blue-500"> {userProfile.f_name} Profile Page</h1>
            <div className="mx-auto justify-center text-center items-center topNavigationBoxShadow bg-transparent max-w-screen-xl w-full px-8 ml-8 mr-8">

              <div className="mt-4">
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                  <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
                  <div className="grid grid-cols-1 gap-2">
                    <p className="text-xl font-medium">First Name:</p>
                    <p className="text-xl font-medium">{userProfile.f_name}</p>
                    <p className="text-xl font-medium">Last Name:</p>
                    <p className="text-lg">{userProfile.username}</p>
                    <p className="text-xl font-medium">Email:</p>
                    <p className="text-lg">{userProfile.email}</p>
                  </div>
                </div>

              </div>


              <div className="mt-8">
                <h3 className="text-3xl font-bold mb-6">{userProfile.f_name}'s Posts:</h3>
                {userPosts.map((post) => (
                  <div key={post._id} className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                    <div className="flex items-center justify-center h-48 mb-4">
                      <img src={post.image} alt={post.title} className="h-full max-w-full object-cover rounded-lg" />

                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">Ingredients:</h3>
                      <p className="text-lg leading-relaxed">{post.ingredients}</p>
                      <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
                      <p className="text-lg leading-relaxed">{post.description}</p>
                    </div>
                    {allComment[post._id] &&
                      allComment[post._id].map((comment) =>
                        comment.recipeID === post._id ? (
                          <div key={comment._id} className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p className="text-lg leading-relaxed">{comment.comment}</p>
                            <p className="text-sm mt-2 text-gray-600">Comment by {comment.name}</p>
                          </div>
                        ) : null
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoveAdminPage;

/* Styles CSS */
const styles = `
  .comment-bubble {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .comment-text {
    font-size: 14px;
  }
  
  .comment-author {
    font-size: 12px;
    color: #666;
  }
  `;

const styleElement = document.createElement("style");
styleElement.type = "text/css";
if (styleElement.styleSheet) {
  styleElement.styleSheet.cssText = styles;
} else {
  styleElement.appendChild(document.createTextNode(styles));
}
document.head.appendChild(styleElement);