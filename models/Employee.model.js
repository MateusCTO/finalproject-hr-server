const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
  },
  profilePicture: {
    type: String, // To store the URL/path to the image
  },
  uploadedDocuments: [
    {
      fileName: {
        type: String,
      },
      filePath: {
        type: String,
      },
    },
  ],
  contactInformation: {
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      /* match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] */
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      /* match: [/^\+\d{11,15}$/, 'Please enter a valid phone number'] */
    },
  },
  address: {
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    stateProvince: {
      type: String,
    },
    postalCode: {
      type: String,
      trim: true,
    },
  },
  jobDetails: {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    departmentID: {
      type: String,
      enum: [
        "Web Development",
        "Financing",
        "Marketing",
        "HR",
        "Data Analytics",
        "Design",
      ],
      required: true,
      trim: true,
    },
    managerID: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
  salaryInformation: {
    salary: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
    },
  },
  workHours: {
    weeklyWorkHours: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  benefitsAndPerks: {
    healthInsurance: { type: String, enum: ["Yes", "No"], default: "No" },
    retirementPlans: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true,
    },
    phoneNumberEmergency: {
      type: String,
      trim: true,
      /* match: [/^\+\d{11,15}$/, "Please enter a valid phone number"], */
    },
    relationship: {
      type: String,
      trim: true,
    },
  },
  skillsAndQualifications: {
    skills: {
      type: [String],
    },
    education: {
      type: [String],
    },
  },
  performanceMetrics: {
    performanceReviews: {
      type: [String],
    },
    goals: {
      type: [String],
    },
  },
});

const Employee = model("Employee", EmployeeSchema);

module.exports = Employee;
