import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

// services
import {
  listOrders,
  deleteOrders,
  createOrder,
  updateOrder,
} from "../../../services/OrderServices";

// utils
import { generateRandomNumber } from "../../../utilities/GenerateRandom";

const OrderDataComponent = () => {
  const [dataListOrder, setDataListOrder] = useState([]);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isClose, setIsClose] = useState("noModal");

  const [id, setId] = useState(0);
  const [dataOrderCode, setDataOrderCode] = useState("");
  const [dataOrderName, setDataOrderName] = useState("");
  const [dataDescripton, setDataDescrption] = useState("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const filteredData = dataListOrder.filter(
    (data) =>
      data.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.order_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.order_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.created_by.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsClose("noModal");
    handleGetOrder();
  }, []);

  useEffect(() => {
    if (dataOrderName && dataDescripton) {
      setIsClose("modal");
    }
  }, [dataOrderName, dataDescripton]);

  const getDataUser = localStorage.getItem("authUser");

  // limit
  const itemsPerPage = 6;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle Page Clicked
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Set Modal Data
  const handleViewDetail = (datas) => {
    setModalData(datas);
  };

  // Delete Order
  const handleDeleteOrder = async (id) => {
    const urlAPIDelete =
      "https://64db7a91593f57e435b105e8.mockapi.io/orders/" + id;

    Swal.fire({
      title: "Are you sure?",
      text: `Delete ID: ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrders(urlAPIDelete)
          .then(() => {
            handleGetOrder();
          })
          .catch((err) => {
            console.log(err.message);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // Create New Order
  const handleCreateOrder = async (e) => {
    e.preventDefault();

    // jika true proses selesai
    if (isCreatingOrder) {
      return;
    }

    // set Order On Progress mencegah double submit
    setIsCreatingOrder(true);

    const randomNumbers = generateRandomNumber(10000, 99999);
    const GenerateOrderCode = `ORD${randomNumbers}`;

    if (!dataOrderName || !dataDescripton) {
      // reset
      setIsCreatingOrder(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields before submitting!",
      });
      return;
    }

    const urlCreateOrder = "https://64db7a91593f57e435b105e8.mockapi.io/orders";
    const currenDate = new Date().toLocaleString();

    const postData = {
      order_code: GenerateOrderCode,
      order_name: dataOrderName,
      description: dataDescripton,
      created_date: currenDate,
      updated_date: currenDate,
      created_by: getDataUser,
    };

    try {
      const response = await createOrder(urlCreateOrder, postData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Success Created`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        handleGetOrder();
        setDataOrderCode(GenerateOrderCode);
        setDataOrderName("");
        setDataDescrption("");
        setIsClose("noModal");
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      // reset
      setIsCreatingOrder(false);
    }
  };

  // Update Order
  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    if (!dataOrderName || !dataDescripton) {
      Swal.fire("Error", "All fields are required.", "error");

      return;
    }

    const urlAPIUpdate =
      "https://64db7a91593f57e435b105e8.mockapi.io/orders/" + modalData.id;
    const currenDate = new Date().toLocaleString();

    const putData = {
      id: id,
      order_code: modalData.order_code,
      order_name: dataOrderName,
      description: dataDescripton,
      updated_date: currenDate,
      created_by: getDataUser,
    };

    const res = await updateOrder(urlAPIUpdate, putData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Success Updated`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      handleGetOrder();
      setDataOrderName("");
      setDataDescrption("");
      setIsClose("noModal");
    });
  };

  // Get Data Orders
  const handleGetOrder = async () => {
    const apiOrders = "https://64db7a91593f57e435b105e8.mockapi.io/orders";
    try {
      const responseData = await listOrders(apiOrders);
      setDataListOrder(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-data">
      <h1 className="heading_header">Order Management</h1>
      <div className="table-responsive">
        <div className="group_button_header">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button
            className="btn-addData"
            data-bs-target="#modaladd"
            data-bs-toggle="modal"
          >
            Create Order
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
              <th>id</th>
              <th>Order_code</th>
              <th>Order_name</th>
              <th>Description</th>
              <th>Created_date</th>
              <th>Updated_date</th>
              <th>Created_by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.order_code}</td>
                <td>{data.order_name}</td>
                <td>{data.description}</td>
                <td>{data.created_date}</td>
                <td>{data.updated_date}</td>
                <td>{data.created_by}</td>
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
                      onClick={() => {
                        handleDeleteOrder(data.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-view"
                      onClick={() => {
                        handleViewDetail(data);
                      }}
                      data-bs-target="#modalDetailOrder"
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

      {/* modal detail */}
      <div
        className="modal fade"
        id="modalDetailOrder"
        tabIndex={-1}
        aria-labelledby="DetailOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="DetailOrderLabel">
                Detail Order
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
                  <label htmlFor="idOrder" className="col-form-label">
                    Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idOrder"
                    value={modalData.id || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idCode" className="col-form-label">
                    Order Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idCode"
                    value={modalData.order_code || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idOrderName" className="col-form-label">
                    Order Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idOrderName"
                    value={modalData.order_name || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="iddescription" className="col-form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="iddescription"
                    value={modalData.description || ""}
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
                <div className="mb-3">
                  <label htmlFor="idcreatedby" className="col-form-label">
                    Created By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idcreatedby"
                    value={modalData.created_by || ""}
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

      {/* modal add data */}
      <div
        className="modal fade"
        id="modaladd"
        tabIndex={-1}
        aria-labelledby="AddOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddOrderLabel">
                Create New Order
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
                <form action="" method="post">
                  <div className="mb-3">
                    <label htmlFor="ordername" className="form-label">
                      Order Name
                    </label>
                    <input
                      type="text"
                      name="ordername"
                      id="ordername"
                      placeholder="Order Name"
                      className="form-control"
                      onChange={(e) => setDataOrderName(e.target.value)}
                      value={dataOrderName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="form-control"
                      placeholder="Description"
                      onChange={(e) => setDataDescrption(e.target.value)}
                      value={dataDescripton}
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
                  onClick={handleCreateOrder}
                  data-bs-dismiss={isClose}
                >
                  Submit Order
                </button>
              </div>
            </>
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
                Edit Order
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
                    ID
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="id"
                    placeholder="ID"
                    className="form-control"
                    value={modalData.id || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ordercode" className="form-label">
                    Order Code
                  </label>
                  <input
                    type="text"
                    name="ordercode"
                    id="ordercode"
                    placeholder="Order Code"
                    className="form-control"
                    onChange={(e) => setDataOrderCode(e.target.value)}
                    value={modalData.order_code || ""}
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ordername" className="form-label">
                    Order Name
                  </label>
                  <input
                    type="text"
                    name="ordername"
                    id="ordername"
                    placeholder="Order Name"
                    className="form-control"
                    onChange={(e) => setDataOrderName(e.target.value)}
                    value={dataOrderName}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Description"
                    onChange={(e) => setDataDescrption(e.target.value)}
                    value={dataDescripton}
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
                onClick={handleUpdateOrder}
                data-bs-dismiss={isClose}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -- */}
    </div>
  );
};

export default OrderDataComponent;
