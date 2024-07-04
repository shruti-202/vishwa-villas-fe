import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loading from "../../components/util/Loading";
import "./ItemDetailPage.css";
import { itemDateFormatter } from "../../utility/DateUtils";
import { numberToCommaString } from "../../utility/numberUtils";
import { Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { errorAlert, successAlert } from "../../utility/alert";

function ItemDetailPage() {
  const { userInfo } = useContext(UserContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [itemDetail, setItemDetail] = useState();
  const [disableInterestBtn, setDisableInterestBtn] = useState(false);
  const { itemId } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/item/${itemId}`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          setRedirectToLogin(true);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data?.data) {
          setItemDetail(data?.data);
        } else {
        }
      });
  }, []);

  const handleContact = () => {
    if (!userInfo) {
      setRedirectToLogin(true);
      errorAlert("User not Logged in. Please login to contact", "error");
      return;
    }

    //api request to send email to author
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/item/lead`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: itemId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          successAlert(data?.success, "success");
          setDisableInterestBtn(true);
        }
        if (data?.error) {
          errorAlert(data?.error, "error");
          setDisableInterestBtn(true);
        }
      });
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  if (!itemDetail) {
    return <Loading />;
  }

  return (
    <div className="item-detail">
      <div className="item-detail-imgs">
        {itemDetail?.imgList?.map((imgUrl, index) => (
          <img key={index} src={imgUrl} />
        ))}
      </div>
      <div className="item-detail-body">
        <div className="item-detail-basic">
          <div className="item-detail-price">
            ₹ {numberToCommaString(itemDetail?.price)}
          </div>
          <div className="item-detail-title">{itemDetail?.title}</div>
          <div className="item-detail-row-space-between">
            <p>{itemDetail?.location}</p>
            <p>{itemDateFormatter(itemDetail?.updatedAt)}</p>
          </div>
        </div>
        <div className="item-detail-author">
          {itemDetail?.edit ? (
            <>
            <Link to={'/edit/' + itemId}>
            <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--ternary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                    },
                  }}
                >
                  Edit
                </Button>
            </Link>
            
            </>
          ) : (
            <>
              <div className="item-detail-author-name">
                {itemDetail?.author?.name}
              </div>
              <div className="item-detail-author-contact">
                <Button
                  variant="contained"
                  disabled={disableInterestBtn}
                  onClick={handleContact}
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--ternary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                    },
                  }}
                >
                  {disableInterestBtn ? `Interested` : `Send Interested`}
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="item-detail-description">
          {itemDetail.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
