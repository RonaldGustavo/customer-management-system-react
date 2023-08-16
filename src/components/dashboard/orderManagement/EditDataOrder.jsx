import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// service
import { ListOrders } from "../../../services/OrderServices";
import { UpdateOrder } from "../../../services/OrderServices";

// alert
import Swal from "sweetalert2";

const EditDataOrder = () => {
  const AuthUser = localStorage.getItem("authUser");

  const [id, setId] = useState(0);
  const [dataOrderCode, setDataOrderCode] = useState("");
  const [dataOrderName, setDataOrderName] = useState("");
  const [dataDescripton, setDataDescrption] = useState("");

  const { dataid } = useParams();

  const getDataUser = localStorage.getItem("authUser");

  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthUser) {
      navigate("/");
    }
  });

  useEffect(() => {
    const apirOrders =
      "https://64db7a91593f57e435b105e8.mockapi.io/orders/" + dataid;

    ListOrders(apirOrders)
      .then((res) => {
        setId(res.id);
        setDataOrderCode(res.order_code);
        setDataOrderName(res.order_name);
        setDataDescrption(res.description);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const currenDate = new Date().toLocaleString();

  const HandleUpdate = async (e) => {
    e.preventDefault();
    const urlAPIUpdate =
      "https://64db7a91593f57e435b105e8.mockapi.io/orders/" + dataid;

    const putData = {
      id: id,
      order_code: dataOrderCode,
      order_name: dataOrderName,
      description: dataDescripton,
      updated_date: currenDate,
      created_by: getDataUser,
    };

    const res = await UpdateOrder(urlAPIUpdate, putData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Success Updated`,
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
        <h1 className="heading">Edit Data</h1>
        <form action="" id="form-adddata" method="post" onSubmit={HandleUpdate}>
          <label For="id" className="label">
            ID
          </label>
          <input
            type="text"
            name="fullname"
            id="id"
            placeholder="ID"
            className="input"
            value={id}
            disabled
          ></input>
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
    </>
  );
};

export default EditDataOrder;
