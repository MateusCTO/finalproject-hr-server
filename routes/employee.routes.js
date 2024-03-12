const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee.model");

// ROUTES

const fileUploader = require("../config/cloudinary.config");

/* Create our GET all route */
router.get("/employees", async (req, res) => {
  try {
    const { departmentID } = req.query;
    let query = {};

    if (departmentID) {
      query = { "jobDetails.departmentID": departmentID };
    }

    const filteredEmployees = await Employee.find(query);
    res.status(200).json(filteredEmployees);
  } catch (error) {
    res.status(500).json({ message: "Error while getting employees" });
  }
});

/* Get Individual Employee by ID */
router.get("/employees/:id", async (req, res) => {
  try {
    // destructure the id via route params
    const { id } = req.params;
    // find the Employee via ID.
    const singleEmployee = await Employee.findById(id);
    res.status(200).json(singleEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while getting the selected employee." });
  }
});

router.post(
  "/upload",
  fileUploader.fields([
    { name: "imageUrl" },
    { name: "uploadedDocuments.fileUrl" },
  ]),
  (req, res, next) => {
    // Check if any of the files are missing
    if (!req.files.imageUrl || !req.files.uploadedDocuments.fileUrl) {
      next(new Error("No file uploaded!"));
      return;
    }

    // Get the URLs of the uploaded files and send them as a response.
    const imageUrl = req.files.imageUrl[0].path;
    const fileUrl = req.files.uploadedDocuments.fileUrl[0].path;

    res.json({ imageUrl, fileUrl });
  }
);

/* Creating a new Employee */
router.post("/employees", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      imageUrl,
      uploadedDocuments: { fileName, fileUrl } = {},
      contactInformation: { emailAddress, phoneNumber } = {},
      address: { streetAddress, city, stateProvince, postalCode } = {},
      jobDetails: {
        jobTitle,
        departmentID,
        managerID,
        startDate,
        endDate,
      } = {},
      salaryInformation: { salary, currency } = {},
      workHours: { weeklyWorkHours } = {},
      benefitsAndPerks: { healthInsurance, retirementPlans } = {},
      emergencyContact: { name, phoneNumberEmergency, relationship } = {},
      skillsAndQualifications: { skills, education } = {},
      performanceMetrics: { performanceReviews, goals } = {},
    } = req.body;

    const newEmployee = await Employee.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      imageUrl,
      uploadedDocuments: [{ fileName, fileUrl }],
      contactInformation: { emailAddress, phoneNumber },
      address: { streetAddress, city, stateProvince, postalCode },
      jobDetails: { jobTitle, departmentID, managerID, startDate, endDate },
      salaryInformation: { salary, currency },
      workHours: { weeklyWorkHours },
      benefitsAndPerks: { healthInsurance, retirementPlans },
      emergencyContact: { name, phoneNumberEmergency, relationship },
      skillsAndQualifications: { skills, education },
      performanceMetrics: { performanceReviews, goals },
    });

    const { type } = req.query;

    /*     res.status(200).json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while creating the Employee" });
  }
}); */

    if (!type || (type !== "imageUrl" && type !== "fileUrl")) {
      // Delete the employee if the file type is invalid
      await Employee.findByIdAndDelete(newEmployee._id);
      return res.status(400).json({ message: "Invalid file type specified" });
    }

    // Update the imageUrl or fileUrl field in the employee document
    if (type === "imageUrl") {
      newEmployee.imageUrl = req.file.path;
    } else if (type === "fileUrl") {
      const newDocument = {
        fileName: req.file.originalname,
        fileUrl: req.file.path,
      };
      newEmployee.uploadedDocuments.push(newDocument);
    }

    // Save the updated employee
    await newEmployee.save();

    return res.json({
      message: "Employee created with file upload",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Update Employee Info */
router.put("/employees/:id", async (req, res) => {
  /* Destructure the id via router params */
  try {
    const { id } = req.params;

    // Create an empty object to store the dynamic updates
    let updateFields = {};

    // Loop through the request body and add fields to updateFields object if they exist
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updateFields[key] = req.body[key];
      }
    }

    // Find the employee via the id and update with dynamic fields
    const updateEmployee = await Employee.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );
    res.status(200).json(updateEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while updating the Employee" });
  }
});

router.delete("/employees/:id", async (req, res) => {
  Employee.findByIdAndDelete(req.params.id);
  try {
    /* Destructure the id via route params */
    const { id } = req.params;
    /* Find the employee via the id and send it back to the client */
    await Employee.findByIdAndDelete(id);
    res.status(204).json("Employee was deleted");
  } catch (error) {
    res.status(500).json({ message: "Error while deleting the Employee" });
  }
});

module.exports = router;
