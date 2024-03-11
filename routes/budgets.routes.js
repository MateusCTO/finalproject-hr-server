const router = require("express").Router();
const Budget = require("../models/Budget.model");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: ["http://localhost:5005", "http://localhost:5173"],
  optionsSuccessStatus: 200,
};

router.get("/budgets", cors(corsOptions), async (req, res, next) => {
  try {
    const allBudgets = await Budget.find();
    if (!allBudgets) {
      throw new Error("No budgets found");
    }
    res.json(allBudgets);
  } catch (error) {
    next(error);
  }
});

router.get("/budgets/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);
    if (!budget) {
      throw new Error("Budget not found!");
    }
    res.json(budget);
  } catch (error) {
    next(error);
  }
});

router.post("/budgets", cors(corsOptions), async (req, res, next) => {
  try {
    const {
      budgetName,
      startDate,
      endDate,
      incomeCategories: { revenue, sales, interestIncome, otherIncome } = {},
      expenseCategories: {
        salariesAndWages,
        rentLease,
        utilities,
        suppliesAndMaterials,
        marketingAndAdvertising,
        travelAndEntertainment,
        maintenanceAndRepairs,
        insurancePremiums,
        taxes,
        interestExpense,
        depreciationAndAmortization,
      } = {},
      budgetAmounts,
      actualAmounts,
      variance,
      notesComments,
      approvalStatus,
      currency,
    } = req.body;
    const newBudget = await Budget.create({
      budgetName,
      startDate,
      endDate,
      incomeCategories: { revenue, sales, interestIncome, otherIncome },
      expenseCategories: {
        salariesAndWages,
        rentLease,
        utilities,
        suppliesAndMaterials,
        marketingAndAdvertising,
        travelAndEntertainment,
        maintenanceAndRepairs,
        insurancePremiums,
        taxes,
        interestExpense,
        depreciationAndAmortization,
      },
      budgetAmounts,
      actualAmounts,
      variance,
      notesComments,
      approvalStatus,
      currency,
    });
    if (!newBudget) {
      throw new Error("It wasn't possible to create a new Budget");
    }
    res.json(newBudget);
  } catch (error) {
    next(error);
  }
});

router.put("/budgets/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the budget via the id
    const budget = await Budget.findById(id);

    if (!budget) {
      throw new Error("Budget not found");
    }

    // Loop through the request body and add fields to updateFields object if they exist
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        budget[key] = req.body[key];
      }
    }

    // Explicitly call save to trigger the pre-save middleware
    const updatedBudget = await budget.save();

    // Optionally, handle the updated budget on the client side
    res.status(200).json(updatedBudget);
  } catch (error) {
    next(error);
  }
});

router.delete("/budgets/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const { id } = req.params;
    await Budget.findByIdAndDelete(id);
    res.json({ message: "Budget deleted!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
