import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Card = ({ onDataAvailable, data }) => {
  const [homeList, setHomeList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const loadingList = () => {
    const url = `https://lottie-boh-assets.s3.eu-west-2.amazonaws.com/listings.json`;
    fetch(url)
      .then((response) => response.text())
      .then((d) => {
        const dataStr = d.replace(/'/g, '"').slice(0, -3) + "}";
        const data = JSON.parse(dataStr);
        console.log(typeof data);
        onDataAvailable(data);
        setHomeList(data);
        setLoading(false);
        setError(undefined);
      })
      .catch((er) => {
        console.error("Error:", er);
        setError(er.message);
        setLoading(false);
        setHomeList([]);
      });
  };

  const homesPerPage = 5;
  const pagesVisited = pageNumber * homesPerPage;

  const displayHomes = (homesFeed) => {
    console.log(homesFeed);
    let homesFeedArray = [];
    for (const [key, value] of Object.entries(homesFeed)) {
      homesFeedArray.push(value);
    }
    const imagesUrl = `https://lottie-boh-assets.s3.eu-west-2.amazonaws.com/`;

    let feedToRender =
      data === undefined || data.length === 0 ? homesFeedArray : data;
    console.log("woppp", feedToRender.length);
    return feedToRender
      .slice(pagesVisited, pagesVisited + homesPerPage)
      .map((houses) => {
        return (
          <li className="list">
            <div>
              <img
                className="images"
                src={imagesUrl + houses.imagePath}
                alt="new"
              ></img>
              <p>{houses.name}</p>
              <p>{houses.cqcRating} CQC Rating</p>
              <p>£ {houses.pricesFrom}</p>
            </div>
          </li>
        );
      });
  };

  useEffect(() => {
    loadingList();
  }, []);

  const pageCount = (homesNumber) => {
    console.log("----->");
    return Math.ceil(Object.keys(homesNumber).length / homesPerPage);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {homeList.length !== 0 && !error ? displayHomes(homeList) : null}
        </ul>
      )}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={homeList.length !== 0 && !error ? pageCount(homeList) : null}
        onPageChange={({ selected }) => setPageNumber(selected)}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Card;
