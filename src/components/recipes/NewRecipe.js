import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../elements/Alert";
import APIRequest from "../elements/APIRequest";

export default function CreateNewRecipe() {
  const [dishName, setdishName] = useState("");
  const [category, setcategory] = useState("");
  const [author, setauthor] = useState("");
  const [ingredients, setingredients] = useState([]);
  const [cookingTime, setcookingTime] = useState("");
  const [sourceUrl, setsourceUrl] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isPublished, setisPublished] = useState("true");
  const [price, setprice] = useState("");
  const [tags, settags] = useState([]);
  const [alert, setAlert] = useState("");
  const [index, setIndex] = useState(0);

  const history = useHistory();

  async function create() {
    let item = {
      dishName,
      category,
      author,
      ingredients,
      cookingTime,
      sourceUrl,
      imageUrl,
      isPublished,
      price,
      tags,
    };

    const result = await APIRequest(
      "http://localhost:88/api/courses/add",
      "POST",
      JSON.stringify(item)
    );

    if (result.status !== 200) {
      return setAlert(result.status + " " + result.statusText);
    }

    history.push("/");
    window.location.reload();
  }

  const handleIngredientsChange = (event, index) => {
    const shallowCopy = [...ingredients];
    shallowCopy[index] = {
      ...shallowCopy[index],
      [event.target.id]: event.target.value,
    };

    setingredients(shallowCopy);
  };

  function createIngredient(index) {
    return (
      <div className="ing" key={"key" + index}>
        <h5>Quantity </h5>
        <br />
        <input
          id={"quantity"}
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
            width: "5rem",
          }}
          type="text"
          onChange={(event) => handleIngredientsChange(event, index)}
          className="form-control"
          required="required"
        />
        <h5 style={{ marginRight: "1rem" }}> Unit </h5>
        <div>
          <input
            id={"unit"}
            style={{ width: "5rem" }}
            type="text"
            onChange={(event) => handleIngredientsChange(event, index)}
            className="form-control"
            required="required"
          />
        </div>
        <h5 style={{ marginLeft: "1rem" }}> Description </h5>

        <input
          id={"description"}
          style={{ marginLeft: "1rem" }}
          type="text"
          onChange={(event) => handleIngredientsChange(event, index)}
          className="form-control"
          required="required"
        />
      </div>
    );
  }

  return (
    <div style={{ minWidth: "70rem" }}>
      <h1 className="bigBar" style={{ textAlign: "center" }}>
        Create new recipe
      </h1>
      <div
        style={{
          backgroundColor: "#f1f1f1",
          padding: "3rem",
          borderRadius: "1rem",
          marginBottom: "7rem",
        }}
      >
        <div style={{}}>
          {alert !== "" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Alert alert={alert}></Alert>
            </div>
          )}{" "}
          <div>
            <h6>Name of the course</h6>
            <input
              autoFocus="autofocus"
              required="required"
              type="text"
              className="form-control"
              placeholder={dishName}
              onChange={(e) => setdishName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <h6>Category</h6>
            <input
              required="required"
              type="text"
              className="form-control"
              placeholder={category}
              onChange={(e) => setcategory(e.target.value)}
            />
          </div>
          <br />
          <div>
            <h6>Author</h6>
            <input
              type="text"
              onChange={(e) => setauthor(e.target.value)}
              className="form-control"
              required="required"
              placeholder={author}
            />
          </div>
          <br />
          <h6 style={{ marginBottom: "2rem", display: "inline" }}>
            Ingredients
          </h6>
          <button className="prettyB sml" onClick={() => setIndex(index + 1)}>
            Add product
          </button>
          {[...Array(index)].map((_, index) => createIngredient(index))}
          <br />
          <div>
            <h6>Cooking time</h6>
            <input
              type="text"
              onChange={(e) => setcookingTime(e.target.value)}
              className="form-control"
              required="required"
              placeholder={cookingTime}
            />
          </div>
          <br />
          <div>
            <h6>Source url</h6>
            <input
              type="text"
              onChange={(e) => setsourceUrl(e.target.value)}
              className="form-control"
              required="required"
              placeholder={sourceUrl}
            />
          </div>
          <br />
          <div>
            <h6>Image url</h6>
            <input
              type="text"
              onChange={(e) => setimageUrl(e.target.value)}
              className="form-control"
              required="required"
              placeholder={imageUrl}
            />
          </div>
          <br />
          <div>
            <h6>Publish state</h6>
            <input
              type="text"
              onChange={(e) => setisPublished(e.target.value)}
              className="form-control"
              required="required"
              placeholder={"default: true"}
            />
          </div>
          <br />
          <div>
            <h6>Price</h6>
            <input
              type="text"
              onChange={(e) => setprice(e.target.value)}
              className="form-control"
              required="required"
              placeholder={price}
            />
          </div>
          <br />
          <div>
            <h6>Tags</h6>
            <input
              type="text"
              onChange={(e) => settags(e.target.value)}
              className="form-control"
              required="required"
              placeholder={tags}
            />
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <button onClick={create} className=" prettyB">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
