var AutoMobileValidations = function (){
    var regExNumber = new RegExp('^[+]?\d+$');
    var VALIDCLASS = "field-validation-valid";
    var INVALIDCLASS = "input-validation-error";
    function getClassToAdd(isvalid){
        return (isvalid)?VALIDCLASS:INVALIDCLASS;
    }

    this.validateNumber = function(elem){
        var elem = $(this);
        var newValue = elem.prop("value");
        console.log("changed");
        console.log(newValue + " " +regExNumber + " = " + regExNumber.test(newValue) );
        var isValid = regExNumber.test(newValue);
        elem.removeClass(!isValid).addClass(isValid);
    }

    this.validateSelects = function(){
        $('select option:selected').each(function(){
            var isValid = this.value!="";
            updateClass(this,isValid);
            if(!isValid)return false;
        })
    }

    var updateClass = function(elem,isValid){
        elem.removeClass(!isValid).addClass(isValid);
    }

}();

$(document).ready( function() {
    console.log("validationForm enabled");
    $('input[type="number"]').change(function () {
        checkNumber(this);
    });

    $('button[type="submit"]').submit(function(){
        console.log("form submit");
        console.log(AutoMobileValidations.validateSelects());
        if(AutoMobileValidations.validateSelects()==false){
            $('label').text('Not valid').show().fadeout(1000);
        }
        return false;
    })
});
		
	