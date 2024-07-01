$(document).ready(function() {
    // 초기화 및 업데이트
    initLocalStorage();
    updateShopList();

    // 매장 등록 버튼 클릭 이벤트
    $('#shwriteBtn').on('click', () => {
        writeShop();
        updateShopList();
    });

    $("#shopBody").on("click", "tr", function() {
        // 모든 행의 선택 상태 해제
        $("#shopBody tr").removeClass('selected').css('background-color', '');

        // 클릭된 행에 선택 클래스 추가 및 색상 변경
        $(this).addClass('selected').css('background-color', 'lightgreen');

        const shopId = $(this).find(".shno").text();
        updateStokList(shopId);
    });

    // 재고 등록 버튼 클릭 이벤트
    $('#stwriteBtn').on('click', () => {
        const selectedShopId = $("#shopBody tr.selected").find(".shno").text(); // 선택된 매장의 ID 가져오기
        if (selectedShopId) {
            writeStok(selectedShopId);
        } else {
            alert("먼저 매장을 선택하세요.");
        }
    });

    // 마우스 이벤트 처리
    $("#shopBody").on("mouseenter", "tr", function() {
        if (!$(this).hasClass('selected')) {
            $(this).css('background-color', 'lightgreen');
        }
    });

    $("#shopBody").on("mouseleave", "tr", function() {
        if (!$(this).hasClass('selected')) {
            $(this).css('background-color', 'rgba(230, 244, 250, 0.683)');
        }
    });

    // 기타 이벤트 핸들러
    $("#shopBody").on("click", ".deleteBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        removeShop(index);
        updateShopList();
    });

    $("#shopBody").on("click", ".updateBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        popUpdate(index);
    });

    $("#stokBody").on("click", ".deleteBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        removeStok(index);
        const selectedShopId = $("#shopBody tr.selected").map(function() { return $(this).find(".shno").text(); }).get();
        selectedShopId.forEach(shopId => updateStokList(shopId));
    });

    $("#stokBody").on("click", ".updateBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        popStokUpdate(index);
    });

    $("#stokBody").on("click", ".stamt", (event) => {
        // 클릭한 행에서 stno 값을 가져오기
        const stno = $(event.currentTarget).closest("tr").find("td:first").text();
        const selectedShopId = $("#shopBody tr.selected").find(".shno").text();
        
        // 해당 stno 값으로 재고 항목 찾기
        const stokList = getStokList();
        const index = stokList.findIndex(stok => stok.stno == stno && stok.shno == selectedShopId);
        
        // 해당 재고 항목의 인덱스로 popStokAmtUpdate 호출
        if (index !== -1) {
            popStokAmtUpdate(index);
        } else {
            console.error("해당 재고 항목을 찾을 수 없습니다.");
        }
    });
});
// localStorage 초기화
const initLocalStorage = () => {
    if (localStorage) {
        if (!localStorage.getItem('shopSeq')) {
            localStorage.setItem('shopSeq', '0');
        }
        if (!localStorage.getItem('stokSeq')) {
            localStorage.setItem('stokSeq', '0');
        }                
        if (!localStorage.getItem('shopList')) {
            localStorage.setItem('shopList', '[]');
        }
        if (!localStorage.getItem('stokList')) {
            localStorage.setItem('stokList', '[]');
        }        
    }
};

// 매장 등록
const writeShop = () => {
    const shopArr = JSON.parse(localStorage.getItem('shopList'));
    shopArr.push(new Shop(getNextShopSeq(), $('#shname').val(), 0));
    localStorage.setItem('shopList', JSON.stringify(shopArr));
    updateShopList(); // 수정된 매장 목록을 업데이트
};


// 매장 번호 시퀀스
const getNextShopSeq = () => {
    const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
    localStorage.setItem('shopSeq', nextShopSeq);
    return nextShopSeq;
};

// 매장 목록
const getShopList = () => {
    let shopList = localStorage.getItem("shopList");
    if (shopList == null || shopList == "") {
        localStorage.setItem("shopList", "[]");
        return [];
    } else {
        return JSON.parse(shopList);
    }
}

const updateShopList = () => {
    const shopList = getShopList(); // 로컬 스토리지에서 매장 목록 가져오기
    const shopListElement = $("#shopBody"); // 매장 목록을 표시할 HTML 요소 선택
    shopListElement.empty(); // 기존의 매장 목록을 비웁니다.

    // 각 매장에 대해 HTML 요소를 생성하고 테이블에 추가합니다.
    shopList.forEach((shop, index) => {
        const totalStockAmount = getTotalStockAmount(shop.shno); // 해당 매장의 총 재고 수량 계산

        const listItem = $(`
            <tr>
                <td class="shno">${shop.shno}</td>
                <td class="shname">${shop.shname}</td>
                <td>${totalStockAmount}</td>
                <td><button class="updateBtn" data-index="${index}">수정</button></td>
                <td><button class="deleteBtn" data-index="${index}">삭제</button></td>
            </tr>
        `);
        shopListElement.append(listItem); // 생성된 행을 매장 목록 요소에 추가합니다.
    });
};

// 매장에 속하는 모든 재고의 수량을 합산하여 반환하는 함수
const getTotalStockAmount = (shopId) => {
    const stokList = getStokList(); // 모든 재고 목록 가져오기
    let totalAmount = 0;

    // 해당 매장(shopId)에 속하는 모든 재고의 수량을 합산합니다.
    stokList.forEach((stok) => {
        if (stok.shno === shopId) {
            totalAmount += parseInt(stok.stamt); // 수량을 정수형으로 변환하여 합산
        }
    });

    return totalAmount;
};


