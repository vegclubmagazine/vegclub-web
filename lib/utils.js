


const slugify = (str)=>
{
    if(typeof str !== "string")return;
    
    const lower_case_str = str.toLowerCase();
    const white_space_regex = /(?<=\S)\s(?=\S)/g

    const dash_delimited_str = lower_case_str.replace(white_space_regex, "-");
    
    // replace "&" with "and"
    const slug = dash_delimited_str.replace(/(?<=-)&(?=-)/g , "and");


    return slug;



    


}

export {slugify}
