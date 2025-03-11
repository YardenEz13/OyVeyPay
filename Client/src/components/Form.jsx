import React,{useRef} from 'react'
import { useAuth } from './AuthProvider'

export const Form = ({title,handleSubmit, dataArray}) => {
    
  const [isPending, setIsPending] = useState(false)
//  const [expenses, setExpenses] = useState([])
  const[selectedFilter,setSelectedFilter]= useState(null)
  const [inputSearch,setInputSearch] =useState('');

  const { user } = useAuth();
  

    const titleRef = useRef(null);
    const descrptionRef = useRef(null);
    const amountRef = useRef(null);
    const tagRef = useRef(null);
    const currencyRef = useRef(null);
    return (
        <main className='expense-container'>
          <h1>Expenses</h1>
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
            <div><label htmlFor='tag'>Tag</label>
              <select id="tag" ref={tagRef} required>
                <option value="food">Food</option>
                <option value="rent">Rent</option>
                <option value="transport">Transport</option>
                <option value="clothing">Clothing</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select></div>
            <div><label htmlFor='currency'>Currency</label>
              <select id="currency" ref={currencyRef} required>
                <option value="ILS">ILS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JOD">JOD</option>
                <option value="JPY">JPY</option>
                <option value="INR">INR</option>
              </select></div>
            <button type='submit' className='expense-button' disabled={isPending}>
              {currentExpense ? 'Edit Expense' : 'Add Expense'}
            </button>
          </form>
        <Filters 
          inputSearch={inputSearch} 
          setInputSearch={setInputSearch}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          maxAmount={maxAmount}
        />
    
    {filteredExpenses.length > 0 ? (
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
              {expenses && expenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>{expense.title}</td>
                    <td>{expense.description}</td>
                    <td>{expense.amount} {CURRENCY_SYMBOLS[expense.currency]}</td>
                    <td>{expense.tag}</td>
    
                    <td>
                      <div className='action-buttons'>
                        <button className='edit-button' onClick={() => handleEditClick(expense)} disabled={isEditing[expense._id] || isDeleting[expense._id]}>Edit</button>
                        <button className='delete-button' onClick={() => handleDelete(expense._id)} disabled={isDeleting[expense._id] || isEditing[expense._id]}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No expenses found</td>
                </tr>
              )}
            </tbody>
          </table>
           ) : inputSearch ? (
            <div className='no-expenses-message'>
              No matching expenses found for "{inputSearch}".
            </div>
          ):(
            <div className='no-expenses-message'>
              No expenses found.
            </div>
          )}
        </main>
      );
}


