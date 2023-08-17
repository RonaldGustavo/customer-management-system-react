import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

// services
import {
  ListCustomer,
  DeleteCustomers,
} from "../../../services/CustomerServices";

const CustomerComponent = () => {
  const [dataListOrder, setDataListOrder] = useState([]);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetDataCustomers();
  }, []);

  // limit
  const itemsPerPage = 6;
  const pageCount = Math.ceil(dataListOrder.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const displayedData = dataListOrder.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle Page Clicked
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get Data Customers
  const handleGetDataCustomers = async () => {
    const apiCustomers =
      "https://64db7a91593f57e435b105e8.mockapi.io/customers";
    try {
      const responseData = await ListCustomer(apiCustomers);
      setDataListOrder(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Customer
  const handleDeleteCustomer = async (id) => {
    const urlAPIDelete =
      "https://64db7a91593f57e435b105e8.mockapi.io/customers/" + id;

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
        DeleteCustomers(urlAPIDelete)
          .then(() => {
            handleGetDataCustomers();
          })
          .catch((err) => {
            console.log(err.message);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // Set Modal Data
  const handleViewDetail = (datas) => {
    setModalData(datas);
  };

  return (
    <div className="container-data">
      <h1 className="heading_header">Customer Management</h1>
      <div className="table-responsive">
        <table
          border={1}
          cellPadding={3}
          cellSpacing={0}
          className="table-data table table-bordered table-hover"
        >
          <thead>
            <tr className="header_table">
              <th>id</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Gender</th>
              <th>No HP</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.customer_id}</td>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.email}</td>
                <td>{data.gender}</td>
                <td>{data.no_hp}</td>
                <td className="action">
                  <div className="action_container">
                    <button
                      className="btn-view"
                      onClick={() => {
                        handleViewDetail(data);
                      }}
                      data-bs-target="#modalDetailCustomer"
                      data-bs-toggle="modal"
                    >
                      View
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        handleDeleteCustomer(data.id);
                      }}
                    >
                      Delete
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
        id="modalDetailCustomer"
        tabIndex={-1}
        aria-labelledby="detailCustomerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="detailCustomerLabel">
                Detail Customer
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
                  <label htmlFor="idcus" className="col-form-label">
                    Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idcus"
                    value={modalData.id || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idcustomer" className="col-form-label">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idcustomer"
                    value={modalData.customer_id || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idname" className="col-form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idname"
                    value={modalData.name || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idaddress" className="col-form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idaddress"
                    value={modalData.address || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idemail" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idemail"
                    value={modalData.email || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idGender" className="col-form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idGender"
                    value={modalData.gender || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idNoHP" className="col-form-label">
                    No HP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idNoHP"
                    value={modalData.no_hp || ""}
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

      {/* -- */}
    </div>
  );
};

export default CustomerComponent;
