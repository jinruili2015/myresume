var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
var a1 = document.querySelector(".a1");
window.setTimeout(function () {
    a1.id = "a1";
    a1.firstElementChild.className = "animated bounce";
    a1.lastElementChild.className = "animated shake";
}, 1000);

var song = document.querySelector("#song");
song.play();
song.mark = true;
var music = document.querySelector("#music");
music.onclick = function () {
    if (song.mark) {
        song.pause();
        song.mark = false;
        music.style.webkitAnimation = "none";
    } else {
        song.play();
        song.mark = true;
        music.style.webkitAnimation = " loading 1s infinite linear";
    }
};
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch - this.startY;
    var index = this.index;
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] != index) {
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id = "";
        arguments[0].firstElementChild.firstElementChild.className = "";
        arguments[0].firstElementChild.lastElementChild.className = "";
    })
    if (movePos > 0) {
        var pos = movePos - winH;
        this.prevIndex = (index == 0 ? oLis.length - 1 : index - 1);
    } else if (movePos < 0) {
        var pos = movePos + winH;
        this.prevIndex = (index == oLis.length - 1 ? 0 : index + 1);
    }
    oLis[this.prevIndex].className = "zIndex";
    oLis[this.prevIndex].style.display = "block";
    oLis[this.prevIndex].style.webkitTransform = "translate(0," + pos + "px)";
    this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos) / winH * 1 / 2) + ") translate(0," + movePos + "px)";
}
function end(e) {
    if (this.flag) {
        oLis[this.prevIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevIndex].style.webkitTransition = "0.7s";
        oLis[this.prevIndex].addEventListener("webkitTransitionEnd", function (e) {
            if (e.target.tagName == "LI") {
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id = "a" + (this.index + 1);
            if (this.index == 0) {
                this.firstElementChild.firstElementChild.className = "animated wobble";
            }
            if (this.index == 1) {
                this.firstElementChild.firstElementChild.className = "animated tada";
            }
            if (this.index == 2) {
                this.firstElementChild.firstElementChild.className = "animated rubberBand";
            }
            if (this.index == 3) {
                this.firstElementChild.firstElementChild.className = "animated swing";
            }
            if (this.index == 4) {
                this.firstElementChild.firstElementChild.className = "animated pulse infinite";
                this.firstElementChild.lastElementChild.className = "animated zoomInLeft";
            }

        }, false)
    }
}

document.addEventListener("touchmove", function (e) {
    console.log(e.target.id);
}, false)