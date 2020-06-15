// localStorage.clear();
//指定DOM
const result = document.querySelector('.btnToResult'); //計算結果
const showResult = document.querySelector('.showResult'); //呈現結果
const statusText = document.querySelector('.statusText'); // 狀態文字
const list = document.querySelector('.list');
const delAll = document.querySelector('.delAll'); // 清除記錄
let data = JSON.parse(localStorage.getItem('information')) || []; //網頁更新時先抓出localStorage的資料，如果沒有則是空陣列

//監聽事件
result.addEventListener('click', toResult, false);
showResult.addEventListener('click', function(e) {
    e.preventDefault();
}, false);
list.addEventListener('click', delData, false);
delAll.addEventListener('click', del, false);
updateList(data); //一開始先更新一次網頁內容，顯示localStorage原有的資料，沒有則為空
//function
//刪除
function delData(e) {
    e.preventDefault();
    let clickTarget = e.target.nodeName;
    if (clickTarget === 'A') {
        let index = e.target.dataset.index;
        data.splice(index, 1); //在陣列中刪除該項記錄
        localStorage.setItem('information', JSON.stringify(data)); //更新localStorage
        updateList(data); //更新畫面
    } else {
        return;
    }

}

function toResult(e) {
    e.preventDefault();
    if (document.getElementById('height').value === '' || document.getElementById('weight').value === '') {
        alert('請輸入數值！');
        return;
    }
    // 取出input值，轉int
    let height = parseInt(document.getElementById('height').value);
    let weight = parseInt(document.getElementById('weight').value);


    // 日期
    let today = new Date();
    let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

    //呼叫function計算bmi
    let bmi = BMIcal(height, weight);

    // 呼叫function判斷狀態
    let status = Status(bmi).content;
    let statusColor = Status(bmi).color;

    //更改btn樣式
    btnChange(bmi, status, statusColor);

    // 宣告obj存bmi資料
    let bmiInfo = {
        status: status,
        BMI: bmi,
        weight: weight + 'kg',
        height: height + 'cm',
        date: date,
        color: statusColor
    }


    // 將bmiInfo存入data[] 
    data.push(bmiInfo);

    //更新localStorage
    localStorage.setItem('information', JSON.stringify(data));

    //更新網頁內容
    updateList(data);

    // 監聽reStart
    let reStart = document.querySelector('.reStart');
    reStart.addEventListener('click', re, false);
}

// 計算bmi
function BMIcal(h, w) {
    let bmi = w / Math.pow((h / 100), 2);
    bmi = bmi.toFixed(2); //四捨五入到小數點後兩位
    return bmi;
}

// 判斷bmi狀態
function Status(bmi) {
    let status = {};
    if (bmi < 18.5) {
        status = {
            content: '過輕',
            color: '#31BAF9'
        };
    } else if (bmi >= 18.5 && bmi < 24) {
        status = {
            content: '理想',
            color: '#86D73F'
        };
    } else if (bmi >= 24 && bmi < 27) {
        status = {
            content: '過重',
            color: '#FF982D'
        };
    } else if (bmi >= 27 && bmi < 30) {
        status = {
            content: '輕度肥胖',
            color: '#FF6C02'
        };
    } else if (bmi >= 30 && bmi < 35) {
        status = {
            content: '輕度肥胖',
            color: '#FF6C02'
        };
    } else {
        status = {
            content: '重度肥胖',
            color: '#FF1200'
        };
    }
    return status;
}

// 更新List
function updateList(item) {
    let str = '';
    let listColor = '';
    let len = item.length;
    for (let i = 0; i < len; i++) {
        str += `
        <li class="row justify-content-around align-items-center bg-white py-3 my-3" style="border-left: 7px solid${item[i].color};">
            <div class="col-2 value">${item[i].status}</div>
            <div class="col-2 value"><span class="mr-2">BMI</span>${item[i].BMI}</div>
            <div class="col-2 value"><span class="mr-2">weight</span>${item[i].weight}</div>
            <div class="col-2 value"><span class="mr-2">height</span>${item[i].height}</div>
            <div class="col-2 value"><span>${item[i].date}</span><a href="#" data-index="${i}" class="btn btn-light text-right ml-auto del">&times;</a></div>
        </li>
        `
    }
    list.innerHTML = str;
}

// 改變樣式
function btnChange(bmi, status, color) {

    result.classList.remove('d-flex');
    result.classList.add('d-none');
    showResult.classList.remove('d-none');
    showResult.classList.add('d-flex');


    showResult.textContent = bmi;
    showResult.style.border = '6px solid' + color;
    showResult.style.color = color;
    showResult.style.backgroundColor = '#424242';
    let el = document.createElement('span');
    el.textContent = 'BMI';
    el.style.fontSize = '14px';
    showResult.appendChild(el);

    let reStartBtn = document.createElement('a');
    reStartBtn.setAttribute('href', '#');
    reStartBtn.classList.add('reStart', 'd-flex', 'justify-content-center', 'align-items-center');
    reStartBtn.style.backgroundColor = color;
    showResult.appendChild(reStartBtn);


    let reStartImg = document.createElement('img');
    reStartImg.setAttribute('src', 'img/icons_loop.png');
    document.querySelector('.reStart').appendChild(reStartImg);


    statusText.textContent = status;
    statusText.classList.remove('d-none');
    statusText.style.color = color;
}

// 重新輸入
function re() {
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    result.classList.remove('d-none');
    result.classList.add('d-flex');
    showResult.classList.remove('d-flex');
    showResult.classList.add('d-none');
    statusText.classList.add('d-none');
}

// 清除記錄
function del() {
    data = [];
    localStorage.clear();
    updateList(data);
    re();
}



// 取出input值
// 計算BMI BMIcal()
// 存入陣列
// 存入localStorage
// 網頁畫面顯示