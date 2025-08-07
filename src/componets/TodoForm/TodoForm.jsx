import React from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "@context/TodosContext";
import { useContext } from "react";

const TodoForm = ({}) => {
    const shared = useContext(TodosContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        shared.useForm.onSubmit(data);
    };
    const delcmd = (index) => {
        shared.useTodos.deleteValidVar(index);
    }
    const onRed = () => {
        console.log("TRy")
        shared.useForm.onAddVar();
    }
    return (
        <>
        <h1>Přidání nového úkolu</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Název úkolu:</label><br />
            <input id="name" {...register("name",{required:true})} /><br />
            <h3>Vlastní proměnné:</h3>
            {shared.useTodos.getValidVars().map((validVar,index)=>
                <div key={index}><label htmlFor={"vv$"+String(index)}>{validVar}{" ... "}</label><button type="button" onClick={()=>{delcmd(index)}}>🗑</button><br/>
                <input id={"vv$"+String(index)} {...register("vv$"+validVar,{})} /></div>
            )}
            <button type="button" onClick={()=>{shared.redirect("/addVar")}}>Přidat novou proměnnou</button><br/>
            <button type="submit" >Přidat ➕</button>
        </form>
        </>
    )
}

export default TodoForm;