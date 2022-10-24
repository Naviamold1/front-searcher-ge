import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Grid, Button, IconButton } from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";

function Products(props) {
  return (
    <div className="product">
      <div className="store product-text">
        <span className="store-name">{props.user.store}</span>
      </div>

      <div className="name">
        <a href={props.user.link} className="name-name">
          {props.user.name}
        </a>
      </div>

      <div className="price product-text">
        <span className="price-name">{props.user.price} ₾</span>
      </div>

      <div className="div-img">
        <img className="img" src={props.user.image} alt={props.user.name} />
      </div>
    </div>
  );
}

export default function Search_Bar() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (data !== "") {
      console.log(data);
      window.localStorage.setItem("MY_APP_STATE", JSON.stringify(data));
    }
  }, [data]);

  const getData = async () => {
    setIsDisabled(true);
    try {
      const requestData = await axios.post(`${process.env.REACT_APP_API_KEY}/${input}`);
      setData(Object.values(await requestData.data));
      localStorage.setItem("user", JSON.stringify(data));
      setIsDisabled(false);
    } catch (err) {
      console.log("error");

      setIsDisabled(false);
      setError({ message: "I'm an error message" });
    }
  };

  return (
    <>
      <div className="SearchBar">
        <form className="search">
          <input
            className="search-input"
            label="Search Bar"
            variant="filled"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search..."
          />

          <IconButton
            aria-label="search"
            className="search-button"
            id="search-button"
            onClick={() => getData()}
            disabled={isDisabled}
            color="primary"
            sx={{ backgroundColor: "#5a5a5a", borderRadius: "0" }}
          >
            <SearchIcon />
          </IconButton>
          {isDisabled ? (
            <LoadingButton loading variant="outlined"></LoadingButton>
          ) : (
            ""
          )}
          {/* <LoadingButton size="small" variant="outlined">
            disabled
          </LoadingButton> */}
        </form>
      </div>
      <div className="return-text">returned {data.length} products</div>
      <section className="product-selection">
        {data.map((user) => (
          <Products key={user.id} user={user}></Products>
        ))}
      </section>
    </>
  );
}
