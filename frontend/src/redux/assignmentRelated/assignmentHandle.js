import axios from "axios";
import {
  getRequest,
  getAssignmentsSuccess,
  postAssignmentSuccess,
  getFailed,
  getError,
  uploadFileSuccess,
  uploadFileFailure,
  getTotalAssignments,
} from "./assignmentSlice";

// 1. POST assignment by the teacher
export const postAssignment = (assignmentData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/Teacher/assignment`,
      assignmentData,
      { headers: { "Content-Type": "application/json" } }
    );

    if (result.data?.message) {
      dispatch(postAssignmentSuccess(result.data.message));
    } else {
      dispatch(getFailed("Failed to post the assignment"));
    }
  } catch (error) {
    dispatch(getError(error.message || "Error posting the assignment"));
  }
};

// Upload file for assignment
export const uploadFile = (file) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const formData = new FormData();
    formData.append("assignmentFile", file);

    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/Teacher/uploadFile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("file URL of the result: ", result.data?.fileURL);

    if (result.data?.fileURL) {
      dispatch(uploadFileSuccess(result.data));
      return result.data;
    } else {
      dispatch(uploadFileFailure("Failed to upload the file"));
      return null;
    }
  } catch (error) {
    dispatch(uploadFileFailure(error.message || "Error uploading the file"));
    return null;
  }
};

// Get Assignments for a student by subject
export const getAssignments = (studentId, subjectId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Student/assignments/${studentId}/${subjectId}`
    );

    console.log("result: ", result);
    if (result.data) {
      dispatch(getAssignmentsSuccess(result.data));
    } else {
      dispatch(getFailed("No assignments found for this subject"));
    }
  } catch (error) {
    dispatch(getError(error.message || "Error fetching assignments"));
  }
};

export const getAllAssignments = (studentId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Student/getallassignment/${studentId}`
    );
    if (result.data?.totalAssignments) {
      dispatch(getTotalAssignments(result.data.totalAssignments));
    } else {
      dispatch(getFailed("No assignments found!!"));
    }
  } catch (error) {
    dispatch(getError(error.message || "Error fetching assignments"));
  }
};
