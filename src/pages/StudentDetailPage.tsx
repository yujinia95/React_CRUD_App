import { useParams } from "react-router-dom";
import StudentList from "../components/StudentList";
import NotFoundPage from "../components/NotFoundPage";
import { useState, useEffect } from "react";
import Config from "../config/";
import { Student } from "../models/Student";
import AddStudentForm from "../components/AddStudentForm";

const StudentDetailPage = () => {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState<Student>({
    StudentId: 0,
    FirstName: "",
    LastName: "",
    School: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${Config.API_BASE_URL}students/${id}`);
      const body = await result.json();
      //console.log(body);
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);

  if (studentInfo.StudentId === 0) return <NotFoundPage />;

  return (
    <section>
      <div style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.StudentId} />
      </div>

      <h4 className="text-muted">Student ID={studentInfo.StudentId}</h4>
      <div>
        <b>Name: </b>
        {studentInfo.FirstName} {studentInfo.LastName}
      </div>
      <div>
        <b>School: </b>
        {studentInfo.School}
      </div>
      <div style={{ width: "50%", float: "left" }}>
      <hr />
      <AddStudentForm />
    </div>

    </section>
  );
};

export default StudentDetailPage;

  