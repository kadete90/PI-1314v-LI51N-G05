var fs = require('fs');

module.exports = function(advertLogic,brandLogic,accountLogic) {


    function list(req, res) {
        var data = advertLogic.getAllGrouped();
	    res.render('Advert/List',  { title : "All Adverts", AdvertiseModel: data });
    };

	var add = function(req, res){
        res.render('Advert/Add', { title: "Add a new advert", brands: brandLogic.getAllBrands(),
            districts:enums.Districts(),fueltypes: enums.FuelType()});

	};

    var adPost = function(req, res){
       var user = accountLogic.get(req.cookies.____user_id____);
       var aux = [req.param("Ar condicionado"), req.param("Direcção Assistida"), req.param("Vidro elétrico"),
           req.param("Fecho elétrico"), req.param("Sistema de som"), req.param("Caixa Automática"), req.param("Tracção às 4 rodas")];
       var chara = [];

       for(var i= 0; i<aux.length; i++){
           if(chara[i]!= undefined)
            chara.push(i);
       }

       var id = advertLogic.addAdvert(
       //(title, brand, model,version, year, km, fuelType, geoLocation, owner, price, negotiable, valDate, characteristics, description)
       "", req.param("Brand"), req.param("Model"), req.param("Version"),
       req.param("Year"), req.param("Kilometers"), req.param("FuelType"), /*user.geoLocalization*/ "Lisbon",
       req.cookies.____user_id____, req.param("Price"), req.param("Negociavel") == undefined ? false : true , null,
       chara, req.param("Description"));


       if(req.files.otherPhotoList != undefined)
           fs.readFile(req.files.otherPhotoList.path, function (err, data) {
               var imageName = req.files.otherPhotoList.name;
               var newPath = __dirname + "/public/Images/CarPhotos/"+imageName;
               fs.writeFile(newPath, data, function (err) {
                        if(err) 
                            console.log(err);
                        });
                    });
           res.redirect('/advert/details/'+id);
    };

    var addComment = function(req, res){


        var advert = advertLogic.get(req.body.adId);
        var com = req.body.Message;
        //var score = req.body.Rating;
        advertLogic.addComment(advert,com,score);

        res.redirect('/advert/details/'+advert.id);
    };


	var details = function(req, res) {
	    var advert = advertLogic.get(req.params.ID);
        var user = accountLogic.get(advert.owner);
		res.render('Advert/Detailed',{title: advert.Title(),  AdvertiseModel: advert, UserModel:user });
	};


	var edit = function(req, res){
        var loggedUsername = req.user;
        var user = accountLogic.get(loggedUsername);
        var advertID = req.params.ID;
        var advertToEdit = advertLogic.get(advertID);
        console.log(advertToEdit.Owner());
        if(advertToEdit == null) throw {status:404,errorMsg:"Doesn't exist any advert with that id"}
        if( advertToEdit.Owner() != loggedUsername) throw {status:403, errorMsg:"You cannot edit an advertise from another owner !" };

		res.render('Advert/Edit',{advert:advertToEdit});
	};

    var postEdit = function(req, res){
        var advert = advertLogic.get(req.params.ID);
        var user = accountLogic.get(advert.owner);

        var preco = req.param("Price");
        var descript = req.param("Description");
        var negotiable = req.param("Negociavel") == undefined ? false : true;

        advert.price = parseInt(preco);
        advert.description = descript;
        advert.negotiable = negotiable;

        res.redirect('/advert/details/'+advert.id);

    };

    var cancel = function(req, res){

        if (!req.params.ID) return res.redirect('/account/manageAds/');
        var advert = advertLogic.get(req.params.ID);
        advert.status="Cancelado";

        res.redirect('account/manageAds');
    };

    var activate = function(req, res){

        if (!req.params.ID) return res.redirect('/account/manageAds/');
        var advert = advertLogic.get(req.params.ID);
        advert.status="Ativo";

        res.redirect('account/manageAds');

    };

    var adDelete = function(req, res){

        var advert = advertLogic.get(req.params.ID);
        advertLogic.delete(advert);
        res.redirect('/Account/ManageAds');
    };

    var search = function(req, res){
		res.render('Advert/Search',
            {title: 'Search',brands: brandLogic.getAllBrands(),
                districts:enums.Districts(),fueltypes: enums.FuelType()});
	};

    var searchPost = function(req, res){

        var params={};
        var data= [];

        //var params={arcondicionado:0, caixa:0, direccao:0, fechos:0, negociavel:0, sistemasom:0, traccao:0, vidros:0};

        //var data = advertLogic.getAllGrouped();

        var query = req.originalUrl;
        var vars = query.split('?');
        vars = vars[1].split('&');

        //preenche com valores sempre presentes da querys string
        for(var j = 0; j <vars.length; j++) {
            var pair = vars[j].split('=');
            params[pair[0]]=pair[1];
        }

        data.push(advertLogic.verify(params));

        /*for (var i = 0; i < data.length; i++) {

            for(var j = 0; j < vars.length; j++) {
                var pair = vars[j].split('=');

            }
        }*/
        //data = advertLogic.getAllGrouped();

        res.render('Advert/List',  { title : "All Adverts", AdvertiseModel: data });
    };
	
	return { list: list, add: add, details: details, edit: edit, postEdit:postEdit, search: search, adPost: adPost, adDelete: adDelete,
        searchPost:searchPost, cancel:cancel, activate:activate, addComment: addComment};
};
