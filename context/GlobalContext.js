import { createContext, useState, useEffect } from "react";

import { API } from "../config/api";


const GlobalContext = createContext(null);
const {Provider} = GlobalContext;

const GlobalProvider = ({children}) =>
{
    const [Authors, setAuthors] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [Ads,setAds] = useState([]);
    
    const [Error, setError] = useState({
        error: false,
        message:""
    })
    //get categories
    useEffect(()=>{

       
        fetch(`${API}/categories?populate=*`)
        .then((res) => {
            return res.json();

        })
        .then(({data})=>
        {
            const reordered_cats = reorder(data);
            setCategories(reordered_cats)


        })
        .catch((err)=>{
            setError(()=>{ return {err:true, message: err?.message}})
        })
    },[])

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
            setError(()=>{ return {error: true, message: err?.message}});
        })

    }, [])

    //get ads
    useEffect(()=>{

        fetch(`${API}/advertisments`)
        .then((res)=> res.json())
        .then((data)=>{
            setAds(data)
        })
        .catch((err)=>{
            setError(()=>{ return {error: true, message: err?.message}});
        })
    },[])

    const reorder = (cat_arr) => {
    

    
        const category_index = 
        {
          
          "Food & Drink": 1,
          "Interviews": 2,
          "Lifestyle": 3,
          "Fashion & Beauty": 4,
          "Travel": 5,
          "Health & Wellbeing": 6,
          "Shopping": 7,
          "Environment": 8,
          "Entertainment":9,
          "Sports":10,
          
          
          
        }
        var sorted_arr = [];
        Object.keys(category_index).forEach(function(key){
    
          var found = false;
          cat_arr = cat_arr.filter(function(cat){
    
            if(!found && cat.attributes.name == key){
              sorted_arr.push(cat)
              found = true;
              return false;
            }
            else{
              return true;
            }
    
          })
    
        })
    
        return sorted_arr;
    
    
       
       
        
    
        
    };


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
                Categories,
                Ads,
                Error,
                setAuthors,
                setCategories,
                setAds,
                setError,
                isMemberAuthor,
                findAuthorByID,
                
            }}
        >{children}</Provider>
    )

    

    

}

export {GlobalProvider, GlobalContext}