import { Link } from "react-router-dom";
import StudentList from "../components/StudentList";

const StudentListPage = () => {
    return (
        <section>
            <h1>Student List Page</h1>
            <div className="text-center mb-4">
                <Link to="/add" className="btn btn-success">
                    Add New Student
                </Link>
            </div>
            <StudentList />
        </section>
    );
};
export default StudentListPage;
  