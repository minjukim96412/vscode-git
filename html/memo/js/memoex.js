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
            date: new Date().toLocaleString()
        };
        addMemo(memoObj);
        updateMemoList();
        $("#title").val('');
        $("#content").val('');
    });

    $("#listL").on("click", "deleteBtn", function () {
        const index = $(this).data("index");
        removeMemo(index);
        updateMemoList();
    });
    
    $("#listL").on("click", "li", function () {
        const index = $(this).data("index");
        const memoList = getMemoList();
        const memo = memoList[index];
        getTopMemo(memo);
    });
});

// localStorage의 메모리스트를 가져오는 함수
function getMemoList() {
    let memoList = localStorage.getItem("memoList");
    if (memoList == null || memoList == "") {
        localStorage.setItem("memoList", "[]");
        return [];
    } else {
        return JSON.parse(memoList);
    }
}

function updateMemoList() {
    const memoList = getMemoList();
    const memoListElement = $("#listL ul");
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
    const memoListLeng = memoList.length
    if (memoListLeng > 0) {
        const latestMemo = memoList[memoListLeng - 1];
        getTopMemo(latestMemo);
    } else {
        $("#listR textarea").val('');
    }
}

// localStorage에 메모객체를 저장한다.
function addMemo(memoObj) {
    const memoList = getMemoList();
    memoList.push(memoObj);
    localStorage.setItem("memoList", JSON.stringify(memoList));
}

// localStorage의 메모리스트에서 메모를 삭제하는 함수
function removeMemo(index) {
    const memoList = getMemoList();
    memoList.splice(index, 1);
    localStorage.setItem("memoList", JSON.stringify(memoList));
}

// 최신메모 하나를 가져오는 함수
function getTopMemo(memo) {
    $("#listR textarea").val(`
    제목: ${memo.title}
    내용: ${memo.content}
    작성일: ${memo.date}
    `);
}
