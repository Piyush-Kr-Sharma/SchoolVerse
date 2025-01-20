import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Grid, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  postAssignment,
  uploadFile,
} from "../../redux/assignmentRelated/assignmentHandle";

const Input = styled("input")({
  display: "none",
});

const TeacherAssignments = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const classId = currentUser?.teachSclass?._id || "";
  const subjectId = currentUser?.teachSubject?._id || "";

  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    deadline: "",
    description: "",
    fileURL: "", // Store the file URL after the file upload
    classId,
    subjectId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    // Ensure a file is selected
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      // Dispatch the action and wait for the response to complete
      const response = await dispatch(uploadFile(selectedFile));
      console.log("response: ", response.fileURL);

      if (response && response?.fileURL) {
        setFormData({ ...formData, fileURL: response.fileURL });
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.deadline || !formData.description || !formData.fileURL) {
      alert(
        "Please fill in all the required fields, including uploading a file."
      );
      return;
    }

    try {
      // Dispatch the action to post the assignment
      dispatch(postAssignment(formData));
      alert("Assignment added successfully!");

      setSubmitted(true);

      // Reset the form
      setFormData({
        deadline: "",
        description: "",
        classId,
        subjectId,
      });
    } catch (error) {
      console.error("Error adding assignment:", error);
      alert("Error adding assignment.");
    }
  };

  return (
    <>
      <Typography variant="h3" align="center">
        Class Assignment
      </Typography>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Deadline"
                name="deadline"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.deadline}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                required
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="upload-file">
                <Input
                  id="upload-file"
                  name="assignmentFile"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{ marginRight: 2 }}
                >
                  Choose File
                </Button>
                {!submitted && selectedFile ? (
                  <Typography>{selectedFile.name}</Typography>
                ) : null}
              </label>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFileUpload}
              >
                Upload File
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Assignment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default TeacherAssignments;
