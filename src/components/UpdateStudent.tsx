import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "../config/";
import { Student } from "../models/Student";

const UpdateStudent = () => {
  const { id } = useParams(); //Extract the id parameter from the URL
  const navigate = useNavigate(); //Navigate function to programmatically navigate between routes

  const [studentInfo, setStudentInfo] = useState<Student>({
    _id: "",
    FirstName: "",
    LastName: "",
    School: "",
    StartDate: new Date().toISOString().split("T")[0],
    __v: 0,
  });

  //Run code when the component mounts or when dependencies change
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        //GET request to the API to fetch the student with the given id
        const response = await fetch(`${Config.API_BASE_URL}students/${id}`);

        if (!response.ok) {
          throw new Error(`ERROR: ${response.status}`);
        }

        //Parse the JSON response
        const data = await response.json();

        //Format the date for the date input field(Timezone is fixed to Vancouver.Canaada)
        if (data.StartDate) {

            // const dateObj = new Date(data.StartDate);
            // const timeZoneAdjustmnet = new Date(dateObj);

            // timeZoneAdjustmnet.setDate(timeZoneAdjustmnet.getDate() + 1);
            // data.StartDate = timeZoneAdjustmnet.toISOString().split("T")[0];
            data.StartDate = data.StartDate.substring(0, 10);
        }

        setStudentInfo(data);
      } catch (error) {
        console.error("ERROR!!!!!!!! NO UPDATE STUDENT:", error);
        alert("NO UPDATE STUDENT:(");
      }
    };

    fetchStudent();
  }, [id]); //This depends on the id, so it reruns if the id changes

  const updateStudent = () => {

    // const selectedDate = new Date(studentInfo.StartDate);
    // selectedDate.setDate(selectedDate.getDate() + 1);
    // const formattedDate = selectedDate.toISOString().split('T')[0];

    fetch(`${Config.API_BASE_URL}students/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        FirstName: studentInfo.FirstName,
        LastName: studentInfo.LastName,
        School: studentInfo.School,
        StartDate: studentInfo.StartDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`ERROR NO RESPONSE!!: ${response.status}`);
        }

        alert("Student updated!! It worked and I'm Happy :)");
        navigate(`/detail/${id}`, { state: { refresh: true } }); // Navigate back to the detail page with a refresh state
      })
      .catch((error) => {
        console.error("ERROR NO UPDATE STUDENT:", error);
        alert("NO UPDATE STUDENT:(");
      });
  };

  const handleCancel = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Update Student</h3>
        </div>
        <div className="card-body">
          {/* Display the ID as read-only */}
          <div className="form-group mb-3">
            <label>Student ID:</label>
            <input
              className="form-control"
              type="text"
              value={studentInfo._id}
              readOnly
              disabled
            />
          </div>

          <div className="form-group mb-3">
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              value={studentInfo.FirstName}
              onChange={(event) =>
                setStudentInfo({
                  ...studentInfo,
                  FirstName: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group mb-3">
            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              value={studentInfo.LastName}
              onChange={(event) =>
                setStudentInfo({ ...studentInfo, LastName: event.target.value })
              }
            />
          </div>

          <div className="form-group mb-3">
            <label>School:</label>
            <input
              className="form-control"
              type="text"
              placeholder="School"
              value={studentInfo.School}
              onChange={(event) =>
                setStudentInfo({ ...studentInfo, School: event.target.value })
              }
            />
          </div>

          <div className="form-group mb-3">
            <label>Start Date:</label>
            <input
              className="form-control"
              type="date"
              value={studentInfo.StartDate}
              onChange={(event) =>
                setStudentInfo({
                  ...studentInfo,
                  StartDate: event.target.value,
                })
              }
            />
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateStudent}
            >
              Update
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
