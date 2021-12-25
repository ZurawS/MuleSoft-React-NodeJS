import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../elements/Alert";
import Axios from "axios";
import APIRequest from "../actions/APIRequest";

export default function UpdateCourse() {
  const id = window.location.href.split("?")[1];

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
  const history = useHistory();
  const url = `http://localhost:88/api/courses/find/${id}`;

  useEffect(() => {
    async function getData() {
      const result = await Axios.get(url);
      setdishName(result.data.dishName);
      setcategory(result.data.category);
      setauthor(result.data.author);
      setingredients(result.data.ingredients);
      setcookingTime(result.data.cookingTime);
      setsourceUrl(result.data.sourceUrl);
      setimageUrl(result.data.imageUrl);
      setisPublished(result.data.isPublished);
      setprice(result.data.price);
      settags(result.data.tags);
    }
    getData();
  }, [url]);

  async function update() {
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
      `http://localhost:88/api/courses/update/${id}`,
      "PUT",
      JSON.stringify(item)
    );

    if (result.status !== 200) {
      return setAlert(
        result.status + " " + result.statusText + " - Please check input fields"
      );
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

  return (
    <div style={{ minWidth: "70rem" }}>
      <h1 className="bigBar" style={{ textAlign: "center" }}>
        Update recipe
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
          )}
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

          <h6 style={{ marginBottom: "2rem" }}>Ingredients</h6>

          {ingredients.map(({ quantity, unit, description }, index) => {
            return (
              <div className="ing" key={"key" + index}>
                <h5>Quantity </h5>
                <br />
                <input
                  id={"quantity" + index}
                  style={{
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width: "5rem",
                  }}
                  type="text"
                  onChange={(event) => handleIngredientsChange(event, index)}
                  className="form-control"
                  required="required"
                  placeholder={quantity}
                />
                <h5 style={{ marginRight: "1rem" }}> Unit </h5>
                <div>
                  <input
                    id={"unit" + index}
                    style={{ width: "5rem" }}
                    type="text"
                    onChange={(event) => handleIngredientsChange(event, index)}
                    className="form-control"
                    required="required"
                    placeholder={unit}
                  />
                </div>
                <h5 style={{ marginLeft: "1rem" }}> Description </h5>

                <input
                  id={"description" + index}
                  style={{ marginLeft: "1rem" }}
                  type="text"
                  onChange={(event) => handleIngredientsChange(event, index)}
                  className="form-control"
                  required="required"
                  placeholder={description}
                />
              </div>
            );
          })}

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
            <button onClick={update} className=" prettyB">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
