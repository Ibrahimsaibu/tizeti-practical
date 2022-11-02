import React, { useState } from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search from "./Components/Search";
import Error from "./Components/Error";
import "h8k-components";

const title = "Tizeti";
function App() {
  const [validStudents, setValidStudent] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search
          errorMessage={setErrorMessage}
          setValidStudents={setValidStudent}
          validStudents={validStudents}
        />
        {errorMessage.length ? <Error errorMessage={errorMessage} /> : <></>}
        <ResidentsList studentNames={validStudents} />
      </div>
    </div>
  );
}

export default App;