// 매장명 수정
const updateShop = (index, newName) => {
    const shopList = getShopList();
    shopList[index].shname = newName;
    localStorage.setItem('shopList', JSON.stringify(shopList));
};

const popUpdate = (index) => {
    Swal.fire({
        title: "매장명을 입력해주세요",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (newName) => {
            updateShop(index, newName);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            updateShopList();
        }
    });
}

// 매장 삭제
const removeShop = (index) => {
    const shopList = getShopList();
    shopList.splice(index, 1);
    localStorage.setItem("shopList", JSON.stringify(shopList));
}

// 재고 목록
const getStokList = () => {
    let stokList = localStorage.getItem("stokList");
    if (stokList == null || stokList == "") {
        localStorage.setItem("stokList", "[]");
        return [];
    } else {
        return JSON.parse(stokList);
    }
}

// 재고 번호 시퀀스
const getNextStokSeq = () => {
    const nextStokSeq = Number(localStorage.getItem('stokSeq')) + 1;
    localStorage.setItem('stokSeq', nextStokSeq);
    return nextStokSeq;
};

// 재고 목록 업데이트
const updateStokList = (shopId) => {
    const stokList = getStokList().filter(stok => stok.shno == shopId);
    const stokListElement = $("#stokBody");
    stokListElement.empty();

    stokList.forEach((stok, index) => {
        const listItem = $(`
            <tr>
                <td>${stok.stno}</td>
                <td class="stname">${stok.stname}</td>
                <td class="stamt">${stok.stamt}</td>
                <td>${stok.stindate}</td>
                <td>${stok.strgdate}</td>
                <td><button class="updateBtn" data-index="${index}">수정</button></td>
                <td><button class="deleteBtn" data-index="${index}">삭제</button></td>
            </tr>    
        `);
        stokListElement.append(listItem);
    });
};



// 재고 등록
const writeStok = () => {
    const shopList = getShopList();
    const stokArr = JSON.parse(localStorage.getItem('stokList')) || [];
    const strgdate = new Date();
    const stno = getNextStokSeq(); // 고유한 stno를 하나 생성
    const selectedShopId = $("#shopBody tr.selected").find(".shno").text(); // 선택된 매장의 ID 가져오기
    const stamt = $('#stamt').val(); // 사용자가 입력한 재고 수량 가져오기

    shopList.forEach(shop => {
        let totalStokAmt = 0; // 각 매장의 총 재고 수량을 계산하기 위한 변수 초기화
        if (shop.shno == selectedShopId) {
            // 선택한 매장에 대해서는 사용자가 입력한 재고 수량으로 등록
            stokArr.push(new Stock(stno, $('#stname').val(), stamt, $('#stindate').val(), strgdate.toLocaleString('ja-JP'), shop.shno));
            totalStokAmt += parseInt(stamt); // 등록된 재고 수량을 총 재고 수량에 추가
        } else {
            // 선택하지 않은 매장에 대해서는 재고 수량을 0으로 설정하여 등록
            stokArr.push(new Stock(stno, $('#stname').val(), 0, $('#stindate').val(), strgdate.toLocaleString('ja-JP'), shop.shno));
        }

        // 현재 매장의 총 재고 수량을 계산하여 shopList에 업데이트
        shop.shtotst = totalStokAmt;
    });

    localStorage.setItem('stokList', JSON.stringify(stokArr));
    localStorage.setItem('shopList', JSON.stringify(shopList)); // shopList 업데이트
    updateStokList(selectedShopId);// 선택된 매장의 재고 목록 업데이트
    updateShopList(); 
};


// 재고 수정
const updateStok = (stno, newName) => {
    const stokList = getStokList();

    // 동일한 stno를 가진 모든 재고 제품명을 변경
    stokList.forEach((stok) => {
        if (stok.stno === stno) {
            stok.stname = newName;
        }
    });

    localStorage.setItem('stokList', JSON.stringify(stokList));
};

const popStokUpdate = (index) => {
    const stokList = getStokList();
    const stno = stokList[index].stno; // 변경할 재고의 stno를 가져옴

    Swal.fire({
        title: "재고명을 입력해주세요",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (newName) => {
            updateStok(stno, newName); // stno를 기준으로 모든 매장의 재고명 업데이트
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedShopId = $("#shopBody tr.selected").find(".shno").text();
            updateStokList(selectedShopId); // 선택된 매장의 재고 목록 업데이트
            updateShopList(); // 모든 매장의 재고 목록 업데이트
        }
    });
};

// 재고 삭제
const removeStok = (index) => {
    const stokList = getStokList();
    stokList.splice(index, 1);
    localStorage.setItem("stokList", JSON.stringify(stokList));
}

// 재고수량변경
const popStokAmtUpdate = (index) => {
    Swal.fire({
        title: "재고 수량을 입력해주세요",
        input: "number",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "저장",
        showLoaderOnConfirm: true,
        preConfirm: (newAmt) => {
            return new Promise((resolve) => {
                updateStokAmt(index, newAmt); // 재고 수량 업데이트 함수 호출
                resolve();
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedShopId = $("#shopBody tr.selected").find(".shno").text();
            updateStokList(selectedShopId); // 재고 목록 업데이트 함수 호출
            updateShopList();
        }
    });
};

const updateStokAmt = (index, newAmt) => {
    const stokList = getStokList();
    stokList[index].stamt = newAmt;
    localStorage.setItem('stokList', JSON.stringify(stokList));
};