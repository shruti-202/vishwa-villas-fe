import React from "react";
import "./Filter.css";
import { Button } from "@mui/material";

const typeFilter = [
  {
    name: "Rent",
    value: "RENT",
  },
  {
    name: "Sell",
    value: "SELL",
  },
];

const Filter = ({ filters, setFilters }) => {
  return (
    <div className="filters">
      <div className="filters-type-list">
        {typeFilter.map((type, index) => {
          return (
            <Button
              key={index}
              className="filter-item"
              variant={type.value == filters.type ? "contained" : "outlined"}
              sx={{
                marginTop: "10px",
                width: "100%",
                color: "var(--dark-black)",
                border: " 1px solid var(--primary-color)",
                backgroundColor:
                  type.value === filters.type
                    ? "var(--primary-color)"
                    : "transparent",

                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              onClick={() => setFilters({ ...filters, type: type.value })}
            >
              {type.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
