const {addIncome,getIncomes,deleteIncome,updateIncome,calculateTotalIncomes}= require('../controllers/income');
const auth= require('../middleware/auth');
const router= require('express').Router();
router.post('/add-income/:userId',auth,addIncome);
router.get('/get-incomes/:userId',getIncomes);
router.delete('/delete-income/:incomeId',auth,deleteIncome);
router.patch('/update-income/:incomeId/:userId',auth,updateIncome);
router.get('/calculate-total-incomes/:userId',auth,calculateTotalIncomes);
module.exports= router;