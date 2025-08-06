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

    return (
        <>
        <h1>Přidání nového úkolu</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Název úkolu:</label><br />
            <input id="name" {...register("name",{required:true})} /><br />
            <button type="submit">Přidat ➕</button>

        </form>
        </>
    )
}

export default TodoForm;