module.exports = function HtmlHelper(){

    var inputCharacteristics = function inputCharacteristics(imgPath,labelName){


        var data = '<div class="col-sm-6 col-md-3"> \
        <div class="form-group">'
            +
            HTMLHelper.html.img(imgPath,labelName,{class:'carCharacteristicsIcon'}) +
            '<label>{0}</label> \
                            {1} \
        </div> \
        </div> ';




        return stringFormat(data,labelName,HTMLHelper.form.checkBox(labelName));
    }

    var bootstrapSlider = function (elementName,minVal, maxVal, symbol, step, unit)
    {
        var data ='<div class="col-sm-2 col-md-3" id="{0}Slider"> \
    <div class="form-group sliderElement"> \
    <label>{0} {5}:</label> \
    <br /> \
    <b>{1} {3}</b> \
    <div class="slider slider-horizontal"> \
    <div class="slider-track"> \
        <div class="slider-selection"></div> \
        <div class="slider-handle round"></div> \
    <div class="slider-handle round"></div> \
    </div> \
    <div class="tooltip top"> \
        <div class="tooltip-arrow"></div> \
        <div class="tooltip-inner">{1} : {2}</div> \
    </div> \
    <input type="text" class="span2 sliderClicker" data-slider-id="{0}Slider"  data-slider-min="{1}" data-slider-max="{2}" data-slider-step="{4}" data-slider-value="[{1},{2}]" /> \
    <input type="number" id="End{0}Slider" name="End{0}" class="hidden" value="0" /> \
    </div> \
        <input type="number" id="Start{0}Slider" name="Start{0}" class="hidden" value="0" /> \
        <b> {2} {3}</b> \
    </div> \
    </div> ';
        var unit = (unit == null || unit.length==0 || ( /^\s+$/.test(unit)))?'':"<small>(" + unit + ")</small>";
        var res = stringFormat(data, elementName, minVal, maxVal, symbol, step, unit);
        return res;

    }



    return {inputCharacteristics:inputCharacteristics,bootstrapSlider:bootstrapSlider};


}




