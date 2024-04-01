import { createContext, useState, useEffect } from "react";

import { API } from "../config/api";


const GlobalContext = createContext(null);
const {Provider} = GlobalContext;

const GlobalProvider = ({children}) =>
{
    const [Authors, setAuthors] = useState([]);
    
    const [Error, setError] = useState({
        error: false,
        message:""
    })

    //get authors
    useEffect(()=>{

        fetch(`${API}/authors?populate=*`)
        .then((response)=>{
            return response.json()
        })
        .then(({data})=>
        {
            setAuthors(data);
        })
        .catch((err)=>{
            setError(()=>{ return {error: true, message: err.message}});
        })

    }, [Authors.length,Authors])


    const isMemberAuthor = (member)=>
    {

        var isAuthor = false;
        for(let i= 0; i < Authors?.length; i ++ )
        {
            if(member === Authors[i]?.attributes?.name)
            {
                isAuthor = true;
                break;
            }
        }

        return isAuthor;

    }
    const findAuthorByID = (id)=>

    {
        const author = Authors?.filter((user)=> parseInt(user?.id) === parseInt(id))

        return author[0];
    }   

    return (
        <Provider 
            value={{
                Authors,
                Error,
                setAuthors,
                setError,
                isMemberAuthor,
                findAuthorByID,
                
            }}
        >{children}</Provider>
    )

    

    

}

export {GlobalProvider, GlobalContext}