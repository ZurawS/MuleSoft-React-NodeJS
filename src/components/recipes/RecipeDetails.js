import React from "react";
import DeleteCourse from "./DeleteRecipe";
import { Link } from "react-router-dom";

const RecipeDetails = ({ recipe, onClose }) => {
  const {
    dishName,
    ingredients,
    sourceUrl,
    _id,
    author,
    cookingTime,
    category,
    price,
    priceText,
  } = recipe;

  const result = ingredients.map((ingredient) => {
    return (
      <ul key={ingredient._id} className="ingredient-list">
        <li className="ingredient-weight">
          {ingredient.quantity ? ingredient.quantity + " " : ""}
        </li>
        <li className="ingredient-weight">
          {ingredient.unit ? ingredient.unit + " of " : ""}
        </li>
        <li className="ingredient-text">{ingredient.description}</li>
      </ul>
    );
  });

  return (
    <div className="modalStyle">
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex" }}>
          <h1 className="ingredients-title">{dishName}</h1>
          <button className="wth5 sml modalButton" onClick={onClose}>
            X
          </button>
        </div>

        <div className="recipeDetails">
          <h4 style={{ display: "inline" }}>
            Author: <span style={{ color: "orange" }}>{author}</span>{" "}
          </h4>
          <h4 style={{ display: "inline" }}>
            Category: <span style={{ color: "orange" }}>{category}</span>{" "}
          </h4>
          <h4 style={{ display: "inline" }}>
            Cooking time: <span style={{ color: "orange" }}>{cookingTime}</span>{" "}
          </h4>
        </div>
        <div className="recipeDetails">
          <h4 style={{ display: "inline" }}>
            Price: <span style={{ color: "orange" }}>{price}</span>{" "}
          </h4>
          <h4 style={{ display: "inline" }}>
            In words: <span style={{ color: "orange" }}>{priceText}</span>{" "}
          </h4>
        </div>

        <div>
          <h3>List of required ingredients:</h3>
          {result}
          <br />
          <a
            style={{ textDecoration: "none", fontSize: "3rem" }}
            href={sourceUrl}
          >
            Click here to move to the recipe!
          </a>
        </div>
      </div>

      <DeleteCourse _id={_id} />
      <Link
        className="rf update"
        to={{
          pathname: `/updateCourse/?${_id}`,
        }}
      >
        UPDATE
      </Link>
    </div>
  );
};

export default RecipeDetails;
