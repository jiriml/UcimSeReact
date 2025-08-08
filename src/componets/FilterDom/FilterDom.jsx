import React from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "@context/TodosContext";
import { useContext } from "react";
import { redirect } from "react-router-dom";

const FilterDom = ({}) => {
        const shared = useContext(TodosContext);
        return ( <>
        <h1>Filtr</h1>
        <div style={{width:"100%",justifyContent:"center",display:"flex"}}><table>
            <tbody>
                <tr>
                    {shared.useFilter.getForUi().map((p,key)=>
                    <td key={key}>
                        <h3>{p[0]}</h3>
                        Filtrovat: <input type="checkbox" onChange={(event)=>{shared.useFilter.toogleFilter(key-1,event.target.checked)}} checked={!!p[1]}/><br/>
                        {p[2].map((v,k)=>
                            <>{v}:<input type="checkbox" checked={true} onChange={()=>{shared.useFilter.recieveAction(key-1,v,false)}}/><br/></>
                        )}
                        {p[3].map((v,k)=>
                            <>{v}:<input type="checkbox" checked={false} onChange={()=>{shared.useFilter.recieveAction(key-1,v,true)}}/><br/></>
                        )}
                    </td>
                    
                    )}
                </tr>
            </tbody>
        </table></div>
    
    </>)



}

export default FilterDom;