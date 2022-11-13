import React, { useEffect } from "react";
import Link from "next/link";
import { BsFillXCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
const Canceled = () => {
  const clearCartState = () => {};
  useEffect(() => {});
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon" style={{ color: "red" }}>
          <BsFillXCircleFill />
        </p>
        <h2>Payment Unsuccessful!</h2>
        <p className="email-msg">
          There is no any money debited from your account.
        </p>
        <p className="description">
          If you have any questions,please email
          <a className="email" href="mailto:order@example.com" target="_blank">
            amitmathur349@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
