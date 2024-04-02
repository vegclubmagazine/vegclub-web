


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

const slugToName = (str) =>
{
    if(typeof str !== "string")return null;

    var str_list = str.split("-");
    const empty_str_list = [];
     
    for(let i=0; i<str_list.length; i++)
    {
        empty_str_list.push(str_list[i].replace(/\w{1}/, str_list[i].match(/\w{1}/)[0].toUpperCase()))
    }

    return empty_str_list.join(" ");
}
export {slugify, slugToName}
