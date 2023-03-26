import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { CarouselMain } from "../Components/CarouselMain";
import { SortByDropdown } from "../Components/SortBy";
import { FilterDropdown } from "../Components/Filter";
import { HorseCard } from "../Components/HorseCard";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// import { PopUp } from "../Components/PopUp";
// import { Button } from "../Components/Button";
import { Footer } from "../Components/Footer";
import Axios from "axios";
import { API_ENDPOINT } from "../server";
import { useLocation } from "react-router-dom";
export function MainPage() {
  let location = useLocation();
  let [allHorses, setHorseInfo] = useState([]);
  let navigate = useNavigate();
  const [filterData, setFilter] = useState();

  const sortType = (data) => {
    let sql = "select * from horseinfo order by price ";
    if (data == "high") {
      sql = sql + "desc;";
      // console.log(sql);
    }
    Axios.get(`${API_ENDPOINT}priceorder`, {
      params: { sql },
    }).then((response) => {
      setHorseInfo(response.data);
    });
  };

  const filterReturn = (data) => {
    setFilter(data);
    console.log(data);
    //console.log(allHorses);
    let horseDatas = [...allHorses];
    console.log(horseDatas);
    for (const key in data) {
      let newList = [];
      if (key == "gender") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "breedingMethod") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "discipline") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (horseDatas[i].skills.includes(data[key])) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "breed") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "color") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "minHeight") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (
            data[key] <= horseDatas[i].height &&
            data.maxHeight >= horseDatas[i].height
          ) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "minAge") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (
            data[key] <= horseDatas[i].horseAge &&
            data.maxAge >= horseDatas[i].horseAge
          ) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      if (key == "minPrice") {
        for (let i = 0; i < horseDatas.length; i++) {
          if (
            data[key] <= horseDatas[i].price &&
            data.maxPrice >= horseDatas[i].price
          ) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
    }
    setHorseInfo(horseDatas);

    //   let newList = [];

    //   for (let i = 0; i < horseDatas.length; i++) {

    //     if (data[key] == horseDatas[i][key]) {
    //       newList.push(horseDatas[i]);
    //     }
    //   }
    //   horseDatas = [...newList];

    // }
    // setHorseInfo(horseDatas);
  };
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      console.log("sorry");
      navigate("/login");
    }
    Axios.get(`${API_ENDPOINT}allhorses`).then((response) => {
      setHorseInfo(response.data);

      //console.log(allHorses);
    });
  }, []);

  const items = allHorses;

  function Items({ currentItems }) {
    console.log(currentItems);

    return (
      <div className="mainPage_cont_horsesCards_innerCont">
        {currentItems &&
          currentItems.map((item) => (
            <HorseCard
              horseInfo={[item]}
              onClick={goToHorseDetail}
              addFavOnClick={addToFavorites}
            />
          ))}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< "
          nextLabel=" >"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  //console.log(allHorses);

  const goToHorseDetail = () => {
    console.log("working");
  };

  const addToFavorites = () => {
    console.log("add fav working");
  };

  // PopUp implementation
  // const [showPopUp, setShowPopUp] = useState(false);

  // const openPopUp = (event) => {
  //     event.stopPropagation();
  //     setShowPopUp(!showPopUp);
  // }

  // const yes = () => {
  //     alert("Working");
  // }
  // End of PopUp Implementation

  return (
    <div className="mainPage">
      <NavBar />
      <div className="mainPage_cont_master">
        <h2 className="mainPage_cont_master_title">Featured Horses</h2>
        <div className="mainPage_cont_master_inner">
          <CarouselMain />
          <div className="mainPage_cont">
            <div className="mainPage_cont_allHorses">
              <h2 className="mainPage_cont_allHorses_title">All Horses</h2>
              <div className="mainPage_cont_allHorses_dropdowns">
                <SortByDropdown sortType={sortType} />
                <FilterDropdown filterReturn={filterReturn} />
              </div>
            </div>
            <div className="mainPage_cont_horsesCards">
              <PaginatedItems itemsPerPage={6} />
            </div>
          </div>

          {/* PopUp implementation */}
          {/* <Button title="Open PopUp" className="testing" onClick={openPopUp} />

                    {showPopUp && (
                        <PopUp title="Testing" description="Also testing" addContent={
                            <Button className="popUp_btn" title="Yes" onClick={yes} />
                        } />
                    )} */}
          {/* End of PopUp implementation */}

          <Footer />
        </div>
      </div>
    </div>
  );
}
