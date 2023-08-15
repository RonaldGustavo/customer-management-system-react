import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// service
import { CreateOrder } from "../../services/OrderServices";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

//alert
import Swal from "sweetalert2";

const AddDataOrder = () => {
  const AuthUser = localStorage.getItem("authUser");

  const [dataOrderCode, setDataOrderCode] = useState("");
  const [dataOrderName, setDataOrderName] = useState("");
  const [dataDescripton, setDataDescrption] = useState("");

  const navigate = useNavigate();

  const getDataUser = localStorage.getItem("authUser");

  useEffect(() => {
    if (!AuthUser) {
      navigate("/");
    }
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const urlCreateOrder = "https://64db7a91593f57e435b105e8.mockapi.io/orders";

    const currenDate = new Date().toLocaleString();

    const postData = {
      order_code: dataOrderCode,
      order_name: dataOrderName,
      description: dataDescripton,
      created_date: currenDate,
      updated_date: currenDate,
      created_by: getDataUser,
    };

    const response = await CreateOrder(urlCreateOrder, postData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Success Created`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/auth/dashboard");
    });
  };

  const HandleBack = () => {
    navigate("/auth/dashboard");
  };

  return (
    <>
      <div className="container_dashboard">
        <div className="container-adddata">
          <h1 className="heading">Add Data</h1>
          <form
            action=""
            id="form-adddata"
            method="post"
            onSubmit={HandleSubmit}
          >
            <label For="ordercode" className="label">
              Order Code
            </label>
            <input
              type="text"
              name="ordercode"
              id="ordercode"
              placeholder="Order Code"
              className="input"
              onChange={(e) => setDataOrderCode(e.target.value)}
              value={dataOrderCode}
              required
            ></input>
            <label For="ordername" className="label">
              Order Name
            </label>
            <input
              type="text"
              name="ordername"
              id="ordername"
              placeholder="Order Name"
              className="input"
              onChange={(e) => setDataOrderName(e.target.value)}
              value={dataOrderName}
              required
            ></input>
            <label For="description" className="label">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="input"
              placeholder="Description"
              onChange={(e) => setDataDescrption(e.target.value)}
              value={dataDescripton}
              required
            ></input>

            <div className="group_button">
              <button type="button" id="btn-cancel" onClick={HandleBack}>
                Cancel
              </button>
              <button type="submit" id="btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDataOrder;
