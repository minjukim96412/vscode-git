/*
    ###jQeury 메모장 구현
    1.제목과 내용을 입력하고 등록 버튼을 누르면
    localStarage에 메모객체를 저장한다.
    2.좌측에는 메모의 리스트를 최신순으로 리스팅하고
        각 메모에는 삭제버튼이 우측에 존재한다.
    3.삭제버튼을 클릭하면 해당메모가 삭제되고 리스트가 갱신된다.
    4.메모리스트의 가장 최근 메모가 우측에 표시된다.
*/

$(document).ready(function () {
    // 메모 리스트 갱신
    function updateMemoList() {
        const memoList = JSON.parse(localStorage.getItem("memos")) || [];
        const memoListElement = $("#memoList");
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

        // 가장 최근 메모 표시
        if (memoList.length > 0) {
            const latestMemo = memoList[memoList.length - 1];
            displayMemo(latestMemo);
        } else {
            $("#memoContentArea").html(`
                <p>제목 :</p>
                <p>내용 :</p>
                <p>작성일 :</p>
            `);
        }
    }

    // 메모 저장
    function saveMemo(title, content) {
        const memoList = JSON.parse(localStorage.getItem("memos")) || [];
        const date = new Date().toLocaleString();
        memoList.push({ title, content, date });
        localStorage.setItem("memos", JSON.stringify(memoList));
    }

    // 메모 삭제
    function deleteMemo(index) {
        const memoList = JSON.parse(localStorage.getItem("memos")) || [];
        memoList.splice(index, 1);
        localStorage.setItem("memos", JSON.stringify(memoList));
    }

    // 메모 내용 표시
    function displayMemo(memo) {
        $("#memoContentArea").html(`
            <p>제목 : ${memo.title}</p>
            <p>내용 : ${memo.content}</p>
            <p>작성일 : ${memo.date}</p>
        `);
    }

    // 등록 버튼 클릭 이벤트
    $("#insertBtn").click(function () {
        const title = $("#title").val();
        const content = $("#content").val();
        if (title && content) {
            saveMemo(title, content);
            updateMemoList();
            $("#title").val('');
            $("#content").val('');
        } else {
            alert("제목과 내용을 입력하세요.");
        }
    });

    // 삭제 버튼 클릭 이벤트 위임
    $("#memoList").on("click", ".deleteBtn", function () {
        const index = $(this).data("index");
        deleteMemo(index);
        updateMemoList();
    });

    // 메모 항목 클릭 이벤트 위임
    $("#memoList").on("click", "li", function () {
        const index = $(this).data("index");
        const memoList = JSON.parse(localStorage.getItem("memos")) || [];
        const memo = memoList[index];
        displayMemo(memo);
    });

    // 초기 메모 리스트 갱신
    updateMemoList();
});


