$(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
        $(".navbar").addClass("nav-scrolled");
    } else {
        $(".navbar").removeClass("nav-scrolled");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Hide the loader when the page is fully loaded
    hideLoader();

    // Your other initialization code can go here

    // Optionally, you can set a delay for hiding the loader
    // setTimeout(hideLoader, 5000); // Adjust the time according to your needs
});

function hideLoader() {
    // Hide the loader
    document.querySelector(".load-container").style.display = "none";
    // Display your content
    document.querySelector(".home-page").style.display = "block";
}
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('preloader-video');
    var preloader = document.getElementById('preloader-container');
  
    video.addEventListener('loadeddata', function () {
      // Optionally add a delay or other conditions before hiding the preloader
      setTimeout(function () {
        fadeOut(preloader);
      }, 2100); // Adjust the delay before hiding the preloader
    });
  
    function fadeOut(element) {
      var opacity = 1;
      var interval = setInterval(function () {
        if (opacity <= 0) {
          clearInterval(interval);
          element.style.display = 'none';
        } else {
          element.style.opacity = opacity;
          opacity -= 0.01; // Adjust the decrement value for the desired fade speed
        }
      }, 10); // Adjust the interval for the smoothness of the fade-out effect
    }
  });
  

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > 0 && currentScrollPos > 0) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("transparent-navbar").style.top = "0";
            document.getElementById("transparent-navbar").style.backgroundImage = 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.8) 65%,rgba(0,0,0,0.2) 92%,rgba(0,0,0,0) 100%)'; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

        } else {
            document.getElementById("transparent-navbar").style.top = "-70px";
        }
    }
    prevScrollpos = currentScrollPos;
}

const galleryContent = {
    "2022": {
        img1: "test1.png",
        img2: "test2.png",
        img3: "test3.png",
        img4: "test4.png",
        img5: "test5.png",
        img6: "test6.png",

    },
    "2021": {
        img1: "test3.png",
        img2: "test4.png",
        img3: "test1.png",
        img4: "test2.png",
        img5: "test5.png",
        img6: "test6.png",

    },
    "2020": {
        img1: "test5.png",
        img2: "test6.png",
        img3: "test3.png",
        img4: "test4.png",
        img5: "test1.png",
        img6: "test2.png",

    },
    "2019": {
        img1: "test1.png",
        img2: "test4.png",
        img3: "test3.png",
        img4: "test2.png",
        img5: "test5.png",
        img6: "test6.png",

    },
    "2018": {
        img1: "test1.png",
        img2: "test6.png",
        img3: "test3.png",
        img4: "test4.png",
        img5: "test5.png",
        img6: "test2.png",

    },
}

function setGallery(element, galleryName) {
    const { img1, img2, img3, img4, img5, img6 } = galleryContent[galleryName];
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

function myFunction(mail, num) {
    navigator.clipboard.writeText(mail);

    var tooltip = document.getElementById("myTooltip" + num.toString());
    tooltip.innerHTML = "Copied!" ;
}

function outFunc(num) {
    var tooltip = document.getElementById("myTooltip" + num.toString());
    tooltip.innerHTML = "Copy to clipboard";
}



