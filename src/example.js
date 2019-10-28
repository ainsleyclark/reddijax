
import Reddijax from './Reddijax';
let ajax = new Reddijax();

// Get
ajax.get({
    url: 'https://jsonplaceholder.typicode.com/todos/1'
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

//Post
ajax.post({
    url: 'https://reqres.in/api/users', 
    data: {
        name: "paul rudd",
        movies: ["I Love You Man", "Role Models"]
    },
    contentType: 'application/json',
    dataType: 'json'
}).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});