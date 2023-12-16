import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import axios from "axios";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const options = {
        url: "http://localhost:3000/is-admin",
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
            setIsAdmin(true);
          } else {
            console.log(response.data);
            window.location.href = "/home";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUserProfile();
    }
  }, [isAdmin]);

  const fetchUserProfile = async () => {
    const options = {
      url: `http://localhost:3000/users`,
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
          setUserProfile(response.data);
        } else {
          console.log(response.data);
          alert("Something went wrong while fetching user profile. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = async (userId) => {
    try {
      const options = {
        url: `http://localhost:3000/user/${userId}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json;charset=UTF-8",
        },
      };

      const response = await axios(options);

      if (response.status === 200) {
        // Refresh user profile data after successful deletion
        fetchUserProfile();
      } else {
        console.log(response.data);
        alert("Something went wrong while deleting user. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckProfile = (userId, username) => {
    window.location.href = `/Admin/${username}/${userId}`;
  };

  if (isAdmin) {
    return (
      <div className="flex bg-white">
        <div className="hidden sm:block w-2/12 bg-white h-screen">
          <LeftMenuBar />
        </div>
        <div className="w-full bg-background ">
          <div className="flex flex-wrap gap-4">
            <TopNavigationBar title={"Admin Page"} />
            <h1 h1 className="heading1 ml-12  mt-2 text-transparent text-3xl sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-black">ADMIN PAGE</h1>
            <div className="mx-auto justify-center text-center items-center topNavigationBoxShadow bg-transparent max-w-screen-xl w-full px-8 ml-8 mr-8">

              {/* Display the list of users in a table */}
              <div className="container mt-4">
                <h1 className="text-3xl font-semibold mb-4">Users Informations</h1>

                <div className="d-flex justify-content-end">
                  <div className="ml-12">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Company Name</th>
                          <th>User Profile</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userProfile.map((user) => (
                          <tr key={user._id}>
                            <td>
                              <Link to={`/MoveAdmin//${user.username}/${user._id}`}>
                                {user.f_name}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/MoveAdmin//${user.username}/${user._id}`}>
                                {user.username}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/MoveAdmin//${user.username}/${user._id}`}>
                                {user.email}
                              </Link></td>
                            <td>{user.role}</td>
                            <td>{user.company_name}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => handleCheckProfile(user._id, user.username)}
                                >
                                  Check User Profile
                                </button>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteUser(user._id)}
                                >
                                  Delete User
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex bg-white">
        <div className="hidden sm:block w-2/12 bg-white h-screen">
          <LeftMenuBar />
        </div>
        <div className="w-full bg-background ">
          <div className="flex flex-wrap gap-4">
            <TopNavigationBar title={"Fridge Inventory"} />
            <div className="w-full bg-background ">
              <div className="flex flex-wrap gap-4"></div>
              <div>Access Forbidden ... Are you an admin?</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminPage;

const styles = `
                .container {
                    max - width: 800px;
                margin: 0 auto;
                padding: 20px;
  }

                .forum-title {
                    text - align: center;
                font-size: 36px;
                margin-bottom: 30px;
  }

                .posts {
                    display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
  }

                .post {
                    background - color: #f9f9f9;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 8px;
  }

                .post-title {
                    font - size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
  }

                .post-image {
                    width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 10px;
  }

                .post-details {
                    font - size: 16px;
  }

                .post-heading {
                    font - weight: bold;
                margin-top: 20px;
                margin-bottom: 10px;
  }

                .post-text {
                    margin - bottom: 20px;
  }
                .post-author {
                    font - size: 14px;
                font-style: italic;
                margin-bottom: 10px;
  }

                .post-comments {
                    margin - top: 20px;
  }

                .comment-bubble {
                    background - color: #f5f5f5;
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
  }

                .comment-text {
                    font - size: 14px;
  }

                .comment-author {
                    font - size: 12px;
                font-style: italic;
  }
                .comment-input {
                    margin - top: 10px;
  }

                .comment-input input {
                    width: 100%;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-right: 10px;
  }

                .comment-input button {
                    background - color: #007bff;
                color: #fff;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
  }

                .comment-input button:hover {
                    background - color: #0056b3;
  }

                /* Style for post and comment like buttons */
                .post-likes,
                .comment-likes {
                    margin - top: 10px;
  }

                .post-likes button,
                .comment-likes button {
                    background - color: transparent;
                border: none;
                cursor: pointer;
                font-size: 16px;
  }

                /* Add your custom styles for like button appearance */
                .post-likes button:hover,
                .comment-likes button:hover {
                    /* ... (add hover styles here) ... */
                }
                `;