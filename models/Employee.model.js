const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true
  },
  Gender: {
    type: String,
  },
  ProfilePicture: {
    type: String, // To store the URL/path to the image
  },
  UploadedDocuments: [
    {
      FileName: {
        type: String,
      },
      FilePath: {
        type: String,
      },
    }, 
    ],
  ContactInformation: {
    EmailAddress: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    PhoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^\+\d{11,15}$/, 'Please enter a valid phone number']
    }
  },
  Address: {
    StreetAddress: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    StateProvince: {
      type: String,
    },
    PostalCode: {
      type: String,
      trim: true
    }
  },
  JobDetails: {
    JobTitle: {
      type: String,
      required: true,
      trim: true
    },
    DepartmentID: {
      type: String,
      enum: ["Web Development", "Financing", "Marketing", "HR", "Data Analytics", "Design"],
      required: true,
      trim: true
    },
    ManagerID: {
      type: String,
      trim: true
    },
    StartDate: {
      type: Date,
      required: true
    },
    EndDate: {
      type: Date
    }
  },
  SalaryInformation: {
    Salary: {
      type: Number,
      required: true
    },
    Currency: {
      type: String,
      trim: true
    }
  },
  WorkHours: {
    WeeklyWorkHours: {
      type: Number,
      required: true,
      min: 0
    }
  },
  BenefitsAndPerks: {
    HealthInsurance: {
      type: Boolean,
    },
    RetirementPlans: {
      type: Boolean,
    }
  },
  EmergencyContact: {
    Name: {
      type: String,
      trim: true
    },
    PhoneNumber: {
      type: String,
      trim: true,
      match: [/^\+\d{11,15}$/, 'Please enter a valid phone number']
    },
    Relationship: {
      type: String,
      trim: true
    }
  },
  SkillsAndQualifications: {
    Skills: {
      type: [String],
    },
    Education: {
      type: [String],
    }
  },
  PerformanceMetrics: {
    PerformanceReviews: {
      type: [String],
    },
    Goals: {
      type: [String],
    }
  }
});

const Employee = model('Employee', EmployeeSchema);

module.exports = Employee;
