const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calculateVariance = function () {
  const variance = {};
  const actualAmounts = this.actualAmounts;
  const budgetAmounts = this.budgetAmounts;

  for (let key in actualAmounts) {
    if (
      actualAmounts.hasOwnProperty(key) &&
      budgetAmounts.hasOwnProperty(key)
    ) {
      variance[key] = actualAmounts[key] - budgetAmounts[key];
    }
  }

  return variance;
};

const budgetSchema = new Schema({
  budgetName: { type: String, required: true },
  startDate: { type: String, default: Date.now },
  endDate: { type: String, required: true },
  incomeCategories: {
    revenue: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    interestIncome: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 },
  },
  expenseCategories: {
    salariesAndWages: { type: Number, default: 0 },
    rentLease: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    suppliesAndMaterials: { type: Number, default: 0 },
    marketingAndAdvertising: { type: Number, default: 0 },
    travelAndEntertainment: { type: Number, default: 0 },
    maintenanceAndRepairs: { type: Number, default: 0 },
    insurancePremiums: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    interestExpense: { type: Number, default: 0 },
    depreciationAndAmortization: { type: Number, default: 0 },
  },
  budgetAmounts: {
    revenue: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    interestIncome: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 },
    salariesAndWages: { type: Number, default: 0 },
    rentLease: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    suppliesAndMaterials: { type: Number, default: 0 },
    marketingAndAdvertising: { type: Number, default: 0 },
    travelAndEntertainment: { type: Number, default: 0 },
    maintenanceAndRepairs: { type: Number, default: 0 },
    insurancePremiums: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    interestExpense: { type: Number, default: 0 },
    depreciationAndAmortization: { type: Number, default: 0 },
  },
  actualAmounts: {
    revenue: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    interestIncome: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 },
    salariesAndWages: { type: Number, default: 0 },
    rentLease: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    suppliesAndMaterials: { type: Number, default: 0 },
    marketingAndAdvertising: { type: Number, default: 0 },
    travelAndEntertainment: { type: Number, default: 0 },
    maintenanceAndRepairs: { type: Number, default: 0 },
    insurancePremiums: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    interestExpense: { type: Number, default: 0 },
    depreciationAndAmortization: { type: Number, default: 0 },
  },
  variance: {
    revenue: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    interestIncome: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 },
    salariesAndWages: { type: Number, default: 0 },
    rentLease: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    suppliesAndMaterials: { type: Number, default: 0 },
    marketingAndAdvertising: { type: Number, default: 0 },
    travelAndEntertainment: { type: Number, default: 0 },
    maintenanceAndRepairs: { type: Number, default: 0 },
    insurancePremiums: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    interestExpense: { type: Number, default: 0 },
    depreciationAndAmortization: { type: Number, default: 0 },
  },
  notesComments: { type: String },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  currency: {
    type: String,
    enum: ["EUR", "USD", "JPY", "BRL"],
    default: "EUR",
  },
});

budgetSchema.methods.calculateVariance = calculateVariance;

budgetSchema.pre("save", function (next) {
  this.variance = this.calculateVariance();
  next();
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
