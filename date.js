
function getDate() {
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"   
    }
    return today.toLocaleDateString("es-PE", options);
};

module.exports.getDate = getDate;

function getDay() {
    let today = new Date();
    
    let options = {
        weekday: "long",
    }
    return today.toLocaleDateString("es-PE", options);
    
};


module.exports.getDay = getDay