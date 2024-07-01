//DOM (Document Object Model)

window.onload = function(){

    //id가 stat인 엘리먼트
    // const stat = document.getElementById('stat');
    const stat = document.querySelector('#stat');
    console.log(stat);//<p id="stat" data-user-name="홍길동" data-user-level="normal">hello</p>

    console.log(stat.dataset.userName);//홍길동
    console.log(stat.dataset.userLevel);//admin

    // dataset 변경
    stat.dataset.userLevel = 'normal';
    console.log(stat.dataset.userLevel);//normal

    const ul = document.querySelector('ul');
    console.log(ul.childNodes.length);//7 textNode도 포함
    for (const each of ul.childNodes){
        console.log('==='+each+'===');
    }
    console.log(ul.children.length);//3 elementNode만 포함

    // firstChild, lastChild, nextsibling, previousSibling
    // : 모든노드를 다 탐색
    // firstElementChild, lastElementChild, nextElementSibling, previousElementSibling
    // : 엘리먼트노드만 탐색
    console.log(ul.firstChild.nextSibling);//딸기
    console.log(ul.firstElementChild);//딸기
    console.log(ul.firstElementChild.nextElementSibling);//포도
}