import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import '../styles/Expenses.css';
import { createIncome, getIncomes, deleteIncome, updateIncome } from '../api/income';
import { toast } from 'react-toastify';
import { CURRENCY_SYMBOLS } from '../constants';
import { Filters } from './Filters';

export const Incomes = () => {
  const [isPending, setIsPending] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { user } = useAuth();
  const [inputSearch, setInputSearch] = useState('');
  const titleRef = useRef(null);
  const descrptionRef = useRef(null);
  const amountRef = useRef(null);
  const tagRef = useRef(null);
  const currencyRef = useRef(null);
  const [currentIncome, setCurrentIncome] = useState(null);
  const [isDeleting, setIsDeleting] = useState({});
  const [isEditing, setIsEditing] = useState({});

  const maxAmount = incomes.length > 0 ? Math.max(...incomes.map(income => income.amount)) : 0;

  const filteredIncomes = incomes.filter((income) => {
    const matchSearch = income.title.toLowerCase().includes(inputSearch.toLowerCase());
    if (selectedFilter && selectedFilter.type === 'amount') {
      console.log('Filtering:', {
        amount: income.amount,
        min: selectedFilter.min,
        max: selectedFilter.max,
        passes: income.amount >= selectedFilter.min && income.amount <= selectedFilter.max
      });
      return matchSearch && income.amount >= selectedFilter.min && income.amount <= selectedFilter.max;
    }
    return matchSearch;
  });

  const resetFields = () => {
    titleRef.current.value = "";
    descrptionRef.current.value = "";
    amountRef.current.value = "";
    tagRef.current.value = "";
    currencyRef.current.value = "";
  };

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes(user.id);
      // חשוב לוודא שהמפתח בתשובת השרת הוא "incomes" (אות קטנה)
      setIncomes(data.incomes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descrptionRef.current?.value;
    const tag = tagRef.current.value;
    const amount = amountRef.current.value;
    const currency = currencyRef.current.value;
    const payload = {
      userId: user.id,
      title,
      description,
      tag,
      amount: Number(amount),
      currency
    };

    try {
      setIsPending(true);
      let data;
      if (currentIncome) {
        data = await updateIncome(currentIncome._id, payload);
        setIncomes((prevIncomes) =>
          prevIncomes.map((income) =>
            income._id === currentIncome._id ? data.income : income
          )
        );
        toast.success("Income updated successfully");
      } else {
        data = await createIncome(payload);
        setIncomes((prevIncomes) => [...prevIncomes, data.income]);
        toast.success(data.message);
      }
      resetFields();
      setCurrentIncome(null);
    } catch (error) {
      toast.error("Failed to submit income.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (incomeId) => {
    try {
      setIsDeleting(prev => ({ ...prev, [incomeId]: true }));
      await deleteIncome(user.id, incomeId);
      setIncomes((prevIncomes) => prevIncomes.filter(income => income._id !== incomeId));
      toast.success("Income deleted successfully");
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast.error(error.message);
    } finally {
      setIsDeleting(prev => ({ ...prev, [incomeId]: false }));
    }
  };

  const handleEditClick = (income) => {
    try {
      setIsEditing(prev => ({ ...prev, [income._id]: true }));
      setCurrentIncome(income);
      titleRef.current.value = income.title;
      descrptionRef.current.value = income.description || '';
      amountRef.current.value = income.amount;
      tagRef.current.value = income.tag;
      currencyRef.current.value = income.currency || 'ILS';
    } catch (error) {
      console.error("Error in handleEditClick:", error);
      toast.error("Failed to load income for editing.");
    } finally {
      setIsEditing(prev => ({ ...prev, [income._id]: false }));
    }
  };

  return (
    <main className='expense-container'>
      <h1>Incomes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' ref={titleRef} id='title' placeholder='Enter the title' required />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input type='text' ref={descrptionRef} id='description' placeholder='Enter the description' />
        </div>
        <div>
          <label htmlFor='amount'>Amount</label>
          <input type='number' ref={amountRef} inputMode='numeric' id='amount' placeholder='Enter the amount' required />
        </div>
        <div>
          <label htmlFor='tag'>Tag</label>
          <select id="tag" ref={tagRef} required>
            <option value="salary">salary</option>
            <option value="bonus">bonus</option>
            <option value="gift">gift</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor='currency'>Currency</label>
          <select id="currency" ref={currencyRef} required>
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JOD">JOD</option>
            <option value="JPY">JPY</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <button type='submit' className='expense-button' disabled={isPending}>
          {currentIncome ? 'Edit Income' : 'Add Income'}
        </button>
      </form>
      <Filters 
        inputSearch={inputSearch} 
        setInputSearch={setInputSearch}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        maxAmount={maxAmount}
      />
      {filteredIncomes.length > 0 ? (
        <div className='table-container'>
        <table className='expenses-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Tag</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {incomes && incomes.length > 0 ? (
              filteredIncomes.map((income) => (
                <tr key={income._id}>
                  <td>{income.title}</td>
                  <td>{income.description}</td>
                  <td className='Income-amount' >{income.amount} {CURRENCY_SYMBOLS[income.currency]}</td>
                  <td>{income.tag}</td>
                  <td>
                    <div className='action-buttons'>
                      <button 
                        className='edit-button' 
                        onClick={() => handleEditClick(income)} 
                        disabled={isEditing[income._id] || isDeleting[income._id]}
                      >
                        Edit
                      </button>
                      <button 
                        className='delete-button' 
                        onClick={() => handleDelete(income._id)} 
                        disabled={isDeleting[income._id] || isEditing[income._id]}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No incomes found</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      ) : inputSearch ? (
        <div className='no-incomes-message'>
          No matching incomes found for "{inputSearch}".
        </div>
      ) : (
        <div className='no-incomes-message'>
          No incomes found.
        </div>
      )}
    </main>
  );
};
