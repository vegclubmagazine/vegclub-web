import { createContext, useState, useEffect, useReducer } from "react";

import { API, BASE_URL } from "../config/api";

const INITIAL_STATE = {
    user: null,
    hasLoginError: false,
    

  
    
}
const GlobalContext = createContext(null);
const {Provider} = GlobalContext;

const GlobalProvider = ({children}) =>
{
    const reducer = ({state, action}) =>
    {
        switch(action.type){
            case "login":
                const {username, password} = action.payload;
                if(validateCredentials(username, password)){
                    return {
                        ...state,
                        hasLoginError: false,
                        user:{}
                    }
                }

                return {
                    ...state,
                    hasLoginError: true,
                    user:null
                }
            case "logout":
                return {
                    ...state,
                    user:null
                }
            default:
                throw new Error(`Invalid action type: ${action.type}`)

        }
    }

    const [state,dispatch] = useReducer(reducer, INITIAL_STATE);

    const login = (username, password) =>
    {
        dispatch({type:"login", payload :{username, password}})
    }

    const logout = () =>
    {
        dispatch({type:"logout"})
    }

    const UserState = {
        user: state.user,
        hasLoginError:state.hasLoginError,
        login,
        logout
    }

    const [Authors, setAuthors] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [Ads,setAds] = useState([]);
    const [ManagePreferences, setManagePreferences] = useState(false);
    const [CookieConsentHandled, setCookieConsentHandled] = useState(false);



   
    
    const [Error, setError] = useState({
        error: false,
        message:""
    })
    // check whether cookie consent cookie exists
    useEffect(()=>{
        if(document && document.cookie.split("; ").some((item)=>item.startsWith("cookie-consent-handled="))){
            setCookieConsentHandled(true);
        }

    },[])
    
   
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

    const getTotalRestaurants = async(country) =>
    {
        const filter = { f1:{country:{eqi:country}}};

        const query = 
        `query getRestaurantsViaCountry($f1:RestaurantFiltersInput){
            restaurants(filters:$f1){
                meta{
                    pagination{
                        total
                    }
                }

            }
        }`;

        const restaurantsPromise = new Promise((getData,getErr) => {

            fetch(`${BASE_URL}/graphql`, {

                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                },
                body:JSON.stringify({
                    query:query,
                    variables:filter
                })

            })
            .then((response)=>{
                return response.json();
            })
            .then(({data})=>{

                getData(data?.restaurants?.data?.meta?.pagination?.total)

            })
            .catch(err => getErr(err))
        });

        const restaurantsCount = await restaurantsPromise;

    
    }


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
    const getContestantById = async (id)=>
    {
        const res = await fetch(`${API}/contestants/${id}?populate=*`);

        const {data} = await res.json();

        return data;
    }  

    return (
        <Provider 
            value={{
                Authors,
                Categories,
                Ads,
                Error,
                UserState,
                ManagePreferences,
                CookieConsentHandled,
                setAuthors,
                setCategories,
                setAds,
                setError,
                setManagePreferences,
                isMemberAuthor,
                findAuthorByID,
                getTotalRestaurants,
                getContestantById,
                setCookieConsentHandled,
                

                
            }}
        >{children}</Provider>
    )

    

    

}

export {GlobalProvider, GlobalContext}