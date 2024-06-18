import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/util/Loading";
import "./ItemDetailPage.css";
import { itemDateFormatter } from "../../utility/DateUtils";
import { numberToCommaString } from "../../utility/numberUtils";
import { Button } from "@mui/material";

function ItemDetailPage() {
  const [itemDetail, setItemDetail] = useState();
  const { itemId } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/item/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setItemDetail(data.data);
        } else {
        }
      });
  }, []);

  if (!itemDetail) {
    return <Loading />;
  }

  return (
    <div className="item-detail">
      <div className="item-detail-imgs">
        {itemDetail?.imgList?.map((imgUrl) => (
          <img src={imgUrl} />
        ))}
      </div>
      <div className="item-detail-body">
        <div className="item-detail-basic">
          <div className="item-detail-price">
            ₹ {numberToCommaString(itemDetail.price)}
          </div>
          <div className="item-detail-title">Title: {itemDetail.title}</div>
          <div className="item-detail-row-space-between">
            <p>{itemDetail.location}</p>
            <p>{itemDateFormatter(itemDetail.updatedAt)}</p>
          </div>
        </div>
        <div className="item-detail-author">
          <div className="item-detail-author-name">
            {itemDetail.author.name}
          </div>
          <div className="item-detail-author-contact">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--ternary-color)",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              type="submit"
            >
              LOGIN
            </Button>
          </div>
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
