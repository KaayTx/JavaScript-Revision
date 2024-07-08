const message = "This is the best moment to have a look at this website !";
console.log(message);

function addDateTime(message){
    const date = new Date();
    const dateTime = date.toLocaleString();
    return `${dateTime} : ${message}`;
}

alert(addDateTime(message));