import { useParams, useNavigate } from "react-router-dom";
import StudentList from "../components/StudentList";
import NotFoundPage from "../components/NotFoundPage";
import { useState, useEffect } from "react";
import Config from "../config/";
import { Student } from "../models/Student";
import { deleteStudent } from "../components/DeleteStudent";

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState<Student>({
    _id: "",
    FirstName: "",
    LastName: "",
    School: "",
    StartDate: new Date().toISOString().split("T")[0],
    __v: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${Config.API_BASE_URL}students/${id}`);
      const body = await result.json();
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);


  const handleDeleteSuccess = () => {
    navigate('/list', { state: { refresh: true } });
  };
  if (studentInfo._id === "") return <NotFoundPage />;

  return (
    <section>
      <div style={{ width: "20%", float: "right" }}>
        <h3>Others</h3>
        <StudentList exceptId={studentInfo._id} showActions={false} />
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Student Details</h4>
        </div>
        <div className="card-body">
        <p><b>ID: </b>{studentInfo._id}</p>
          <p><b>Name: </b>{studentInfo.FirstName} {studentInfo.LastName}</p>
          <p><b>School: </b>{studentInfo.School}</p>
          <p><b>Start Date: </b>{studentInfo.StartDate ? studentInfo.StartDate.substring(0, 10) : ""}</p>
          <div className="mt-3">
            <button 
              className="btn btn-primary me-2" 
              onClick={() => navigate(`/edit/${studentInfo._id}`)}
            >
              Update
            </button>
            <button 
              className="btn btn-danger me-2" 
              onClick={() => deleteStudent(studentInfo._id, handleDeleteSuccess)}
            >
              Delete
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/list')}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentDetailPage;

  