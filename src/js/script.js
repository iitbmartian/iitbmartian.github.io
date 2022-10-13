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

const roverCards = {
    "rover-1" : {
        imgSrc : "rover1.png",
        cardTitle : "Rover 1 title",
        cardContent : "Rover 1 content sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sed pulvinar proin gravida. In nisl nisi scelerisque eu. Tellus molestie nunc non blandit. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Metus dictum at tempor commodo ullamcorper a. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Enim sed faucibus turpis in eu mi bibendum neque egestas."
    },
    "rover-2" : {
        imgSrc : "rover2.jpg",
        cardTitle : "Rover 2 title",
        cardContent : "Rover 2 content Vel quam elementum pulvinar etiam non quam lacus. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Risus nullam eget felis eget nunc lobortis mattis aliquam. Velit scelerisque in dictum non consectetur a erat nam. Elementum integer enim neque volutpat ac tincidunt. At consectetur lorem donec massa sapien faucibus. Tristique senectus et netus et malesuada fames ac turpis."
    },
    "rover-3" : {
        imgSrc : "rover3.jpg",
        cardTitle : "Rover 3 title",
        cardContent : "Rover 3 content Sed vulputate odio ut enim. Tellus mauris a diam maecenas sed enim ut sem. Aliquam nulla facilisi cras fermentum odio. Ante metus dictum at tempor commodo. Risus ultricies tristique nulla aliquet enim tortor at auctor. Non tellus orci ac auctor. Dignissim convallis aenean et tortor at. Aliquet bibendum enim facilisis gravida neque convallis a cras. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Sit amet mauris commodo quis imperdiet massa. Nibh ipsum consequat nisl vel pretium lectus. Suspendisse in est ante in nibh mauris cursus."
    },
    "rover-4" : {
        imgSrc : "rover1.png",
        cardTitle : "Rover 4 title",
        cardContent : "Rover 4 content sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sed pulvinar proin gravida. In nisl nisi scelerisque eu. Tellus molestie nunc non blandit. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Metus dictum at tempor commodo ullamcorper a. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Enim sed faucibus turpis in eu mi bibendum neque egestas."
    },
    "rover-5" : {
        imgSrc : "rover2.jpg",
        cardTitle : "Rover 5 title",
        cardContent : "Rover 5 content Vel quam elementum pulvinar etiam non quam lacus. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Risus nullam eget felis eget nunc lobortis mattis aliquam. Velit scelerisque in dictum non consectetur a erat nam. Elementum integer enim neque volutpat ac tincidunt. At consectetur lorem donec massa sapien faucibus. Tristique senectus et netus et malesuada fames ac turpis."
    },
    "rover-6" : {
        imgSrc : "rover3.jpg",
        cardTitle : "Rover 6 title",
        cardContent : "Rover 6 content Sed vulputate odio ut enim. Tellus mauris a diam maecenas sed enim ut sem. Aliquam nulla facilisi cras fermentum odio. Ante metus dictum at tempor commodo. Risus ultricies tristique nulla aliquet enim tortor at auctor. Non tellus orci ac auctor. Dignissim convallis aenean et tortor at. Aliquet bibendum enim facilisis gravida neque convallis a cras. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Sit amet mauris commodo quis imperdiet massa. Nibh ipsum consequat nisl vel pretium lectus. Suspendisse in est ante in nibh mauris cursus."
    }
}

const subdivisionCards = {
    "elecSoft" : {
        "controlSystem" : {
            imgSrc : "rover1.png",
            cardTitle : "CONTROL SYSTEMS FOR ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "autonomousNavigation" : {
            imgSrc : "rover2.jpg",
            cardTitle : "AUTONOMOUS OPERATION OF ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "baseStation" : {
            imgSrc : "rover3.jpg",
            cardTitle : "BASE STATION GUI",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "wirelessComm" : {
            imgSrc : "rover1.png",
            cardTitle : "WIRELESS COMMUNICATIONS",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        }
    },
    "mechanical" : {
        "robotArm" : {
            imgSrc : "rover1.png",
            cardTitle : "Robotic Arm and End Effector",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "suspension" : {
            imgSrc : "rover2.jpg",
            cardTitle : "AUTONOMOUS OPERATION OF ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "bioassembly" : {
            imgSrc : "rover3.jpg",
            cardTitle : "BASE STATION GUI",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "chassis" : {
            imgSrc : "rover1.png",
            cardTitle : "WIRELESS COMMUNICATIONS",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        }
    },
    "bioscience" : {
        "lifeDetection" : {
            imgSrc : "rover1.png",
            cardTitle : "CONTROL SYSTEMS FOR ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "bioSensors" : {
            imgSrc : "rover2.jpg",
            cardTitle : "AUTONOMOUS OPERATION OF ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "geoSurvey" : {
            imgSrc : "rover3.jpg",
            cardTitle : "BASE STATION GUI",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "sample" : {
            imgSrc : "rover1.png",
            cardTitle : "WIRELESS COMMUNICATIONS",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        }
    },
    "mdm" : {
        "design" : {
            imgSrc : "rover1.png",
            cardTitle : "CONTROL SYSTEMS FOR ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "photoshoot" : {
            imgSrc : "rover2.jpg",
            cardTitle : "AUTONOMOUS OPERATION OF ROVER",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "webdev" : {
            imgSrc : "rover3.jpg",
            cardTitle : "BASE STATION GUI",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        },
        "business" : {
            imgSrc : "rover1.png",
            cardTitle : "WIRELESS COMMUNICATIONS",
            cardContent : "All 6 wheels are driven independently from GPIO pins of Raspberry Pi 3 in open loop, 4 steering wheels (Front and Rear) are steered using closed loop control (see fig. on left) Steering is controlled by Roboclaw Motor Drivers onto which we employ a Type II control system, to track ramp input (see fig. on left, tracking of i/p, dotted line, is done by o/p, solid purple), while drive is controlled by Hercules motor Drivers We are working towards getting a state space description of the same, so that we can employ Inverse Kinematics or LQR control for the arm, using Moveit! motion planning plugin (see fig. on left)"
        }
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
    const {imgSrc, cardTitle, cardContent} = roverCards[roverName];
    row = arguments[2];
    if(row == undefined){
        row = "";
    }
    document.getElementById("img" + row).src = "./src/img/" + imgSrc;
    document.getElementById("cardTitle" + row).innerText = cardTitle;
    document.getElementById("cardContent" + row).innerText = cardContent;
    var allActive = document.getElementsByClassName("activeButton");
    if(allActive.length == 1){
        var currentActive = allActive[0];
        currentActive.classList.toggle("activeButton");
        element.classList.toggle("activeButton");
        return;
    }
    for (let index = 0; index < allActive.length; index++) {
        console.log("entered for")
        const item = allActive[index];
        itemRow = item.getAttribute('onclick').at(-3);
        if(itemRow == row){
            item.classList.toggle("activeButton");
        }        
    }
    element.classList.toggle("activeButton");
}

function setSub(element, subDivName, subSecName, row){
    const {imgSrc, cardTitle, cardContent} = subdivisionCards[subDivName][subSecName];
    document.getElementById("subImg" + row).src = "./src/img/" + imgSrc;
    document.getElementById("subTitle" + row).innerText = cardTitle;
    document.getElementById("subContent" + row).innerText = cardContent;
    var allActive = document.getElementsByClassName("activeButton");
    for (let index = 0; index < allActive.length; index++) {
        const item = allActive[index];
        itemRow = item.getAttribute('onclick').at(-3);
        if(itemRow == row){
            item.classList.toggle("activeButton");
            break;
        }        
    }
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

