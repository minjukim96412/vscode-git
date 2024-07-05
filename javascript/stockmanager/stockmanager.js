

const getShopList = () => {
    let shopList = localStorage.getItem("shopList");
    if (!shopList) {
        localStorage.setItem("shopList", "[]");
        console.log(shopList);
        return [];
    } else {
        return JSON.parse(shopList);
    }
};

const getStockList = () => {
    const stockList = localStorage.getItem("stockList");
    if (!stockList) {
        localStorage.setItem("stockList", "[]");
        return [];
    } else {
        return JSON.parse(stockList);
    }
};

const getNextShopSeq = () => {
    const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
    localStorage.setItem('shopSeq', (nextShopSeq + ""));
    return nextShopSeq;
};

const getNextStockSeq = () => {
    const nextStockSeq = Number(localStorage.getItem('stockSeq')) + 1;
    localStorage.setItem('stockSeq', (nextStockSeq + ""));
    return nextStockSeq;
};

const getTotalStockAmount = (shopId) => {
    const stockList = getStockList();
    return stockList.reduce((total, stock) => {
        if (stock.shno === shopId) {
            return total + stock.stamt;
        }
        return total;
    }, 0);
};

const writeShop = () => {
    const shopArr = JSON.parse(localStorage.getItem('shopList'));
    shopArr.push(new Shop(getNextShopSeq(), $('#shname').val(), 0));
    localStorage.setItem('shopList', JSON.stringify(shopArr));
    const selectedShopId = shopArr.stno;
    updateShopList();
    writeStock(selectedShopId);
};

const updateShop = (index, newName) => {
    const shopList = getShopList();
    shopList[index].shname = newName;
    localStorage.setItem('shopList', JSON.stringify(shopList));
};

const updateStockAmt = (index, newAmt) => {
    const stockList = getStockList();
    stockList[index].stamt = newAmt;
    localStorage.setItem('stockList', JSON.stringify(stockList));
};

const updateStock = (stno, newName) => {
    const stockList = getStockList();
    stockList.forEach((stock) => {
        if (stock.stno === stno) {
            stock.stname = newName;
        }
    });
    localStorage.setItem('stockList', JSON.stringify(stockList));
};

const removeShop = (index) => {
    const shopList = getShopList();
    shopList.splice(index, 1);
    localStorage.setItem("shopList", JSON.stringify(shopList));
};

const removeStok = (stno) => {
    let stockList = getStockList();
    stockList = stockList.filter((stock) => stock.stno !== stno);
    localStorage.setItem("stockList", JSON.stringify(stockList));
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
};

const popStockUpdate = (stno) => {
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
            updateStock(stno, newName);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
            updateStockList(selectedShopId);
            updateShopList();
        }
    });
};

const popStockAmtUpdate = (index) => {
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
            return new Promise(resolve => {
                updateStockAmt(index, newAmt);
                resolve();
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
            updateStockList(selectedShopId);
            updateShopList();
        }
    });
};

const updateShopList = () => {
    const shopList = getShopList();
    const shopListElement = $("#shopBody");
    shopListElement.empty();
    shopList.forEach((shop, index) => {
        const totalStockAmount = getTotalStockAmount(shop.shno);
        const listItem = $(`
            <tr>
                <td class="shno">${shop.shno}</td>
                <td class="shname">${shop.shname}</td>
                <td>${totalStockAmount}</td>
                <td><button class="updateBtn" data-index="${index}">수정</button></td>
                <td><button class="deleteBtn" data-index="${index}">삭제</button></td>
            </tr>
        `);
        shopListElement.append(listItem);
    });
};

const updateStockList = (shopId) => {
    const stockList = getStockList().filter((stock) => stock.shno == shopId);
    const stockListElement = $("#stockBody");
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

const writeStock = (selectedShopId) => {
    const shopList = getShopList();
    const stockArr = JSON.parse(localStorage.getItem('stockList')) || [];
    const strgdate = new Date();
    const stno = getNextStockSeq();
    const stamt = parseInt($('#stamt').val());
    shopList.forEach((shop) => {
        let totalStockAmt = 0;
        if (shop.shno == selectedShopId) {
            stockArr.push(new Stock(stno, $('#stname').val(), stamt, $('#stindate').val(), strgdate.toLocaleString('ja-JP'), shop.shno));
            totalStockAmt += stamt;
        } else {
            stockArr.push(new Stock(stno, $('#stname').val(), 0, $('#stindate').val(), strgdate.toLocaleString('ja-JP'), shop.shno));
        }
        shop.shtotst = totalStockAmt;
    });
    localStorage.setItem('stockList', JSON.stringify(stockArr));
    localStorage.setItem('shopList', JSON.stringify(shopList));
    updateStockList(selectedShopId);
    updateShopList();
};

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


$(function(){
        // 초기화 및 업데이트
    initLocalStorage();
    updateShopList();

    // 매장 등록 버튼 클릭 이벤트
    $('#shwriteBtn').on('click', () => {
        writeShop();
        updateShopList();
    });

    // 매장 목록 클릭 이벤트
    $("#shopBody").on("click", "tr", function () {
        $("#shopBody tr").removeClass('selected').css('background-color', '');
        $(this).addClass('selected').css('background-color', 'lightgreen');
        const shopId = parseInt($(this).find(".shno").text());
        updateStockList(shopId);
    });

    // 재고 등록 버튼 클릭 이벤트
    $('#stwriteBtn').on('click', () => {
        const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
        if (selectedShopId) {
            writeStock(selectedShopId);
        } else {
            alert("먼저 매장을 선택하세요.");
        }
    });

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

    $("#shopBody").on("click", ".deleteBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        removeShop(index);
        updateShopList();
    });

    $("#shopBody").on("click", ".updateBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        popUpdate(index);
    });

    $("#stockBody").on("click", ".deleteBtn", (event) => {
        const stno = $(event.currentTarget).data("stno");
        removeStock(stno);
        const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
        updateStockList(selectedShopId);
        updateShopList();
    });

    $("#stockBody").on("click", ".updateBtn", (event) => {
        const stno = $(event.currentTarget).data("stno");
        popStockUpdate(stno);
    });

    $("#stockBody").on("click", ".stamt", (event) => {
        const stno = parseInt($(event.currentTarget).closest("tr").find("td:first").text());
        const selectedShopId = parseInt($("#shopBody tr.selected").find(".shno").text());
        const stockList = getStockList();
        const index = stockList.findIndex(stock => stock.stno == stno && stock.shno == selectedShopId);
        if (index !== -1) {
            popStockAmtUpdate(index);
        } else {
            console.error("해당 재고 항목을 찾을 수 없습니다.");
        }
    });
});