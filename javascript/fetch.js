//fetch
//자바스크립트에서 비동기처리를 간편하게 하기 위해 고안
/*
fetch('http://jsonplaceholder.typicode.com/users')
// .then(response => {
//     console.log(response)
//     console.log(typeof response);//object
//     console.log(response instanceof Response);//true response는 Response타입이다.
// })
.then(response => response.json())
.then(json => {
    console.log(json);
    console.log(json.length);
});
*/

//patch/put
fetch('http://jsonplaceholder.typicode.com/users',
{
    method : 'PATCH',
    header : {'content-type': 'application/json'}
}
)
.then(response => response.json())
.then(json => {
    console.log(json);
    console.log(json.length);
});

//delete
fetch('http://jsonplaceholder.typicode.com/users',
{
    method : 'DELETE'
}
)
.then(response => response.json())
.then(json => {
    console.log(json);
    console.log(json.length);
});