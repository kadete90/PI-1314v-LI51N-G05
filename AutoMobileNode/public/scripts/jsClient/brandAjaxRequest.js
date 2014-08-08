function registerAjaxRequest(){

    $('#Brands').on("change",function(){
        var selectedIdx = document.getElementById('Brands').selectedIndex;
        var options = $('select[id="Brands"] > option');
        var elemClicked = options[selectedIdx];
        if(elemClicked.value=="") return;
        var request = new XMLHttpRequest();
        var selectedBrand = elemClicked.value;
        console.log(selectedBrand);

        request.onreadystatechange =function(){
            if(request.readyState==4 && request.status ==200){
                document.getElementById('Models').innerHTML = request.responseText;
            }
        };
        request.open("GET","/ajax/brands/"+selectedBrand,true);
        request.setRequestHeader('X-Requested-With','XMLHttpRequest');

        request.send();
    });

};

document.addEventListener('load',registerAjaxRequest,true);
console.log('evento registado');









