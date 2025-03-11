const {addExpense,getExpenses,deleteExpense,updateExpense,calculateTotalExpenses}= require('../controllers/expense');
const router= require('express').Router();
router.post('/add-expense/:userId',addExpense);
router.get('/get-expenses/:userId',getExpenses);
router.delete('/delete-expense/:userId/:expenseId',deleteExpense);
router.patch('/update-expense/:userId/:expenseId',updateExpense);
router.get('/calculate-total-expenses/:userId',calculateTotalExpenses);

module.exports= router;