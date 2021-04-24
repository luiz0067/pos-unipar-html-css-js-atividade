

$(document).ready(function (){
    
    var formNoticias = $("#form-noticias");
    formNoticias.on("submit", function(){
        try {
            var json = recordFromForm(formNoticias);
            addDataTable(json);
        } catch (e){
            console.error(e);
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
            console.log(json);
        });
        json = `{${json}}`;
        return JSON.parse(json);
    }

	$(".remove").on("click",
    function removeDataTable(){
		$(this).closest("tr").remove();
		var count_records= $("#table-noticias tbody").find("tr").length;
        $("#total_registros").html(count_records);
	});
    
    function addDataTable(noticiajson){
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");   
        var tdIntroducao = $("<td></td>");
        var tdAcao = $("<td><a style='color:red' class='remove'>X<a></td>");
        tdTitulo.text(noticiajson['titulo']);
        tdIntroducao.text(noticiajson['introducao']);
        tr.append(tdTitulo, tdIntroducao,tdAcao);
        tbody.append(tr);
        var count_records= $("#table-noticias tbody").find("tr").length;
        $("#total_registros").html(count_records);
    }

});
