 function tryDeleteAccount() {
            var password = prompt("Confirme a sua password:");
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if(xhr.state==4 && xhr.status!=200) {
                    document.getElementById("checkPassword").innerHTML = "Password incorrecta! Tente Novamente!!";
                }else if(xhr.state==4) {
                    alert("Conta apagada!");
                    window.location.href = '/';
                }
            }
            xhr.open("get","/account/delete/",true);
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xhr.setRequestHeader('Content-length',password.length);
            xhr.send("password="+password);

        }
		
		
		$(document).ready(function(){$('#deleteAccountButton').on('click',tryDeleteAccount)});