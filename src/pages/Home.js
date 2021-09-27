import Card from "../components/Card";
import FilterInput from "../components/FilterInput";
import { useState } from "react";
import logo from "../assets/logo.png";

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
      <img src={logo} className="logo" alt="logo" />
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
