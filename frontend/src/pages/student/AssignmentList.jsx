import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { getAssignments } from "../../redux/assignmentRelated/assignmentHandle";

const SubjectAssignments = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { assignments } = useSelector((state) => state.assignment);
  const [subjectAssignments, setSubjectAssignments] = useState([]);

  const userId = currentUser._id;
  const currentURL = window.location.href;
  const subjectId = currentURL.split("/").pop(); // Takes the last part after splitting by "/"

  useEffect(() => {
    if (subjectId) {
      dispatch(getAssignments(userId, subjectId));
    }
  }, [dispatch, subjectId]);

  useEffect(() => {
    setSubjectAssignments(assignments.data || []);
  }, [assignments]);

  console.log("subjectAssignments: ", subjectAssignments);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Assignments List
      </Typography>
      {subjectAssignments.length === 0 ? (
        <Typography align="center">No assignments available</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{
            width: "800px", // Set the width of the Grid
            margin: "0 auto", // Center the Grid
          }}
        >
          {subjectAssignments.map((assignment) => (
            <Grid
              item
              xs={12}
              sm={12}
              key={assignment._id}
              justifyContent={"center"}
            >
              <Card
                style={{
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong>Deadline</strong>: {formatDate(assignment.deadline)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Description:</strong> {assignment.description}
                  </Typography>
                </CardContent>
                <CardContent style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownload(assignment.file)}
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SubjectAssignments;
