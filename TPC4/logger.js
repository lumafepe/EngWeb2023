exports.log = (message)=>{
    var d = new Date().toISOString().substring(0, 16)
    console.log(d +" -> "+ message)
}