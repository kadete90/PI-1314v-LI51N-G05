function updateSliderValues(){

$(document).ready
                $(".sliderClicker").slider().on('slideStop', function (ev) {
                    var sliderElement = this;

                    var sliderID = sliderElement.attributes["data-slider-id"].value;
                    var y = $("#" + sliderID + " .tooltip-inner")[0].innerHTML;
                    var values = y.split(":");
                    var startFormId = "Start" + sliderID;
                    var endFormId = "End" + sliderID;

                    var startForm = $("#" + startFormId)[0];
                    var endForm = $("#" + endFormId)[0];
                    startForm.value = values[0].trim();
                    var end="";
                    if (endForm && values[1]) {
                        endForm.value = values[1].trim();
                        end = "," + endForm.value;
                    }

                    console.log("Slider id: " + sliderID + " VALS: " + startForm.value + " start: " + end+ startFormId + " end: " + endFormId);
    })};

document.addEventListener("load",updateSliderValues,true);