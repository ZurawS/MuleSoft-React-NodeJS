import { useHistory } from "react-router-dom";
import { useState } from "react";
import Alert from "../elements/Alert";
import APIRequest from "../actions/APIRequest";

export default function DeleteCourse({ _id }) {
  const [alert, setAlert] = useState("");
  const history = useHistory();

  async function deleteCourse() {
    const result = await APIRequest(
      `http://localhost:88/api/courses/delete/${_id}`,
      "DELETE"
    );

    if (result.status !== 200) {
      setAlert(`You are not authorised to do this`);
    }
    history.push("/");
    window.location.reload();
  }

  return (
    <div>
      <div style={{}}>
        {alert !== "" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Alert alert={alert}></Alert>
          </div>
        )}
      </div>
      <button onClick={deleteCourse} className="rf modalButton ">
        DELETE
      </button>
    </div>
  );
}
