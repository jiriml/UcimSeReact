import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";
import { useNavigate } from "react-router-dom";


const useForm = ({getShared}) => {
    const navigate = useNavigate();
    const onSubmit = (data) => {
        let shared = getShared()
        shared.useTodos.addTodo([data["name"],0,[]])
        shared.redirect("/table")
    }
    return {onSubmit} // Předá užitečné fce
}

export default useForm;