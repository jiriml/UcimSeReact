import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './componets/TodoList';
import TodoItem from "./componets/TodoList/TodoItem.jsx";
import TodoForm from "./componets/ToDoForm";
import AddVarForm from "./componets/AddVarForm";
import FilterDom from './componets/FilterDom';
import { useTodos, useForm, useAddVar } from "./hooks";
import { TodosContext } from "./context/TodosContext.jsx";
import useFilter from './hooks/useFilter.js';



function App() {
  const navigate = useNavigate()
  const getShared = () => {
    try {
      return shared 
    } catch (e) { return {}}
  }

  const shared = {
    AddVarForm: AddVarForm,
    TodoItem : TodoItem,
    TodoList: TodoList,
    TodoForm: TodoForm,
    FilterDom: FilterDom,
    useTodos: useTodos({getShared}),
    useForm: useForm({getShared}),
    useAddVar: useAddVar({getShared}),
    useFilter: useFilter({getShared}),
    redirect: (...a) => {return navigate(...a)}
  }



  return (
    
      <TodosContext.Provider value={shared}>
        <Link to="/addVar">Přidat proměnnou</Link> | {" "}
        <Link to="/addNewItem">Přidat úkol</Link> | {" "}
        <Link to="/table">Tabulka</Link> | {" "}
        <Link to="/filter">Filter</Link>
        
        <Routes>
          <Route path="/" element={<Navigate to="/addNewItem" replace />}/>
          <Route path="/addNewItem" element={<TodoForm />}/>
          <Route path="/table" element={<TodoList />} />
          <Route path="/addVar" element={<AddVarForm />}/>
          <Route path="/filter" element={<FilterDom/>}/>
          <Route path="/bigTable" element={<p>Tato stránka ješté není doděláná</p>} />
        </Routes>
      </TodosContext.Provider>
      
   
  )
}

export default App;