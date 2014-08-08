$(document).ready(function () {
    $("#input_rate_slider").slider({ tooltip: 'always' });
    $('#showHideContact').on('click', function () {
    console.log("toggle clicked");
    $("#contactForm").toggle();
    });
    $('#showHideComment').on('click', function () {
    console.log("toggle clicked");
    $("#commentForm").toggle();
    });
    });
