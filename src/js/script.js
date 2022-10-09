$(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
        $(".navbar").addClass("nav-scrolled");
    } else {
        $(".navbar").removeClass("nav-scrolled");
    }
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > 0 && currentScrollPos > 0) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("transparent-navbar").style.top = "0";
        } else {
            document.getElementById("transparent-navbar").style.top = "-70px";
        }
    }
    prevScrollpos = currentScrollPos;
}

const roverContent = {
    "rover-1" : {
        imgSrc : "rover1.png",
        imgTitle : "Rover 1 title",
        cardContent : "Rover 1 content sit amet, consectetur adipiscing elit. Adipiscing odio lacus tellus tincidunt. Proin amet facilisis ultrices gravida ligula tellus, nunc eu lobortis. Suspendisse eu donec massa, urna, sit ante augue. Purus mi, amet facilisi turpis. Vulputate posuere tempus elementum et auctor tristique rhoncus. Congue sociis hac duis amet vitae a dignissim faucibus ultrices.Feugiat quis tempus pretium tempus fermentum vel eu. Et in integer lacus dui id. Eu vivamus at pharetra nullam tellus."
    },
    "rover-2" : {
        imgSrc : "rover2.jpg",
        imgTitle : "Rover 2 title",
        cardContent : "Rover 2 content sit amet, consectetur adipiscing elit. Adipiscing odio lacus tellus tincidunt. Proin amet facilisis ultrices gravida ligula tellus, nunc eu lobortis. Suspendisse eu donec massa, urna, sit ante augue. Purus mi, amet facilisi turpis. Vulputate posuere tempus elementum et auctor tristique rhoncus. Congue sociis hac duis amet vitae a dignissim faucibus ultrices.Feugiat quis tempus pretium tempus fermentum vel eu. Et in integer lacus dui id. Eu vivamus at pharetra nullam tellus."
    },
    "rover-3" : {
        imgSrc : "rover3.jpg",
        imgTitle : "Rover 3 title",
        cardContent : "Rover 3 content sit amet, consectetur adipiscing elit. Adipiscing odio lacus tellus tincidunt. Proin amet facilisis ultrices gravida ligula tellus, nunc eu lobortis. Suspendisse eu donec massa, urna, sit ante augue. Purus mi, amet facilisi turpis. Vulputate posuere tempus elementum et auctor tristique rhoncus. Congue sociis hac duis amet vitae a dignissim faucibus ultrices.Feugiat quis tempus pretium tempus fermentum vel eu. Et in integer lacus dui id. Eu vivamus at pharetra nullam tellus."
    }
}

const galleryContent = {
    "2022" : {
        img1 : "test1.png",
        img2 : "test2.png",
        img3 : "test3.png",
        img4 : "test4.png",
        img5 : "test5.png",
        img6 : "test6.png",

    },
    "2021" : {
        img1 : "test3.png",
        img2 : "test4.png",
        img3 : "test1.png",
        img4 : "test2.png",
        img5 : "test5.png",
        img6 : "test6.png",

    },
    "2020" : {
        img1 : "test5.png",
        img2 : "test6.png",
        img3 : "test3.png",
        img4 : "test4.png",
        img5 : "test1.png",
        img6 : "test2.png",

    },
    "2019" : {
        img1 : "test1.png",
        img2 : "test4.png",
        img3 : "test3.png",
        img4 : "test2.png",
        img5 : "test5.png",
        img6 : "test6.png",

    },
    "2018" : {
        img1 : "test1.png",
        img2 : "test6.png",
        img3 : "test3.png",
        img4 : "test4.png",
        img5 : "test5.png",
        img6 : "test2.png",

    },
}

function setRover(element, roverName){
    const {imgSrc, imgTitle, cardContent} = roverContent[roverName];
    document.getElementById("img").src = "./src/img/" + imgSrc;
    document.getElementById("imgTitle").innerText = imgTitle;
    document.getElementById("cardContent").innerText = cardContent;
    var allActive = document.getElementsByClassName("activeButton");
    var currentActive = allActive[0];
    currentActive.classList.toggle("activeButton");
    element.classList.toggle("activeButton");
}

function setGallery(element, galleryName){
    const {img1, img2, img3, img4, img5, img6} = galleryContent[galleryName];
    var allActive = document.getElementsByClassName("activeButton");
    var currentActive = allActive[0];
    currentActive.classList.toggle("activeButton");
    element.classList.toggle("activeButton");
    document.getElementById("img1").src = "./src/img/gallery/test/" + img1;
    document.getElementById("img2").src = "./src/img/gallery/test/" + img2;
    document.getElementById("img3").src = "./src/img/gallery/test/" + img3;
    document.getElementById("img4").src = "./src/img/gallery/test/" + img4;
    document.getElementById("img5").src = "./src/img/gallery/test/" + img5;
    document.getElementById("img6").src = "./src/img/gallery/test/" + img6;
}

