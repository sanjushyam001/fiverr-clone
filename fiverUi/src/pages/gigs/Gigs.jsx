import React, { useState, useRef, useEffect } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { gigs } from "../../data";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);
  console.log(error);

  const resSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };
  return (
    <div className="gigs">
      <div className="container">
        <div className="breadcrumb">
          FIVERR {">"} GRAPHICS & DESIGN {">"}{" "}
        </div>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort == "sales" ? (
                  <span onClick={() => resSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => resSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
              ? "Something went wrong!"
              : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
