import { useContext } from "react";
import { TodosContext } from "@context/TodosContext";
const useForm = ({getShared}) => {
    const onSubmit = (data) => {
        let shared = getShared()
        shared.useTodos.addTodo([data["name"],0,[]])
        //console.log(data);
    }
    return {onSubmit} // Předá užitečné fce
}

export default useForm;