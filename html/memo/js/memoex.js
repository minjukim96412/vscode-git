/*
    ### jQuery 메모장 구현
    1. 제목과 내용을 입력하고 등록 버튼을 누르면
       localStorage에 메모객체를 저장한다.
    2. 좌측에는 메모의 리스트를 최신순으로 리스팅하고
       각 메모에는 삭제버튼이 우측에 존재한다.
    3. 삭제버튼을 클릭하면 해당 메모가 삭제되고 리스트가 갱신된다.
    4. 메모리스트의 가장 최근 메모가 우측에 표시된다.
*/
$(function() {
    updateMemoList();
    
    // 제목과 내용을 입력하고 등록 버튼 누르면
    // 메모 객체 생성해서 addMemo 호출
    $("#writeBtn").click(function() {
        const memoObj = {
            title: $("#title").val(),
            content: $("#content").val(),
            regdate: Date.now()
        };
        addMemo(memoObj);
        updateMemoList();
        $("#title").val('');
        $("#content").val('');
    });

    $("#listL").on("click", ".deleteBtn", function () {
        const index = $(this).data("index");
        removeMemo(index);
        updateMemoList();
    });
    
    $("#listL").on("click", "li", function () {
        const index = $(this).data("index");
        const memoList = JSON.parse(localStorage.getItem("memos")) || [];
        const memo = memoList[index];
        getTopMemo(memo);
    });
});


// localStorage의 메모리스트를 가져오는 함수
function getMemoList() {
    let memoList = localStorage.getItem("memoList");
    if (memoList==null || memoList=="") {
        localStorage.setItem("memoList", "[]");
        return [];
    } else {
        return JSON.parse(memoList);
    }
}

function updateMemoList() {
    const memoList = JSON.parse(localStorage.getItem("memos")) || [];
    const memoListElement = $("#listL");
    memoListElement.empty();

    memoList.forEach((memo, index) => {
        const listItem = $(`
            <li data-index="${index}">
                <div>
                    <p>${memo.date}</p>
                    <p>${memo.title}</p>
                </div>
                <button class="deleteBtn" data-index="${index}">삭제</button>
            </li>
        `);
        memoListElement.append(listItem);
    });

    if (memoList.length > 0) {
        const latestMemo = memoList[memoList.length - 1];
        printMemoList(latestMemo);
    } else {
        $("#listR").html(`
            <p>제목 :</p>
            <p>내용 :</p>
            <p>작성일 :</p>
        `);
    }
}

// localStorage에 메모객체를 저장한다.
function addMemo(memoObj) {
    const memoListArr = getMemoList();
    memoListArr[memoListArr.length] = memoObj;
    localStorage.setItem("memoList", JSON.stringify(memoListArr));
    printMemoList();
}

// localStorage의 메모리스트에서 메모를 삭제하는 함수
function removeMemo(index) {
    const memoList = JSON.parse(localStorage.getItem("memos")) || [];
    memoList.splice(index, 1);
    localStorage.setItem("memos", JSON.stringify(memoList));
}

// 최신메모 하나를 가져오는 함수
function getTopMemo(memo) {
    $("#listR").html(`
    <p>제목 : ${memo.title}</p>
    <p>내용 : ${memo.content}</p>
    <p>작성일 : ${memo.date}</p>
    `);
}

// 메모리스트를 출력하는 함수
function printMemoList() {
    $("#listL ul").empty();
    const memoList = getMemoList().reverse();
    const memoListLeng = memoList.length;
    for (let i=0; i<memoListLeng; i++) {
        $("#listL ul").append("<li id='memo" + i + "'>" + memoList[i].title + "</li>");
    }
}