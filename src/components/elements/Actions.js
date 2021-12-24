import React from "react";
import { Card } from "react-bootstrap";

function Actions({ recipe }) {
  const { sourceUrl, _id } = recipe;
  return (
    <div className="bottom">
      <Card className="absolute-bottom">
        <Card.Header style={{ textAlign: "center" }}>
          Press to show full list of ingredients.
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <span>
              <a
                className="text-center"
                style={{ alignContent: " center ", textAlign: "center" }}
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check original website!
              </a>
              <br />
              <a
                className="text-center"
                style={{ alignContent: " center ", textAlign: "center" }}
                href={_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                {_id}
              </a>
            </span>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Actions;
