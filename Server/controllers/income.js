const { userIdValidation } = require('../lib/validation/user');
const Income = require('../models/income');
const User = require('../models/user');
const { z } = require('zod');
const { incomeSchema, incomeIdValidation } = require('../lib/validation/income');

// הוספת הכנסה עם המרת מטבע במידה והמטבע שונה מ־ILS
const addIncome = async (req, res) => {
    try {
        if (!req.user._id.equals(req.params.userId)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const userId = userIdValidation.parse(req.params.userId);
        const { title, description, amount, tag, currency } = incomeSchema.parse(req.body);
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const BASE_CURRENCY = 'ILS';
        let exchangedAmount;
        if (currency !== BASE_CURRENCY) {
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${currency}/${BASE_CURRENCY}/${amount}`
            );
            if (!response.ok) {
                return res.status(400).json({ message: 'Failed to exchange' });
            }
            const data = await response.json();
            exchangedAmount = data.conversion_result;
        } else {
            exchangedAmount = amount;
        }

        const income = new Income({
            title,
            description,
            amount,
            tag,
            currency,
            exchangedAmount,
        });
        await income.save();
        userExists.incomes.push(income._id);
        await userExists.save();

        return res.status(201).json({ message: 'Income added successfully', income });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'internal server error' });
    }
};

// שליפת כל ההכנסות למשתמש
const getIncomes = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const incomes = await Income.find({ _id: { $in: userExists.incomes } });
        return res.status(200).json({ incomes });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'internal server error' });
    }
};

// מחיקת הכנסה
const deleteIncome= async(req,res)=>{
    try{
        const incomeId= incomeIdValidation.parse(req.params.incomeId);
        const incomeExists= await Income.findById(incomeId);
        if(!incomeExists){
                return res.status(404).json({message:'income not found'});
        }
        const userExists= await User.findById(req.params.userId);
        if(!userExists){
            return res.status(404).json({message:'User not found'});
        }
        const incomeIndex= userExists.incomes.indexOf(incomeId);
        userExists.incomes.splice(incomeIndex,1);
        await incomeExists.deleteOne();
        await userExists.save();
        return res.status(200).json({message:'income deleted successfully'});
    }
    catch(error){
        console.log(error);
        if(error instanceof z.ZodError){
            return res.status(400).json({message:error.errors[0].message});
        }
        return res.status(500).json({message:'internal server error'});

    }   
}

// עדכון הכנסה – כולל חישוב מחודש של המרת המטבע במידה ונדרש
const updateIncome = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const incomeId = incomeIdValidation.parse(req.params.incomeId);
        const { title, description, amount, tag, currency } = incomeSchema.parse(req.body);
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const incomeExists = await Income.findById(incomeId);
        if (!incomeExists) {
            return res.status(404).json({ message: 'Income not found' });
        }
        const BASE_CURRENCY = 'ILS';
        let exchangedAmount;
        if ((currency !== BASE_CURRENCY && currency !== incomeExists.currency) || (amount !== incomeExists.amount)) {
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${currency}/${BASE_CURRENCY}/${amount}`
            );
            if (!response.ok) {
                return res.status(400).json({ message: 'Failed to exchange' });
            }
            const data = await response.json();
            exchangedAmount = data.conversion_result;
        } else if (currency === BASE_CURRENCY) {
            exchangedAmount = amount;
        } else {
            exchangedAmount = incomeExists.exchangedAmount;
        }

        await incomeExists.updateOne({ title, description, amount, tag, currency, exchangedAmount });
        return res.status(200).json({ message: 'Income updated successfully', income: incomeExists });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'internal server error' });
    }
};

// חישוב סך כל ההכנסות במטבע הבסיסי (ILS)
const calculateTotalIncomes = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        if (!req.user._id.equals(req.params.userId)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const incomes = await Income.find({ _id: { $in: userExists.incomes } });
        let totalAmount = 0;
        incomes.forEach(income => {
            totalAmount += income.exchangedAmount;
        });
        return res.status(200).json({ totalAmount: totalAmount.toFixed(2) });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    addIncome,
    getIncomes,
    deleteIncome,
    updateIncome,
    calculateTotalIncomes
};
