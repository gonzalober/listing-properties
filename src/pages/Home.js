import Card from "../components/Card";
import FilterInput from "../components/FilterInput";
import { useState } from "react";

const Home = () => {
  const [homesListData, sethomesListData] = useState();
  const [filteredHomesListData, setFilteredhomesListData] = useState();

  const handleDataAvailable = (data) => {
    sethomesListData(data);
  };

  const handleFilteredDataAvailable = (data) => {
    setFilteredhomesListData(data);
  };

  return (
    <div>
      <h1>lottie</h1>
      <FilterInput
        data={homesListData}
        onFilteredDataAvailable={handleFilteredDataAvailable}
      />
      <Card
        onDataAvailable={handleDataAvailable}
        data={filteredHomesListData}
      />
    </div>
  );
};

export default Home;
