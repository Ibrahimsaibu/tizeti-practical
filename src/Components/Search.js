import React, { useState } from "react";
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function Search({ errorMessage, validStudents, setValidStudents }) {
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    joiningDate: "",
  });

  const checkStudent = STUDENTS.find(
    (student) =>
      student.name.toLocaleLowerCase() ===
      studentInfo.studentName.toLocaleLowerCase()
  );

  const handleAdd = (e) => {
    e.preventDefault();

    checkValidity(studentInfo.joiningDate, "");
  };

  function checkValidity(joiningDate, validityDate) {
    let studentObj = {};

    if (checkStudent === undefined) {
      setStudentInfo({
        studentName: "",
        joiningDate: "",
      });
      console.log(studentInfo.joiningDate);
      errorMessage(
        `Sorry, ${studentInfo.studentName} is not a verified student!`
      );
      return;
    } else {
      studentObj = checkStudent;
    }
    validityDate = checkStudent.validityDate;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [year, month, day] = joiningDate.split("-");
    const [yyyy, mm, dd] = validityDate.split("-");
    const maxValid = new Date(yyyy, mm - 1, dd);
    const selected = new Date(year, month - 1, day);

    if (!(maxValid >= selected && maxValid >= today)) {
      setStudentInfo({
        studentName: "",
        joiningDate: "",
      });
      errorMessage(`Sorry, ${studentObj.name}'s validity has Expired!`);
      return;
    } else {
      setStudentInfo({
        studentName: "",
        joiningDate: "",
      });
      errorMessage("");
      setValidStudents([...validStudents, studentObj]);
    }
  }

  const handleChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.id]: e.target.value });
  };
  return (
    <form onSubmit={handleAdd}>
      <div className="my-50 layout-row align-items-end justify-content-end">
        <label htmlFor="studentName">
          Student Name:
          <div>
            <input
              id="studentName"
              data-testid="studentName"
              type="text"
              className="mr-30 mt-10"
              onChange={handleChange}
              value={studentInfo.studentName}
            />
          </div>
        </label>
        <label htmlFor="joiningDate">
          Joining Date:
          <div>
            <input
              id="joiningDate"
              data-testid="joiningDate"
              type="date"
              onChange={handleChange}
              value={studentInfo.joiningDate}
              className="mr-30 mt-10"
            />
          </div>
        </label>
        <button
          type="submit"
          data-testid="addBtn"
          className="small mb-0"
          //   onClick={onClick}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Search;
