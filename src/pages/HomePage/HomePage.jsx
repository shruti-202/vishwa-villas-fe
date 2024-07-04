import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { itemDateFormatter } from "../../utility/DateUtils";
import { numberToCommaString } from "../../utility/numberUtils";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  const [itemList, setItemList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/item?page=${pageNo}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
          setItemList(data.data);
        } else {
          setNoMoreItems(true);
        }
      });
  }, []);

  const getNewPage = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/item?page=${pageNo + 1}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
          setItemList([...itemList, ...data.data]);
        } else {
          setNoMoreItems(true);
        }
      });
    setPageNo(pageNo + 1);
  };

  return (
    <>
      <div className="item-list">
        {itemList.length > 0 &&
          itemList.map((item, key) => <ItemCard key={item.id} {...item} />)}
      </div>
      <div className="next-page">
        {noMoreItems ? (
          <Button variant="contained" disabled>
            No More Items
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "var(--ternary-color)",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
            onClick={getNewPage}
            type="submit"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}

const ItemCard = ({
  id,
  title,
  price,
  location,
  imgList ,
  listType,
  createdAt,
}) => {
  return (
    <div className="item-card-container">
      <Link to={`/item/${id}`}>
        <div className="item-card">
          <div className="item-card-imgs">
            {imgList?.length > 0 ? (
              imgList.map((img, index) => <img key ={index} src={img} />)
            ) : (
              <> No Image</>
            )}
          </div>
          <div className="img-card-body">
            <div className="img-card-price">₹ {numberToCommaString(price)}</div>
            <div className="img-card-title">{title}</div>
            <div className="img-card-location">{location}</div>
          </div>
          <div className="img-card-footer">
            <div>{listType}</div>
            <div>{itemDateFormatter(createdAt)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
