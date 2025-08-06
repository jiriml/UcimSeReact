import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './componets/TodoList';
import TodoForm from "./componets/ToDoForm";
import { useTodos, useForm } from "./hooks";
import { TodosContext } from "./context/TodosContext.jsx";



function App() {
  const navigate = useNavigate()
  const getShared = () => {
    try {
      return shared 
    } catch (e) { return {}}
  }

  const shared = {
    TodoList: TodoList,
    TodoForm: TodoForm,
    useTodos: useTodos({getShared}),
    useForm: useForm({getShared}),
    redirect: (...a) => {return navigate(...a)}
  }



  return (
    
      <TodosContext.Provider value={shared}>
        <Link to="/addNewItem">Přidat</Link> | {" "}
        <Link to="/table">Tabulka</Link>
        <Routes>
          <Route path="/" element={<Navigate to="/addNewItem" replace />}/>
          <Route path="/addNewItem" element={<TodoForm />}/>
          <Route path="/table" element={<TodoList />} />
          <Route path="/bigTable" element={<p>Tato stránka ješté není doděláná</p>} />
        </Routes>
      </TodosContext.Provider>
      
   
  )
}

export default App;