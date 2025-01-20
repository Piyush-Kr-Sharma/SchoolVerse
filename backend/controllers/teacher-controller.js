const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherSchema.js");
const Subject = require("../models/subjectSchema.js");
const Student = require("../models/studentSchema.js");

const teacherRegister = async (req, res) => {
  const { name, email, password, role, school, teachSubject, teachSclass } =
    req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
      name,
      email,
      password: hashedPass,
      role,
      school,
      teachSubject,
      teachSclass,
    });

    const existingTeacherByEmail = await Teacher.findOne({ email });

    if (existingTeacherByEmail) {
      res.send({ message: "Email already exists" });
    } else {
      let result = await teacher.save();
      await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id }); // teachSubject is the id of the subject to which the teacher is assigned and it finds that subject with that id and update the teacher field of that subject to the newly made teacher's id
      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const teacherLogIn = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
      const validated = await bcrypt.compare(
        req.body.password,
        teacher.password
      );
      if (validated) {
        teacher = await teacher.populate("teachSubject", "subName sessions");
        teacher = await teacher.populate("school", "schoolName");
        teacher = await teacher.populate("teachSclass", "sclassName");
        teacher.password = undefined;
        res.send(teacher);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Teacher not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.find({ school: req.params.id })
      .populate("teachSubject", "subName")
      .populate("teachSclass", "sclassName");
    if (teachers.length > 0) {
      let modifiedTeachers = teachers.map((teacher) => {
        return { ...teacher._doc, password: undefined };
      });
      res.send(modifiedTeachers);
    } else {
      res.send({ message: "No teachers found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeacherDetail = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id)
      .populate("teachSubject", "subName sessions")
      .populate("school", "schoolName")
      .populate("teachSclass", "sclassName");
    if (teacher) {
      teacher.password = undefined;
      res.send(teacher);
    } else {
      res.send({ message: "No teacher found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeacherSubject = async (req, res) => {
  const { teacherId, teachSubject } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { teachSubject },
      { new: true }
    );

    await Subject.findByIdAndUpdate(teachSubject, {
      teacher: updatedTeacher._id,
    });

    res.send(updatedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    await Subject.updateOne(
      { teacher: deletedTeacher._id, teacher: { $exists: true } },
      { $unset: { teacher: 1 } }
    );

    res.send(deletedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeachers = async (req, res) => {
  try {
    const deletionResult = await Teacher.deleteMany({ school: req.params.id });

    const deletedCount = deletionResult.deletedCount || 0;

    if (deletedCount === 0) {
      res.send({ message: "No teachers found to delete" });
      return;
    }

    const deletedTeachers = await Teacher.find({ school: req.params.id });

    await Subject.updateMany(
      {
        teacher: { $in: deletedTeachers.map((teacher) => teacher._id) },
        teacher: { $exists: true },
      },
      { $unset: { teacher: "" }, $unset: { teacher: null } }
    );

    res.send(deletionResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeachersByClass = async (req, res) => {
  try {
    const deletionResult = await Teacher.deleteMany({
      sclassName: req.params.id,
    });

    const deletedCount = deletionResult.deletedCount || 0;

    if (deletedCount === 0) {
      res.send({ message: "No teachers found to delete" });
      return;
    }

    const deletedTeachers = await Teacher.find({ sclassName: req.params.id });

    await Subject.updateMany(
      {
        teacher: { $in: deletedTeachers.map((teacher) => teacher._id) },
        teacher: { $exists: true },
      },
      { $unset: { teacher: "" }, $unset: { teacher: null } }
    );

    res.send(deletionResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

const teacherAttendance = async (req, res) => {
  const { status, date } = req.body;

  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.send({ message: "Teacher not found" });
    }

    const existingAttendance = teacher.attendance.find(
      (a) => a.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      teacher.attendance.push({ date, status });
    }

    const result = await teacher.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const teacherPostAssignment = async (req, res) => {
  const { deadline, description, fileURL, subjectId, classId } = req.body;
  try {
    const students = await Student.find({ sclassName: classId });
    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for the given class." });
    }

    // Prepare the assignment object
    const assignment = {
      deadline: new Date(deadline),
      description,
      file: fileURL,
      subjectId,
    };

    // Add the assignment to each student's assignment field
    const bulkOperations = students.map((student) => ({
      updateOne: {
        filter: { _id: student._id },
        update: { $push: { assignments: assignment } },
      },
    }));

    await Student.bulkWrite(bulkOperations);

    res.status(200).json({
      message: "Assignment added successfully to all students.",
      assignment,
    });
  } catch (error) {
    console.error("Error adding assignment:", error);
    res.status(500).json({
      message: "An error occurred while adding the assignment.",
      error: error.message,
    });
  }
};

const teacherUploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  // Construct the file URL
  const fileURL = `${process.env.BASE_URL}/Teacher/uploadFile/${req.file.filename}`;
  res.status(200).json({ fileURL, message: "File uploaded successfully." });
};

module.exports = {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  updateTeacherSubject,
  deleteTeacher,
  deleteTeachers,
  deleteTeachersByClass,
  teacherAttendance,
  teacherPostAssignment,
  teacherUploadFile,
};
