import { useState, useEffect } from "react";
import { Student } from "../models/Student";
import Config from "../config";
import { Link } from "react-router-dom";
import List from "./List";
import { deleteStudent } from "../components/DeleteStudent";

type Props = {
  exceptId?: string;
  showActions?: boolean;
};

const StudentList = ({ exceptId = undefined, showActions = true }: Props) => {
  const [studentInfo, setStudentInfo] = useState<Student[]>([]);

  const getData = async () => {
    const response = await fetch(`${Config.API_BASE_URL}students/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const jsonData = await response.json();
    setStudentInfo(jsonData);
  };

  //! DUMMY STUDENT DATA RESET FUNCTION!! 
  const resetStudent = async () => {
    await fetch(`${Config.API_BASE_URL}dummy`, {
      method: "GET",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //This useEffect runs when number of student is empty!!!
  useEffect(() => {
    if (studentInfo.length === 0) {
      resetStudent().then(getData);
    }
  }, [studentInfo]);

  let filteredStudents = studentInfo;

  if (exceptId !== undefined) {
    filteredStudents = studentInfo.filter((p: Student) => p._id !== exceptId);
  }

  return (
    <div>
      <List
        items={filteredStudents}
        render={(student: Student) => (
          <div className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
            <Link to={`/detail/${student._id}`}>
              <h6 className="text-muted">
                {student.FirstName} {student.LastName}
              </h6>
            </Link>

            {/* This delete and edit buttons appear only when showActions is true*/}
            {showActions && (
              <div>
                <Link
                  to={`/edit/${student._id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteStudent(student._id as string, getData)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default StudentList;
