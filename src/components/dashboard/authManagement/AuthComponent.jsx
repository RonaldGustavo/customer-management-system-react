import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

// data
import DataUser from "../../../data/Datauser";

// utils
import { generateRandomNumber } from "../../../utilities/GenerateRandom";

const AuthComponent = () => {
  const [users, setUsers] = useState(DataUser);
  const [username, setDataUsername] = useState("");
  const [password, setDataPassword] = useState("");
  const [address, setDataAddress] = useState("");
  const [isClose, setIsClose] = useState("noModal");
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  // limit
  const itemsPerPage = 5;
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const displayedData = users.slice(startIndex, startIndex + itemsPerPage);

  // Handle Page Clicked
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setIsClose("noModal");
  }, []);

  // Set Modal Data
  const handleViewDetail = (datas) => {
    setModalData(datas);
  };

  // Delete User
  const handleDeleteUser = (userId) => {
    console.log("Delete user called with userId:", userId);

    Swal.fire({
      title: "Are you sure?",
      text: `Delete user_id: ${userId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d3 3",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const updatedUsers = users.filter((user) => user.userId !== userId);
          // console.log("Updated users:", updatedUsers);
          setUsers(updatedUsers);

          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  useEffect(() => {
    if (username && password && address) {
      setIsClose("modal");
    }
  }, [username, password, address]);

  //Create New Users
  const handleCreateUser = async () => {
    const randomNumbers = generateRandomNumber(10000, 99999); // Angka 5 digit
    const GenerateUserID = `USR${randomNumbers}`;

    if (!username || !password || !address) {
      Swal.fire("Error", "All fields are required.", "error");

      return;
    }
    const currenDate = new Date().toLocaleString();

    try {
      const newUser = {
        userId: GenerateUserID,
        username: username,
        password: password,
        address: address,
        created_date: currenDate,
        updated_date: currenDate,
      };
      setIsClose("noModal");

      // Add the new user
      setUsers((prevUsers) => [...prevUsers, newUser]);

      Swal.fire("Success", "User has been added.", "success");
      // Reset the input fields
      setDataUsername("");
      setDataPassword("");
      setDataAddress("");
    } catch (err) {
      console.log(err.message);
    }
  };

  // Update User
  const handleUpdateUser = () => {
    if (!username || !password || !address) {
      Swal.fire("Error", "All fields are required.", "error");
      return;
    }

    const currenDate = new Date().toLocaleString();
    try {
      const updatedUser = {
        userId: modalData.userId,
        username: username,
        password: password,
        address: address,
        created_date: modalData.created_date,
        updated_date: currenDate,
      };

      // Find the index of the user to update in the users array
      const userIndex = users.findIndex(
        (user) => user.userId === modalData.userId
      );

      if (userIndex !== -1) {
        // Create a new array with the updated user
        const updatedUsers = [...users];
        updatedUsers[userIndex] = updatedUser;

        setUsers(updatedUsers);
        Swal.fire("Success", "User has been updated.", "success");
        // Reset the input fields
        setDataUsername("");
        setDataPassword("");
        setDataAddress("");
        // Close the modal
        setIsClose("noModal");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="container-data">
        <h1 className="heading_header">Auth Management</h1>
        <div className="table-responsive">
          <div className="group_button_header">
            <button
              className="btn-addData"
              data-bs-target="#modaladd"
              data-bs-toggle="modal"
            >
              Add New Users
            </button>
          </div>

          <table
            border={1}
            cellPadding={3}
            cellSpacing={0}
            className="table-data table table-bordered table-hover"
          >
            <thead>
              <tr className="header_table">
                <th>User ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Address</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((data) => (
                <tr key={data.id}>
                  <td>{data.userId}</td>
                  <td>{data.username}</td>
                  <td>{data.password}</td>
                  <td>{data.address}</td>
                  <td>{data.created_date}</td>
                  <td>{data.updated_date}</td>
                  <td className="action">
                    <div className="action_container">
                      <button
                        className="btn-update"
                        data-bs-target="#modaledit"
                        data-bs-toggle="modal"
                        onClick={() => {
                          handleViewDetail(data);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(data.userId)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => {
                          handleViewDetail(data);
                        }}
                        data-bs-target="#modalDetailUser"
                        data-bs-toggle="modal"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

      {/* modal add new users */}
      <div
        className="modal fade"
        id="modaladd"
        tabIndex={-1}
        aria-labelledby="addNewUsers"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addNewUsers">
                Create New Users
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <>
              <div className="modal-body">
                <form action="" method="post" onSubmit={handleCreateUser}>
                  <div className="mb-3">
                    <label
                      htmlFor="idUsername"
                      className="form-label label-center"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="idUsername"
                      id="idUsername"
                      placeholder="Username"
                      className="form-control"
                      onChange={(e) => setDataUsername(e.target.value)}
                      value={username}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="idPassword"
                      className="form-label label-center"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      name="idPassword"
                      id="idPassword"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setDataPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="idAddress"
                      className="form-label label-center"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="idAddress"
                      id="idAddress"
                      className="form-control"
                      placeholder="Address"
                      onChange={(e) => setDataAddress(e.target.value)}
                      value={address}
                      required
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleCreateUser}
                  data-bs-dismiss={isClose}
                >
                  Submit
                </button>
              </div>
            </>
          </div>
        </div>
      </div>

      {/* modal detail */}
      <div
        className="modal fade"
        id="modalDetailUser"
        tabIndex={-1}
        aria-labelledby="detailUser"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="detailUser">
                Detail User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="idUser" className="col-form-label">
                    User ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idUser"
                    value={modalData.userId || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idUsername" className="col-form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idUsername"
                    value={modalData.username || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idPassword" className="col-form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idPassword"
                    value={modalData.password || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idAddress" className="col-form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idAddress"
                    value={modalData.address || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idcreatedat" className="col-form-label">
                    Created Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idcreatedat"
                    value={modalData.created_date || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idupdatedat" className="col-form-label">
                    Updated Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idupdatedat"
                    value={modalData.updated_date || ""}
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal Edit data */}
      <div
        className="modal fade"
        id="modaledit"
        tabIndex={-1}
        aria-labelledby="EditOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditOrderLabel">
                Edit User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form action="" method="post">
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    placeholder="ID"
                    className="form-control"
                    value={modalData.userId || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idUsernameDetail" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="idUsernameDetail"
                    id="idUsernameDetail"
                    placeholder="Username"
                    className="form-control"
                    onChange={(e) => setDataUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idPasswordDetail" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    name="idPasswordDetail"
                    id="idPasswordDetail"
                    placeholder="Password"
                    className="form-control"
                    onChange={(e) => setDataPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idAddressDetail" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    name="idAddressDetail"
                    id="idAddressDetail"
                    className="form-control"
                    placeholder="Address"
                    onChange={(e) => setDataAddress(e.target.value)}
                    value={address}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateUser}
                data-bs-dismiss={isClose}
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
