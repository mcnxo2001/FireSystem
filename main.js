let StatusItem = [0, 0, 0, 0]

const firebaseConfig = {
    apiKey: "AIzaSyAaXKv1LwkBm5n9Pp-XWaazblKQeKCOglY",
    authDomain: "firesystem-812da.firebaseapp.com",
    databaseURL: "https://firesystem-812da-default-rtdb.firebaseio.com",
    projectId: "firesystem-812da",
    storageBucket: "firesystem-812da.appspot.com",
    messagingSenderId: "753651125150",
    appId: "1:753651125150:web:f1f55313bec2da1367248f"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref("/Status").on("value", function (snapshot) {
    StatusItem[0] = snapshot.val().Smoke;
    StatusItem[1] = snapshot.val().Fire;
    StatusItem[2] = snapshot.val().Fan;
    StatusItem[3] = snapshot.val().Water;
})

let NameItemWarning = ["WarningSmoke", "WarningFire"]
let NameItemSolution = ["SolutionFan", "SolutionWater"]
let Infor = ["InForSmoke", "InForFire", "InForFan", "InForWater"]


setInterval(function () {
    for (let i = 0; i < StatusItem.length; i++) {
        if (i <= 1) {
            FlashingItemWarning(NameItemWarning[i], StatusItem[i])
        }
        else {
            FlashingItemSolution(NameItemSolution[i - 2], StatusItem[i])
        }
        ChangeInfor(Infor[i], StatusItem[i], i)
    }
}, 1000)

function FlashingItemWarning(Name, Status) {
    var Item = document.getElementById(Name)
    if (Status == 1) {
        Item.style.backgroundColor = "#ff4949";
        setTimeout(function () {
            Item.style.backgroundColor = "rgb(193 249 255 / 85%)"
        }, 500)
        Item.style.backgroundColor = "#ff4949";
    }
}

function FlashingItemSolution(Name, Status) {
    var Item = document.getElementById(Name)
    if (Status == 1) {
        Item.style.backgroundColor = "#acffa7";
        setTimeout(function () {
            Item.style.backgroundColor = "rgb(193 249 255 / 85%)"
        }, 500)
        Item.style.backgroundColor = "#acffa7";
    }
}

function ChangeInfor(Infor, Status, Index) {
    var InforItem = document.getElementById(Infor)
    if (Status == 1 && Index == 0) {
        InforItem.innerHTML = "Đã phát hiện ra khói"
    }
    else if (Status == 0 && Index == 0) {
        InforItem.innerHTML = "Không phát hiện khói"
    }

    if (Status == 1 && Index == 1) {
        InforItem.innerHTML = "Đã phát hiện ra lửa"
    }
    else if (Status == 0 && Index == 1) {
        InforItem.innerHTML = "Không phát hiện lửa"
    }

    if (Status == 1 && Index == 2) {
        InforItem.innerHTML = "Hệ thống thông gió đã hoạt động"
    }
    else if (Status == 0 && Index == 2) {
        InforItem.innerHTML = "Hệ thống thông gió sẵn sàng"
    }

    if (Status == 1 && Index == 3) {
        InforItem.innerHTML = "Hệ thống bơm nước đã hoạt động"
    }
    else if (Status == 0 && Index == 3) {
        InforItem.innerHTML = "Hệ thống bơm nước đã sẵn sàng"
    }
}