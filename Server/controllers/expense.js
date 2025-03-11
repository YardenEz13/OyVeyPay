const { userIdValidation } = require('../lib/validation/user');
const Expense= require('../models/expense');
const User= require('../models/user');
const {z}= require('zod');
const {expenseSchema,expenseIdValidation}= require('../lib/validation/expense');
const addExpense = async (req, res) => {
    try {
        if(!req.user._id.equals(req.params.userId)){
            return res.status(403).json({message: 'Forbidden'});
        }
        const userId = userIdValidation.parse(req.params.userId);
        const {title, description, amount, tag, currency} = expenseSchema.parse(req.body);
        const userExists = await User.findById(userId);
        if(!userExists){

            return res.status(404).json({message: 'User not found'})
        }
        
        const BASE_CURRENCY ='ILS';
        let exchangedAmount;
        if(currency !== BASE_CURRENCY){
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${currency}/${BASE_CURRENCY}/${amount}`
                );
                if(!response.ok){
                    return res.status(400).json({message: 'Failed to exchange'})
                }
                const data = await response.json();
                exchangedAmount = data.conversion_result;
                
                
        }
        else if(currency === BASE_CURRENCY){
            exchangedAmount= amount;
        }

        
       

        const expense = new Expense({
            title,
            description,
            amount,
            tag,
            currency,
            exchangedAmount,
        })
        await expense.save();
        userExists.expenses.push(expense._id);
        await userExists.save();
       
        return res.status(201).json({message: 'Expense added successfully', expense});
    }
    catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'internal server error' });
    }
}

const getExpenses= async(req,res)=>{
    try{
        const userId= userIdValidation.parse(req.params.userId);
        const userExists= await User.findById(userId);
        if(!userExists){
            return res.status(404).json({message:'User not found'});
        }
        const expenses= await Expense.find({_id:{$in:userExists.expenses}});
        return res.status(200).json({expenses});
    }
    catch(error){
        console.log(error);
        if(error instanceof z.ZodError){
            return res.status(400).json({message:error.errors[0].message});
        }
        return res.status(500).json({message:'internal server error'});
    }
}
const deleteExpense= async(req,res)=>{
    try{
        const expenseId= expenseIdValidation.parse(req.params.expenseId);
        const expenseExists= await Expense.findById(expenseId);
        if(!expenseExists){
                return res.status(404).json({message:'Expense not found'});
        }
        const userExists= await User.findById(req.params.userId);
        if(!userExists){
            return res.status(404).json({message:'User not found'});
        }
        const expenseIndex= userExists.expenses.indexOf(expenseId);
        userExists.expenses.splice(expenseIndex,1);
        await expenseExists.deleteOne();
        await userExists.save();
        return res.status(200).json({message:'Expense deleted successfully'});
    }
    catch(error){
        console.log(error);
        if(error instanceof z.ZodError){
            return res.status(400).json({message:error.errors[0].message});
        }
        return res.status(500).json({message:'internal server error'});

    }   
}
const updateExpense= async(req,res)=>{
    try{
        const userId= userIdValidation.parse(req.params.userId);
        const expenseId= expenseIdValidation.parse(req.params.expenseId);

            const {title,description,amount,tag,currency}= expenseSchema.parse(req.body);
            const userExists= await User.findById(userId);
            
            if(!userExists){
                return res.status(404).json({message:'User not found'});
            }
            
            const expenseExists= await Expense.findById(expenseId);
            
            if(!expenseExists){
                return res.status(404).json({message:'Expense not found'});
            }
            
            const BASE_CURRENCY ='ILS';
            if((currency !== BASE_CURRENCY) && (currency !== expenseExists.currency) || (amount !== expenseExists.amount)){
                const response = await fetch(
                    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${currency}/${BASE_CURRENCY}/${amount}`
                    );

                    if(!response.ok){
                        return res.status(400).json({message: 'Failed to exchange'})
                    }
                    
                    const data = await response.json();
                    exchangedAmount = data.conversion_result;
                   


            }
            else if(currency === BASE_CURRENCY){
                exchangedAmount= amount;
            }
           


            await expenseExists.updateOne({title,description,amount,tag,currency,exchangedAmount});
            
            await expenseExists.save();
            return res.status(200).json({message:'Expense updated successfully', expenseExists});

        }
        catch(error){
            console.log(error);
            if(error instanceof z.ZodError){
                return res.status(400).json({message:error.errors[0].message});
            }
            return res.status(500).json({message:'internal server error'});
        }
    }  
    const calculateTotalExpenses= async(req,res)=>{
        try{
            const userId= userIdValidation.parse(req.params.userId);
            if (req.user.id !== req.params.userId) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            
            const userExists= await User.findById(userId);
            if(!userExists){
                return res.status(404).json({message:'User not found'});
            }
            const expenses= await Expense.find({_id:{$in:userExists.expenses}});
            let totalAmount=0;

            expenses.forEach(expense=>{
                totalAmount+= expense.exchangedAmount;
                
            
            
            });
            return res.status(200).json({totalAmount:totalAmount.toFixed(2)});

        }

        catch(error){
            console.log(error);
            if(error instanceof z.ZodError){
                return res.status(400).json({message:error.errors[0].message});
            }
            return res.status(500).json({message:'internal server error'});
        }
    }
    
    



    module.exports={
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    calculateTotalExpenses
}   