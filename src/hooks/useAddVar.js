import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";
import { useNavigate } from "react-router-dom";


const useAddVar = ({getShared}) => {
    const navigate = useNavigate();
    const onSubmit = (data) => {
        let shared = getShared();
        shared.useTodos.addValidVar(data["name"])
        shared.redirect("/addNewItem")
    }
    return {onSubmit} // Předá užitečné fce
}

export default useAddVar;
