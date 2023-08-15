import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// service
import { ListOrders } from "../../services/OrderServices";
import { DeleteOrders } from "../../services/OrderServices";

import Swal from "sweetalert2";

const ListDataOrder = () => {
  const [dataListOrder, setDataListOrder] = useState([]);

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
            window.location.reload();
          })
          .catch((err) => {
            console.log(err.message);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const GetDataOrder = async () => {
    const apirOrders = "https://64db7a91593f57e435b105e8.mockapi.io/orders";
    try {
      const responseData = await ListOrders(apirOrders);
      setDataListOrder(responseData);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    GetDataOrder();
  }, []);

  return (
    <>
      <div className="container-data">
        <h1 className="heading">Data Orders</h1>
        <table
          border={1}
          cellPadding={7}
          cellSpacing={0}
          className="table-data"
        >
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
          {dataListOrder.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.order_code}</td>
                <td>{data.order_name}</td>
                <td>{data.description}</td>
                <td>{data.created_date}</td>
                <td>{data.updated_date}</td>
                <td>{data.created_by}</td>
                <td className="action">
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
                  <button className="btn-view">View</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ListDataOrder;
