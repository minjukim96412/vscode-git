$(() => {
    updateShopList();
    updateStokList();

    // localStorage 초기화
    initLocalStorage();

    $('#shwriteBtn').on('click', () => {
        writeShop();
        updateShopList();
    });

   
    $("#shopBody").on("click", "tr", function (tr) {
            $('#stwriteBtn').on('click', () => {
                writeStok();
                updateStokList();
            });
            getShopList();

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

    $("#stokBody").on("click", ".deleteBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        removeStok(index);
        updateStokList();
    });
    
    $("#stokBody").on("click", ".updateBtn", (event) => {
        const index = $(event.currentTarget).data("index");
        popStokUpdate(index);
    });

    $("#stokBody").on("click", ".stamt", (event) => {
        const index = $(event.currentTarget).closest("tr").index();
        popStokAmtUpdate(index);
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

const updateShopList= () => {
    const shopList = getShopList();
    const shopListElement = $("#shopBody");
    shopListElement.empty();

    shopList.forEach((shop, index) => {
        const listItem = $(`
            <tr>
                <td class="shno">${shop.shno}</td>
                <td class="shname">${shop.shname}</td>
                <td>${shop.shtotst}</td>
                <td><button class="updateBtn" data-index="${index}">수정</button></td>
                <td><button class="deleteBtn" data-index="${index}">삭제</button></td>
            </tr>    
        `);
        shopListElement.append(listItem);
    });
}

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
const updateStokList= () => {
    const stokList = getStokList();
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
}
// 재고 등록
const writeStok = (ele) => {
    const stokArr = JSON.parse(localStorage.getItem('stokList'));
    const strgdate = new Date();
    stokArr.push(new Stock(getNextStokSeq(), $('#stname').val(), $('#stamt').val(), $('#stindate').val(), strgdate.toLocaleString('ja-JP'), ele));
    localStorage.setItem('stokList', JSON.stringify(stokArr));
};

// 재고 수정
const updateStok = (index, newName) => {
    const stokList = getStokList();
    stokList[index].stname = newName;
    localStorage.setItem('stokList', JSON.stringify(stokList));
};

const popStokUpdate = (index) => {
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
            updateStok(index, newName);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            updateStokList();
        }
    });
}

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
            updateStokAmt(index, newAmt);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            updateStokList();
        }
    });
}

const updateStokAmt = (index, newAmt) => {
    const stokList = getStokList();
    stokList[index].stamt = newAmt;
    localStorage.setItem('stokList',  JSON.stringify(stokList));
};
