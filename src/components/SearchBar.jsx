import React, { useState } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton } from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import MultipleSelectChip from "./Output";
import { useQuery } from "@tanstack/react-query";

function Products(props) {
  return (
    <div className='product'>
      <div className='store product-text'>
        <span className='store-name'>{props.user.store}</span>
      </div>

      <div className='name'>
        <a href={props.user.link} className='name-name'>
          {props.user.name}
        </a>
      </div>

      <div className='price product-text'>
        <span className='price-name'>{props.user.price} ₾</span>
      </div>

      <div className='div-img'>
        <img className='img' src={props.user.image} alt={props.user.name} />
      </div>
    </div>
  );
}

export default function Search_Bar() {
  const [input, setInput] = useState("");

  async function fetcha() {
    const options = {
      method: "POST",
      url: process.env.REACT_APP_API_KEY,
      params: { item: input, store: "test1" },
      data: {},
    };
    const res = await axios.request(options);

    return Object.values(res.data);
  }

  const getData = (e) => {
    e.preventDefault();
    refetch();
  };

  const { data, error, isFetching, refetch } = useQuery(["names"], fetcha, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
    <>
      <div className='SearchBar'>
        <form className='search' onSubmit={getData}>
          <input
            className='search-input'
            label='Search Bar'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search...'
          />

          {isFetching ? (
            <LoadingButton loading variant='outlined' />
          ) : (
            <IconButton
              aria-label='search'
              className='search-button'
              id='search-button'
              onClick={getData}
              disabled={isFetching || input === ""}
              color='primary'
              sx={{ backgroundColor: "#5a5a5a", borderRadius: "0" }}
              type='submit'
            >
              <SearchIcon />
            </IconButton>
          )}
          <MultipleSelectChip />
        </form>
      </div>
      {data!==undefined&&<div className='return-text'>returned {data?.length} products</div>}
      {error && <div className="error-text">An error has occurred: {error}</div>}
      <section className='product-selection'>
        {data?.map((user) => (
          <Products key={user.id} user={user} />
        ))}
      </section>
    </>
  );
}
