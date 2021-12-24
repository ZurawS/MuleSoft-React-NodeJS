import React, { useState } from "react";
import Axios from "axios";
import Recipe from "../recipes/Recipe";
import Alert from "../elements/Alert";

const App = () => {
  const [query, setQuery] = useState("pizza");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const url = `http://localhost:88/api/courses/${query.toLocaleLowerCase()}`;
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (result.data.length === 0) {
        return setAlert(`We don't have a course with such name`);
      }
      setRecipes(result.data);
      setAlert("");
      setQuery("");
    } else {
      setAlert(`please fill the form`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="bigBar">Search to find a perfect meal for each day!</h1>
      {alert !== "" && <Alert alert={alert}></Alert>}

      <div>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search"
            autoComplete="off"
            onChange={onChange}
            value={query}
          />
          <input type="submit" value="search" />
        </form>
      </div>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => (
            <Recipe
              key={recipe._id}
              id={recipe._id}
              dishName={recipe.dishName}
              imageUrl={recipe.imageUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
