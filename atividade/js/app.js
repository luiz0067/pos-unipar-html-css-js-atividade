var array_noticiajson=[];
var load_start=true;

$(document).ready(function (){
	
	function loadDataTable(){
		var load_array_noticiajson=[];
		try{
			load_array_noticiajson=JSON.parse(localStorage.getItem('array_noticiajson'));
		}catch (e){ 
			load_array_noticiajson=[]
		}
		for (var noticiajson of load_array_noticiajson) {
			addDataTable(noticiajson);
		}
		load_start=false;
	}

   
	
	
    var array_noticiajson= [];
    var formNoticias = $("#form-noticias");
    formNoticias.on("submit", function(submitEvent){
        try {
			let submitter = submitEvent.originalEvent.submitter;
            acao=$(submitter).val();;
            if(acao=="Enviar"){
				var json = recordFromForm(formNoticias);
				addDataTable(json);
			}
        } catch (e){
            //console.error(e);
        }
        return false;
    });

	

    function recordFromForm(form){
        var inputs = form.find('input[type="text"], textarea');
        var json = "";
        inputs.each(function(idx, input){
            var name = $(input).attr("name");
            var value = $(input).val();
            if (json !== "")
                json += ",";
            
            json += `"${name}": "${ value.trim() }"`;
            //console.log(json);
        });
        json = `{${json}}`;
        return JSON.parse(json);
    }
	
    function removeDataTable(element){
		var line=$(element).closest("tr");
		var index=line.index();
		line.remove();
		array_noticiajson.splice(index);
		var count_records= $("#table-noticias tbody").find("tr").length;
        $("#total_registros").html(count_records);
        localStorage.setItem('array_noticiajson', JSON.stringify(array_noticiajson))
	}
	
	
    
    function addDataTable(noticiajson){
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");   
        var tdIntroducao = $("<td></td>");
        var excluir=$("<a style='color:red' >X</a>").click(function(){ removeDataTable(this); });
        var tdAcao = $("<td></td>").append(excluir);
        tdTitulo.text(noticiajson['titulo']);
        tdIntroducao.text(noticiajson['introducao']);
        tr.append(tdTitulo, tdIntroducao,tdAcao);
        tbody.append(tr);
        var count_records= $("#table-noticias tbody").find("tr").length;
        $("#total_registros").html(count_records);
        array_noticiajson.push(noticiajson);
        if (!load_start)localStorage.setItem('array_noticiajson', JSON.stringify(array_noticiajson))
    }
	loadDataTable();
 
	

});
