import React, { useState, useEffect } from "react";
import Axios from "axios";
import RecipeDetails from "./RecipeDetails";

function Recipe({ id, imageUrl, dishName }) {
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState();
  const url = `http://localhost:88/api/courses/find/${id}`;

  useEffect(() => {
    async function getData() {
      const result = await Axios.get(url);
      setRecipe(result.data);
    }
    getData();
  }, [url]);

  return (
    <div className="recipe">
      <h2>{dishName}</h2>
      <img className="dishImage" src={imageUrl} alt={dishName}></img>

      <button onClick={() => setShow(!show)}>Ingredients</button>
      {show && (
        <RecipeDetails
          recipe={recipe}
          onClose={() => {
            return setShow(!show);
          }}
        />
      )}
    </div>
  );
}

export default Recipe;
