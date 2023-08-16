import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ListOrders, DeleteOrders } from "../../../services/OrderServices";

import ReactPaginate from "react-paginate";


const ListDataOrder = () => {
  const [dataListOrder, setDataListOrder] = useState([]);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const pageCount = Math.ceil(dataListOrder.length / itemsPerPage);


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedData = dataListOrder.slice(startIndex, startIndex + itemsPerPage);


  const navigate = useNavigate();

  const RemoveData = async (id) => {
    const urlAPIDelete =
      "https://64db7a91593f57e435b105e8.mockapi.io/orders/" + id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteOrders(urlAPIDelete)
          .then(() => {
            GetDataOrder();
          })
          .catch((err) => {
            console.log(err.message);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const HandleViewDetail = (data) => {
    setModalData(data);
  };

  const GetDataOrder = async () => {
    const apiOrders = "https://64db7a91593f57e435b105e8.mockapi.io/orders";
    try {
      const responseData = await ListOrders(apiOrders);
      setDataListOrder(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataOrder();
  }, []);

  const HandleAddData = () => {
    navigate("/auth/dashboard/adddata");
};

  return (
    <div className="container-data">
      <div className="table-responsive">
      <h1 className="heading_header">Data Orders</h1>
      <div className="group_button_header">

      <button className="btn-addData" onClick={HandleAddData}>
        Add Data
      </button>
      </div>

        <table border={1} cellPadding={3} cellSpacing={0} className="table-data table table-bordered table-hover">
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
                    onClick={() => {
                      navigate("/auth/dashboard/editdata/" + data.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      RemoveData(data.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-view"
                    onClick={() => {
                      HandleViewDetail(data);
                    }}
                    data-bs-target="#exampleModal"
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

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                    disabled />
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
                    disabled />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDataOrder;
