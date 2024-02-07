


function log(){
    //Much better log function that formats/indents
    //objects for better readability

    for(let i =0; i< arguments.length; i++){
        let arg = arguments[i]
        // Strignify and indent object
        if(typeof arg == 'object'){
            arg = JSON.stringify(arg, null, 2)
        }
        console.log(arg)
    }
}

export default { log }