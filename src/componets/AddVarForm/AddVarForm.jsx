import React from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "@context/TodosContext";
import { useContext } from "react";
import { redirect } from "react-router-dom";

const AddVarForm = ({}) => {
    const shared = useContext(TodosContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        shared.useAddVar.onSubmit(data);
    };
    return (
        <>
        <h1>Přidání nové proměnné</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Název nové proměnné:</label><br />
            <input id="name" {...register("name",{required:true})} /><br />
            <button type="submit">Přidat ➕</button>
            <button type="button" onClick={()=>{shared.redirect("/addNewItem")}}>Zrušit</button>
        </form>
        </>
    )
}

export default AddVarForm;