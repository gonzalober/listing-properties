import { useState } from "react";

const userInputFilter = (data, userinput) => {
  let homesFeedArray = [];
  for (const [key, value] of Object.entries(data)) {
    homesFeedArray.push(value);
  }

  let arrayFiltered = [];
  if (Array.isArray(homesFeedArray)) {
    for (let i = 0; i < homesFeedArray.length; i++) {
      if (
        homesFeedArray[i].cqcRating.toLowerCase() === userinput.toLowerCase()
      ) {
        arrayFiltered.push(homesFeedArray[i]);
      }
      if (homesFeedArray[i].pricesFrom === +userinput) {
        arrayFiltered.push(homesFeedArray[i]);
      }
      let bool = userinput === "eco-friendly" ? true : false;
      if (homesFeedArray[i].greenerChoice === bool) {
        arrayFiltered.push(homesFeedArray[i]);
      }
    }
    console.log("INFOOOOO====>>>>>", arrayFiltered);
    return arrayFiltered;
  }
};

const FilterInput = ({ data, onFilteredDataAvailable }) => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    onFilteredDataAvailable(userInputFilter(data, userInput));
    setLoading(false);
  };

  const handleChange = (e) => {
    console.log(typeof e.target.value);
    setUserInput(e.target.value);
  };

  return (
    <div className="search">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="form"
            onChange={handleChange}
            type="name"
            placeholder="eco-friendly, cqcrating, price, etc"
            data-testid="cqcratinginput"
          />
        </form>
      </div>
      {loading && "loading..."}
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default FilterInput;
