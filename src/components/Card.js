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

  const homesPerPage = 6;
  const pagesVisited = pageNumber * homesPerPage;

  const displayHomes = (homesFeed) => {
    let homesFeedArray = [];
    for (const value of Object.values(homesFeed)) {
      homesFeedArray.push(value);
    }
    const imagesUrl = `https://lottie-boh-assets.s3.eu-west-2.amazonaws.com/`;

    let feedToRender =
      data === undefined || data.length === 0 ? homesFeedArray : data;

    return feedToRender
      .slice(pagesVisited, pagesVisited + homesPerPage)
      .map((houses, index) => {
        return (
          <div className="card" key={index}>
            <div className="cardContent">
              <img
                className="images"
                src={imagesUrl + houses.imagePath}
                alt="new"
              ></img>
              <p>{houses.name}</p>
              <p>{houses.cqcRating} CQC Rating</p>
              <p>£ {houses.pricesFrom}</p>
            </div>
          </div>
        );
      });
  };

  useEffect(() => {
    loadingList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageCount = (homesNumber) => {
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
