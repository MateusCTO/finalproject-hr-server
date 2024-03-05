const express = require("express");
const mongoose = require("mongoose");


const router = express.Router();

const Employee = require("../models/Employee.model");


// ROUTES

/* Create our GET all route */
router.get("/employees", async (req, res)=>{
    try{
        const allEmployees = await Employee.find()
        res.status(200).json(allEmployees);
    }
    catch(error){
        res.status(500).json({message: "Error while getting employees"});
    }
}); 

/* Get Individual Employee by ID */
router.get("/employees/:id", async (req, res) => {
    try {
        // destructure the id via route params
    const {id} = req.params;
        // find the Employee via ID.
    const singleEmplyoee = await Employee.findById(id);
    res.status(200).json(singleEmplyoee);
    }
    catch (error){
        res.status(500).json({message: "Error while getting the selected employee."});
    }
})

/* Creating a new Employee */
router.post("/employees", async (req, res) => {
    const { firstName,
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
        emergencyContact: { name: emergencyContactName, phoneNumber: emergencyContactPhoneNumber, relationship },
        skillsAndQualifications: { skills, education },
        performanceMetrics: { performanceReviews, goals }} = req.body;

    try{
    const newEmployee = await Employee.create({ firstName,
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
        emergencyContact: { name: emergencyContactName, phoneNumber: emergencyContactPhoneNumber, relationship },
        skillsAndQualifications: { skills, education },
        performanceMetrics: { performanceReviews, goals }});

    res.status(200).json(newEmployee);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Employee"});
    }
})

/* Update Employee Info */
router.put("/employee/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      const {
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
        emergencyContact: { name: emergencyContactName, phoneNumber: emergencyContactPhoneNumber, relationship },
        skillsAndQualifications: { skills, education },
        performanceMetrics: { performanceReviews, goals }} = req.body

        if (!FirstName || !LastName || !DateOfBirth || !EmailAddress || !PhoneNumber || !StreetAddress || !City || !JobTitle || !DepartmentID || !StartDate || !Salary || !WeeklyWorkHours){
            return res.status(400).json({message: "Please fill all mandatory fields!"})
          }

      /* Find the employee via the id and send it back to the client */
      const updateEmployee = await Employee.findByIdAndUpdate(id, {
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
        emergencyContact: { name: emergencyContactName, phoneNumber: emergencyContactPhoneNumber, relationship },
        skillsAndQualifications: { skills, education },
        performanceMetrics: { performanceReviews, goals }
      }, { new: true });
      res.status(200).json(updateEmployee);
    } catch (error) {
        res.status(500).json({message: "Error while updating the Employee"});
    }
  })

  module.exports = router;