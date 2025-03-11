import React, { useEffect, useState } from 'react'

import { useAuth } from './AuthProvider'
import '../styles/Dashboard.css';
import { Navigate } from 'react-router';
import { CURRENCY_SYMBOLS } from '../constants';
import { calculateTotalExpenses } from '../api/expense';
import { calculateTotalIncomes } from '../api/income';
import { LineChart, BarChart } from './charts';


export const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  // אם המשתמש לא מחובר, נעביר אותו לדף ההתחברות
  if (!isLoggedIn || !user) {
    return <Navigate to="/auth" />;
  }
  const fetchTotalExpenses = async () => {
    try {
      const data = await calculateTotalExpenses(user.id);
      setTotalExpenses(data.totalAmount);
    } catch (error) {
      console.error('Failed to fetch total expenses:', error);
    }
  }
  const fetchTotalIncomes = async () => {
    try {
      const data = await calculateTotalIncomes(user.id);
      setTotalIncomes(data.totalAmount);
      console.log(data.totalAmount);
    } catch (error) {
      console.error('Failed to fetch total incomes:', error);
    }
  }
  
  useEffect(() => {
    fetchTotalExpenses();
    fetchTotalIncomes();
  }, [user.id]);


  return (
    <div className='dashboard'>

      <header className='dashboard-header'>
        <h1>Welcome {user.username}</h1>
      </header>


      <div className='summary'>
        <div className="card income">
          <h2>Total Incomes</h2>
            <p>{totalIncomes ? totalIncomes+CURRENCY_SYMBOLS["ILS"] : '...'}
             
            </p>
        </div>



        <div className="card expenses">
          <h2>Total Expenses</h2>
          <p>
            {totalExpenses ?  totalExpenses+CURRENCY_SYMBOLS["ILS"] : '...'}
            
          </p>
        </div>




        <div className="card balance">
          <h2>Total Balance</h2>
            <p>{totalIncomes ? (totalIncomes-totalExpenses).toFixed(2)+CURRENCY_SYMBOLS ["ILS"] : '...'}</p>
        </div>
      </div>
<div className='charts'>
  <LineChart />
  <BarChart />
</div>  
     
    </div>

  )
}

export default Dashboard;
