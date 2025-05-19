import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/Card";

import "../components/Carousel.css";

export default function Home() {
  const [search, setSearch] = useState("");

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://gofood-mern-app-srq9.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>

      {/* IMAGE SLIDDER  */}

      <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel" style={{objectFit: "contain !important"}}>

    <div className="carousel-inner" id="carousel-image">

        <div className="carousel-caption" style={{zIndex:"10", backgroundColor: "transparent"}} >
        <div className="d-flex justify-content-center" style={{backgroundColor: "transparent"}}>
          <input className="form-control me-2"  type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
          {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
        </div>
        </div>

 
        <div className="carousel-item active" >
          <img
            src="https://images.pexels.com/photos/1352295/pexels-photo-1352295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="d-block w-100 " style={{ filter: "brightness(50%)", height: "100%", objectFit: "cover" }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg"
            className="d-block w-100" style={{filter: "brightness(40%)"}}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="d-block w-100" style={{filter: "brightness(40%)"}}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.pixabay.com/photo/2021/02/04/12/47/food-5981239_1280.jpg"
            className="d-block w-100" style={{filter: "brightness(40%)"}}
            alt="..."
          />
        </div>
      </div>

      <button
        className="carousel-control-prev bg-transparent" 
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden" >Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

      {/*CARDS CONTAINER  */}

      <div className="container">
        {
          foodCat.length !== 0 
            ? (
            foodCat.map((data) => {
              return (
                <div className="row mb-3 " key={data._id}>
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {
                    foodItem.length !== 0 ? (
                      foodItem
                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())
                      ))
                        .map((filterItem) => {
                          return (
                            <div className="col-12 col-md-6 col-lg-3 mx-4" key={filterItem._id}>
                              <Card foodName = {filterItem} 
                                    options={filterItem.options[0]}
                                    // imgSrc={filterItem.img}
                                     />
                            </div>
                          );
                        })
                    ) : (
                      <div>No Such Data Found</div>
                    )
                  }
                </div>
              );
            })
          ) : (
            <div>"""""""""""</div>
          )
        }
      </div>

      <div><Footer /></div>
    </div>
  );
}
