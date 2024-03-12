const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee.model");

// ROUTES

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

/* Creating a new Employee */
router.post("/employees", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      profilePicture,
      uploadedDocuments,
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
      profilePicture,
      uploadedDocuments,
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

    res.status(200).json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while creating the Employee" });
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
