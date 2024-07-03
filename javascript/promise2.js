// Promise 실습
// 1.비동기 호출 : https://jsonplaceholder.typicode.com/albums/11
// 2. id가 11인 앨범의 userId를 Promise로 구한다.
// 3. 비동기호출 : https://jsonplaceholder.typicode.com/users
// 4. userId가 2인 사용자의 username과 email을 Promise로 구한다.
// 결과출력: Antonette Shanna@melissa.tv
const promiseGet = url => {
    return new Promise((resolve, reject)=> {
        const xhr = new XMLHttpRequest;
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            }else {
                reject(new Error(xhr.status));
            }
        };
    });
};


// 방법 1) Promise 체이닝
const url = 'https://jsonplaceholder.typicode.com';
promiseGet(`${url}/albums/11`)
.then(({userId})=> promiseGet(`${url}/users/${userId}`))
.then(({username, email}) => {
    console.log(username + " " + email),
    document.querySelector("#result").innerHTML 
        = username + " " +email})
.catch(error => console.error(error));


// 방법 2) async/await 
// const url = 'https://jsonplaceholder.typicode.com';
// (async () => {
//     const album = await promiseGet(`${url}/albums/11`);
//     const user = await promiseGet(`${url}/users/${album.userId}`);
//     document.querySelector("#result").innerHTML 
//     = user.username + " " + user.email;
//     console.log(user.username + " " + user.email);
// })();
