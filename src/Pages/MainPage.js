import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { CarouselMain } from "../Components/CarouselMain";
import { SortByDropdown } from "../Components/SortBy";
import { FilterDropdown } from "../Components/Filter";
import { HorseCard } from "../Components/HorseCard";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Footer } from "../Components/Footer";
import Axios from "axios";
import { API_ENDPOINT } from "../server";
import { useLocation } from "react-router-dom";

export function MainPage() {
  let location = useLocation();

  let [allHorses, setHorseInfo] = useState([]);
  let [allHorsesCopy, setHorseInfoCopy] = useState([]);

  let navigate = useNavigate();

  const [filterData, setFilter] = useState();

  const sortType = (data) => {
    console.log(data);
    let sql = "select * from horseinfo order by price ";
    // eslint-disable-next-line
    if (data == "high") {
      sql = sql + "desc;";
      // console.log(sql);
    }
    Axios.get(`${process.env.REACT_APP_API_URL}priceorder`, {
      params: { sql },
    }).then((response) => {
      setHorseInfo(response.data);
    });
  };

  const filterReturn = (data) => {
    setHorseInfo(allHorsesCopy);
    console.log(data);
    //console.log(horseDatas);
    setFilter(data);

    // console.log(data);
    //console.log(allHorses);
    let horseDatas = [...allHorsesCopy];
    console.log(horseDatas);
    for (const key in data) {
      let newList = [];
      // eslint-disable-next-line
      if (key == "gender") {
        for (let i = 0; i < horseDatas.length; i++) {
          // eslint-disable-next-line
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      // eslint-disable-next-line
      if (key == "breedingMethod") {
        for (let i = 0; i < horseDatas.length; i++) {
          // eslint-disable-next-line
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      // eslint-disable-next-line
      if (key == "discipline") {
        for (let i = 0; i < horseDatas.length; i++) {
          // console.log(data[key]);
          if (horseDatas[i].skills.includes(data[key])) {
            //console.log(horseDatas[i]);
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      // eslint-disable-next-line
      if (key == "breed") {
        for (let i = 0; i < horseDatas.length; i++) {
          // eslint-disable-next-line
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      // eslint-disable-next-line
      if (key == "color") {
        for (let i = 0; i < horseDatas.length; i++) {
          // eslint-disable-next-line
          if (data[key] == horseDatas[i][key]) {
            newList.push(horseDatas[i]);
          }
        }
        horseDatas = [...newList];
      }
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
  };

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      // console.log("sorry");
      navigate("/login");
    }
    let newHorse = [];
    Axios.get(`${API_ENDPOINT}allhorses`).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].showInfo == 1) newHorse.push(response.data[i]);
      }

      setHorseInfo([...newHorse]);
      setHorseInfoCopy([...newHorse]);

      //console.log(allHorses);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const items = allHorses;

  function Items({ currentItems }) {
    //console.log(currentItems);

    return (
      <div className="mainPage_cont_horsesCards_innerCont">
        {currentItems &&
          currentItems.map((item, i) => (
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
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
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

  const goToHorseDetail = () => {
    console.log("working");
  };

  const addToFavorites = () => {
    console.log("add fav working");
  };

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
                <FilterDropdown filterReturn={filterReturn} />
                <SortByDropdown sortType={sortType} />
              </div>
            </div>
            <div className="mainPage_cont_horsesCards">
              <PaginatedItems itemsPerPage={9} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
