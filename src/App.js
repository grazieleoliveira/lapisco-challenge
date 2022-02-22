import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://randomuser.me/api/?results=26`);
      setData(res.data?.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredData(data);
    }
  }, [search, data]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearch(searchWord);
    const newFilter = data?.filter((value) => {
      const fullName = value.name.first + value.name.last;
      return fullName.toLowerCase().includes(searchWord.replace(/ /g,'').toLowerCase());
    });
    if (searchWord) {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="App">
      <p className="page-title">Desafio Front-end - LAPISCO</p>
      <div className="results-container">
        <div className="input-container">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <input value={search} type="text" onChange={handleFilter} />
        </div>
        {filteredData?.length !== 0 && (
          <div className="results">
            {filteredData?.slice(0, 15).map((item, key) => {
              return (
                <div key={key} className="item">
                  <img id="user-image" src={item.picture.large} alt="user" />
                  <div className="desc-container">
                    <p id="card-title">
                      {item.name.first} {item.name.last}{" "}
                    </p>
                    <p className="card-subtitle">
                      {item.gender === "female" ? "Feminino" : "Masculino"} -{" "}
                      {item.dob.age} anos
                    </p>
                    <p className="card-subtitle">{item.cell}</p>
                    <p id="card-email">{item.email}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
