(function ($) {
  $(document).ready(function () {
    // Scroll to Top
    jQuery(".scrolltotop").click(function () {
      jQuery("html").animate({ scrollTop: "0px" }, 400);
      return false;
    });

    jQuery(window).scroll(function () {
      var upto = jQuery(window).scrollTop();
      if (upto > 500) {
        jQuery(".scrolltotop").fadeIn();
      } else {
        jQuery(".scrolltotop").fadeOut();
      }
    });

    $(".menu-item ul li a").click(function () {
      $(".menu-item ul li a").removeClass("active");
      $(this).addClass("active");
    });

    $(".mobile-menu-item ul li a").click(function () {
      $(".mobile-menu-item ul li a").removeClass("m-active");
      $(this).addClass("m-active");
    });
  });
})(jQuery);

AOS.init({
  duration: 1900,
});

$(document).ready(function () {
  $(".Token_Address p").click(function (event) {
    event.preventDefault();
    CopyToClipboard(
      "0xcomingsoon",
      true,
      "✅Copied"
    );
  });
});

function CopyToClipboard(value, showNotification, notificationText) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(value).select();
  document.execCommand("copy");
  $temp.remove();

  if (typeof showNotification === "undefined") {
    showNotification = true;
  }
  if (typeof notificationText === "undefined") {
    notificationText = "Copied to clipboard";
  }

  var notificationTag = $("div.copy-notification");
  if (showNotification && notificationTag.length == 0) {
    notificationTag = $("<div/>", {
      class: "copy-notification",
      text: notificationText,
    });
    $("body").append(notificationTag);

    notificationTag.fadeIn("slow", function () {
      setTimeout(function () {
        notificationTag.fadeOut("slow", function () {
          notificationTag.remove();
        });
      }, 1000);
    });
  }
}

// =================marquee-container=============================

const marqueeContainer = document.querySelector(".marquee-container");
const marqueeTrack = document.querySelector(".marquee-track");
const playPauseBtn = document.querySelector(".play-pause-btn");

let isDragging = false;
let startX;
let scrollLeft;
let animationPaused = false;

// Drag to scroll
marqueeContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = marqueeTrack.getBoundingClientRect().left;
  marqueeTrack.style.animationPlayState = "paused";
});

marqueeContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = (x - startX) * 2; // Adjust drag speed
  marqueeTrack.style.transform = `translateX(${scrollLeft + walk}px)`;
});

marqueeContainer.addEventListener("mouseup", () => {
  isDragging = false;
  if (!animationPaused) {
    marqueeTrack.style.animationPlayState = "running";
  }
});

marqueeContainer.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    if (!animationPaused) {
      marqueeTrack.style.animationPlayState = "running";
    }
  }
});

// Touch support for mobile
marqueeContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  scrollLeft = marqueeTrack.getBoundingClientRect().left;
  marqueeTrack.style.animationPlayState = "paused";
});

marqueeContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  marqueeTrack.style.transform = `translateX(${scrollLeft + walk}px)`;
});

marqueeContainer.addEventListener("touchend", () => {
  isDragging = false;
  if (!animationPaused) {
    marqueeTrack.style.animationPlayState = "running";
  }
});

// Play/Pause button
playPauseBtn.addEventListener("click", () => {
  animationPaused = !animationPaused;
  marqueeTrack.style.animationPlayState = animationPaused
    ? "paused"
    : "running";
  playPauseBtn.textContent = animationPaused ? "Play" : "Pause";
});
