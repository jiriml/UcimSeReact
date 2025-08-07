import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";
import { useNavigate } from "react-router-dom";


const useForm = ({getShared}) => {
    const navigate = useNavigate();
    const onSubmit = (data) => {
        let shared = getShared();
        let filtered = Object.fromEntries(
            Object.entries(data).filter(([k,v])=>{return k.startsWith("vv$")}).map(([k,v])=>{return [k.slice(3),v]})
        );
        shared.useTodos.addTodo([data["name"],0,shared.useTodos.unityVars(filtered)])
        shared.redirect("/table")
    }
    return {onSubmit} // Předá užitečné fce
}

export default useForm;