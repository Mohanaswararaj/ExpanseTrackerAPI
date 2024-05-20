import React, { useState } from 'react';
import "./index.css";
import Expensecard from './component/Expensecard';
import Expenseform from './component/Expenseform';

const expenses = [
  {
    id: 1,
    title: "car",
    amount: -200
  },
  {
    id: 2,
    title: "salary",
    amount: 2000
  },
  {
    id: 3,
    title: "snacks",
    amount: 3000
  }
];

const App = () => {
  const [list, setList] = useState(expenses);
  const[editId,setEditId]=useState();
  let income = 0;
  let expense = 0;

  const itemToEdit =  list.find((item)=> item.id === editId);
  console.log(itemToEdit);


  list.forEach((j) => {
    if (j.amount > 0) {
      income += j.amount;
    } else {
      expense += j.amount;
    }
  });

  const deleteItem = (id) => {
    console.log("Item deleted", id);
    const res = list.filter((i) => {
      return i.id !== id;
    });
    setList([...res]);
  };

  const addItem =(title,amount)=>{
    const newItem={
      id: list[list.length-1].id +1,
      title : title,
      amount: parseInt(amount),
    };
    setList([...list,newItem]);
  };
  
 const editItem =(title,amount)=>{
        const res=list.map((item)=>{
    if(item.id === editId){
      item.title=title
      item.amount= parseInt (amount);
    }
    return item;
       });
       setList([...res]);
       setEditId(null);
 };
 


  return (
    <>
      <div className='up'>
        <h1>Expense Tracker</h1>
        <div className='expense'>
          <div>
            <h3>Expense</h3>
            <p>{expense}</p>
          </div>
          <div>
            

            <h3>Income</h3>
            <p>{income}</p>
          </div>
        </div>
       
        {/* Add New Transactions Card */}
        {/* <div className="card">
          <h3>Add New Transactions</h3>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" placeholder="Enter title" />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" placeholder="Enter amount" />
            </div>
            <input type="submit" value="Add" className="add-btn" />
          </form>
        </div> */}
        {/* End of Add New Transactions Card */}  
        <Expenseform addItem ={addItem} itemToEdit={itemToEdit}   editItem={editItem}/>
          <h1>History</h1>
        <div className='list-container'>
          {list.map((i) => {
            return <Expensecard key={i.id} 
                                title={i.title}
                                 amount={i.amount} 
                                 deleteItem={deleteItem} 
                                 id={i.id} 
                                 setEditId={setEditId}/>
          })}
        </div>
      </div>
    </>
  )
}

export default App;