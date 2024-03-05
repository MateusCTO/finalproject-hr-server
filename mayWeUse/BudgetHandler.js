class BudgetHandler {
  constructor(budgetData) {
    this.budgetData = budgetData;
  }

  calculateTotal(category) {
    const budgetAmount = this.budgetData.BudgetAmounts[category] || 0;
    const actualAmount = this.budgetData.ActualAmounts[category] || 0;
    return { budgetAmount, actualAmount, variance: actualAmount - budgetAmount };
  }

  getExpenseDetails(category) {
    const budgetAmount = this.budgetData.BudgetAmounts[category] || 0;
    const actualAmount = this.budgetData.ActualAmounts[category] || 0;
    const variance = actualAmount - budgetAmount;
    const notes = this.budgetData.NotesComments[category] || 'No notes available';
    return { budgetAmount, actualAmount, variance, notes };
  }

  updateActualAmount(category, amount) {
    this.budgetData.ActualAmounts[category] = amount;
    this.updateVariance(category);
  }

  updateVariance(category) {
    const budgetAmount = this.budgetData.BudgetAmounts[category] || 0;
    const actualAmount = this.budgetData.ActualAmounts[category] || 0;
    this.budgetData.Variance[category] = actualAmount - budgetAmount;
  }

  // Additional functions can be added based on your specific needs
}

// Example usage
const budgetData = /* Your provided data */;
const budgetHandler = new BudgetHandler(budgetData);

// Calculate and log the total for the "Sales" category
const salesTotal = budgetHandler.calculateTotal('Sales');
console.log('Sales Total:', salesTotal);

// Get and log details for the "RentLease" expense category
const rentDetails = budgetHandler.getExpenseDetails('RentLease');
console.log('Rent Details:', rentDetails);

// Update the actual amount for the "Taxes" category and recalculate variance
budgetHandler.updateActualAmount('Taxes', 260000);
const updatedTaxesDetails = budgetHandler.getExpenseDetails('Taxes');
console.log('Updated Taxes Details:', updatedTaxesDetails);
