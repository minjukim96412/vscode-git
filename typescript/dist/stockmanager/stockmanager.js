"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// localStorage 초기화
const initLocalStorage = () => {
    if (localStorage) {
        if (!localStorage.getItem('shopSeq')) {
            localStorage.setItem('shopSeq', '0');
        }
        if (!localStorage.getItem('stockSeq')) {
            localStorage.setItem('stockSeq', '0');
        }
        if (!localStorage.getItem('shopList')) {
            localStorage.setItem('shopList', '[]');
        }
        if (!localStorage.getItem('stockList')) {
            localStorage.setItem('stockList', '[]');
        }
    }
};
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
// 초기화 및 업데이트
initLocalStorage();
updateShopList();
// 매장 등록 버튼 클릭 이벤트
$('#shwriteBtn').on('click', () => {
    writeShop();
    updateShopList();
});
$("#shopBody").on("click", "tr", () => {
    // 모든 행의 선택 상태 해제
    $("#shopBody tr").removeClass('selected').css('background-color', '');
    // 클릭된 행에 선택 클래스 추가 및 색상 변경
    $().addClass('selected').css('background-color', 'lightgreen');
    const shopId = parseInt($().find(".shno").text());
    updateStockList(shopId);
});
// 재고 등록 버튼 클릭 이벤트
$('#stwriteBtn').on('click', () => {
    const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text()); // 선택된 매장의 ID 가져오기
    if (selectedShopId) {
        writeStock(selectedShopId);
    }
    else {
        alert("먼저 매장을 선택하세요.");
    }
});
// 마우스 이벤트 처리
$("#shopBody").on("mouseenter", "tr", function () {
    if (!$(this).hasClass('selected')) {
        $(this).css('background-color', 'lightgreen');
    }
});
$("#shopBody").on("mouseleave", "tr", function () {
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
    const stno = $(event.currentTarget).data("stno");
    removeStok(stno);
    const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
    updateStockList(selectedShopId);
    updateShopList();
});
$("#stokBody").on("click", ".updateBtn", (event) => {
    const stno = $(event.currentTarget).data("stno");
    popStokUpdate(stno);
});
$("#stokBody").on("click", ".stamt", (event) => {
    // 클릭한 행에서 stno 값을 가져오기
    const stno = parseInt($(event.currentTarget).closest("tr").find("td:first").text());
    const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
    // 해당 stno 값으로 재고 항목 찾기
    const stockList = getStockList();
    const index = stockList.findIndex(stock => stock.stno == stno && stock.shno == selectedShopId);
    // 해당 재고 항목의 인덱스로 popStokAmtUpdate 호출
    if (index !== -1) {
        popStokAmtUpdate(index);
    }
    else {
        console.error("해당 재고 항목을 찾을 수 없습니다.");
    }
});
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
    localStorage.setItem('shopSeq', nextShopSeq + "");
    return nextShopSeq;
};
// 매장 목록
const getShopList = () => {
    let shopList = localStorage.getItem("shopList");
    if (shopList == null || shopList == "") {
        localStorage.setItem("shopList", "[]");
        return [];
    }
    else {
        return JSON.parse(shopList);
    }
};
// 매장에 속하는 모든 재고의 수량을 합산하여 반환하는 함수
const getTotalStockAmount = (shopId) => {
    const stockList = getStockList(); // 모든 재고 목록 가져오기
    let totalAmount = 0;
    // 해당 매장(shopId)에 속하는 모든 재고의 수량을 합산합니다.
    stockList.forEach((stock) => {
        if (stock.shno === shopId) {
            totalAmount += stock.stamt; // 수량을 정수형으로 변환하여 합산
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
const sweetalert2_1 = require("sweetalert2");
const popUpdate = (index) => {
    sweetalert2_1.default.fire({
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
        allowOutsideClick: () => !sweetalert2_1.default.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            updateShopList();
        }
    });
};
// 매장 삭제
const removeShop = (index) => {
    const shopList = getShopList();
    shopList.splice(index, 1);
    localStorage.setItem("shopList", JSON.stringify(shopList));
};
// 재고 목록
const getStockList = () => {
    const stockList = localStorage.getItem("stockList");
    if (stockList == null || stockList == "") {
        localStorage.setItem("stockList", "[]");
        return [];
    }
    else {
        return JSON.parse(stockList);
    }
};
// 재고 번호 시퀀스
const getNextStockSeq = () => {
    const nextStockSeq = Number(localStorage.getItem('stokSeq')) + 1;
    localStorage.setItem('stokSeq', nextStockSeq + "");
    return nextStockSeq;
};
// 재고 목록 업데이트
const updateStockList = (shopId) => {
    const stockList = getStockList().filter((stock) => stock.shno == shopId);
    const stockListElement = $("#stokBody");
    stockListElement.empty();
    stockList.forEach((stock) => {
        const listItem = $(`
            <tr data-stno="${stock.stno}">
                <td>${stock.stno}</td>
                <td class="stname">${stock.stname}</td>
                <td class="stamt">${stock.stamt}</td>
                <td>${stock.stindate}</td>
                <td>${stock.strgdate}</td>
                <td><button class="updateBtn" data-stno="${stock.stno}">수정</button></td>
                <td><button class="deleteBtn" data-stno="${stock.stno}">삭제</button></td>
            </tr>    
        `);
        stockListElement.append(listItem);
    });
};
// 재고 등록
const writeStock = (selectedShopId) => {
    const shopList = getShopList();
    const stockArr = JSON.parse(localStorage.getItem('stokList')) || [];
    const strgdate = new Date();
    const stno = getNextStockSeq(); // 고유한 stno를 하나 생성
    const stamt = parseInt($('#stamt').val()); // 사용자가 입력한 재고 수량 가져오기
    shopList.forEach((shop) => {
        let totalStockAmt = 0; // 각 매장의 총 재고 수량을 계산하기 위한 변수 초기화
        if (shop.shno == selectedShopId) {
            // 선택한 매장에 대해서는 사용자가 입력한 재고 수량으로 등록
            stockArr.push(new Stock(stno, $('#stname').val(), stamt, $('#stindate').val(), strgdate.toLocaleString('ja-JP'), shop.shno));
            totalStockAmt += stamt; // 등록된 재고 수량을 총 재고 수량에 추가
        }
        else {
            // 선택하지 않은 매장에 대해서는 재고 수량을 0으로 설정하여 등록
            stockArr.push(new Stock(stno, $('#stname').val(), 0, $('#stindate').val(), strgdate.toLocaleString('ja-JP'), shop.shno));
        }
        // 현재 매장의 총 재고 수량을 계산하여 shopList에 업데이트
        shop.shtotst = totalStockAmt;
    });
    localStorage.setItem('stockList', JSON.stringify(stockArr));
    localStorage.setItem('shopList', JSON.stringify(shopList)); // shopList 업데이트
    updateStockList(selectedShopId); // 선택된 매장의 재고 목록 업데이트
    updateShopList();
};
const popStokUpdate = (stno) => {
    sweetalert2_1.default.fire({
        title: "재고명을 입력해주세요",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (newName) => {
            updateStock(stno, newName);
        },
        allowOutsideClick: () => !sweetalert2_1.default.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
            updateStockList(selectedShopId);
            updateShopList();
        }
    });
};
// 재고 삭제
const removeStok = (stno) => {
    let stockList = getStockList();
    stockList = stockList.filter((stock) => stock.stno !== stno);
    localStorage.setItem("stockList", JSON.stringify(stockList));
};
// 재고수량변경
const popStokAmtUpdate = (index) => {
    sweetalert2_1.default.fire({
        title: "재고 수량을 입력해주세요",
        input: "number",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "저장",
        showLoaderOnConfirm: true,
        preConfirm: (newAmt) => {
            return new Promise(resolve => {
                updateStockAmt(index, newAmt); // 재고 수량 업데이트 함수 호출
                resolve();
            });
        },
        allowOutsideClick: () => !sweetalert2_1.default.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
            updateStockList(selectedShopId); // 재고 목록 업데이트 함수 호출
            updateShopList();
        }
    });
};
const updateStockAmt = (index, newAmt) => {
    const stockList = getStockList();
    stockList[index].stamt = newAmt;
    localStorage.setItem('stockList', JSON.stringify(stockList));
};
// 재고 수정
const updateStock = (stno, newName) => {
    const stockList = getStockList();
    stockList.forEach((stok) => {
        if (stok.stno === stno) {
            stok.stname = newName;
        }
    });
    localStorage.setItem('stockList', JSON.stringify(stockList));
};
