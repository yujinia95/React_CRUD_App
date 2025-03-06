import Config from "../config/";

const deleteStudent = async (id: string, onSuccess: () => void) => {
  if (!window.confirm("Are you sure you want to delete this student?")) {
    return;
  }

  try {
    const response = await fetch(`${Config.API_BASE_URL}students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
        alert("Student deleted successfully");

        onSuccess();
    }
  } catch (error) {
    alert("Failed to delete student");
    console.error("Failed to delete student", error);
  }
};

export { deleteStudent };
