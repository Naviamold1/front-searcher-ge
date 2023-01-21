import React, { useState } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  IconButton,
  Alert,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import MultipleSelectChip from "./Output";
import { useQuery } from "@tanstack/react-query";
import ReactGA from "react-ga4";

function Products(props) {
  return (
    <div className='product'>
      <div className='store product-text'>
        <span className={`store-name ${props.user.store}`}>
          {props.user.store}
        </span>
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
    //   <Card sx={{ maxWidth: 345 }}>
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image={props.user.image}
    //       alt={props.user.name}
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //       {props.user.name}
    //       </Typography>
    //       {/* <Typography variant="body2" color="text.secondary">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000
    //         species, ranging across all continents except Antarctica
    //       </Typography> */}
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Share
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}

export default function Search_Bar() {
  const [input, setInput] = useState("");
  const [storeFilter, setStoreFilter] = useState([]);
  const [checked, setChecked] = useState(true);

  async function fetcha() {
    const options = {
      method: "POST",
      url: process.env.REACT_APP_API_KEY,
      params: {
        item: input,
        store: Oppa === "" ? "all" : Oppa,
        ada_accuracy: checked,
      },
      data: {},
    };
    const res = await axios.request(options);
    return Object.values(res.data);
  }

  let Oppa = "";
  const getData = (e) => {
    storeFilter?.map((item) => (Oppa += `${item},`));
    Oppa = Oppa.slice(0, -1);
    console.log(Oppa);
    e.preventDefault();
    ReactGA.event({
      category: "Button",
      action: "buttonClick",
      label: "search-button",
    });
    refetch();
  };

  const { data, isError, error, isFetching, refetch } = useQuery(
    ["names"],
    fetcha,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      cacheTime: 5000,
    }
  );

  return (
    <>
      <div className='SearchBar'>
        <form className='search' onSubmit={getData}>
          <MultipleSelectChip
            sendSearchResult={(value) => {
              setStoreFilter(value);
            }}
            onCheckBoxChange={(e) => setChecked(e)}
          />
          <input
            className='search-input'
            label='Search Bar'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search...'
          />

          {isFetching ? (
            <LoadingButton
              loading
              variant='outlined'
              sx={{ backgroundColor: "grey" }}
              size='240'
            />
          ) : (
            <IconButton
              aria-label='search'
              className='search-button'
              id='search-button'
              onClick={getData}
              disabled={isFetching || input === ""}
              color='primary'
              sx={{
                backgroundColor: "#5a5a5a",
                borderRadius: "0",
                width: "4rem",
              }}
              type='submit'
            >
              <SearchIcon />
            </IconButton>
          )}
        </form>
      </div>
      {data !== undefined ? (
        <Alert variant='filled' severity='success'>
          returned {data?.length} products
        </Alert>
      ) : null}
      {isError ? (
        <Alert variant='filled' severity='error'>
          An error has occurred: {error.message}
        </Alert>
      ) : null}
      <section className='product-selection'>
        {data?.map((user) => (
          <Products key={user.id} user={user} />
        ))}
      </section>
    </>
  );
}
