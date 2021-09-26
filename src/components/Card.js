import FilterInput from "./FilterInput";
import { useState, useEffect } from "react";

const Card = ({ onDataAvailable, data }) => {
  const [homeList, setHomeList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

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

  const displayHomes = (homesFeed) => {
    console.log(homesFeed);
    let homesFeedArray = [];
    for (const [key, value] of Object.entries(homesFeed)) {
      homesFeedArray.push(value);
    }
    const imagesUrl = `https://lottie-boh-assets.s3.eu-west-2.amazonaws.com/`;

    let feedToRender =
      data === undefined || data.length === 0 ? homesFeedArray : data;
    return feedToRender.map((houses) => {
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
    </div>
  );
};

export default Card;
