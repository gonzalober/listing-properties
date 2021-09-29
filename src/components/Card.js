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
  let feedToRender;

  const displayHomes = (homesFeed) => {
    let homesFeedArray = [];
    for (const value of Object.values(homesFeed)) {
      homesFeedArray.push(value);
    }
    const imagesUrl = `https://lottie-boh-assets.s3.eu-west-2.amazonaws.com/`;

    feedToRender =
      data === undefined || data.length === 0 ? homesFeedArray : data;

    return (
      <div class="container">
        {feedToRender
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
          })}
      </div>
    );
  };

  useEffect(() => {
    loadingList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageCount = (homesNumber) => {
    if (homesNumber !== undefined) {
      return Math.ceil(homesNumber.length / homesPerPage);
    }
    if (homesNumber !== undefined) {
      Math.ceil(Object.keys(homesNumber).length / homesPerPage);
    }
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
        pageCount={
          feedToRender !== undefined || !error || feedToRender.length !== 0
            ? pageCount(feedToRender)
            : pageCount(homeList)
        }
        onPageChange={({ selected }) => setPageNumber(selected)}
        initialPage={1}
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
