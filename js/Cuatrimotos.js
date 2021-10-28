///////////////////Categorias//////////////////////////////////////


///////////////////Cuatrimotos//////////////////////////////////////
function traerInformacionQuadbikes(){
    console.log("En ejecucion")
    $.ajax({
        url:"http://129.151.122.133:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaQuadbikes(respuesta);
        }
    });
}

function pintarRespuestaQuadbikes(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionQuadbikes("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarQuadbike("+respuesta[i].id+")'>Borrar</button>";        
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionQuadbikes(){
    let var3 = {
        name:$("#Qname").val(),
        brand:$("#Qbrand").val(),
        year:$("#Qyear").val(),
        description:$("#Qdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://129.151.122.133:8080/api/Quadbike/save",
       
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}
function actualizarInformacionQuadbikes(idElemento){
    let myData={
        id:idElemento,
        name:$("#Qname").val(),
        brand:$("#Qbrand").val(),
        year:$("#Qyear").val(),
        description:$("#Qdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.122.133:8080/api/Quadbike/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Qname").val("");
            $("#Qbrand").val("");
            $("#Qyear").val("");
            $("#Qdescription").val("");
            traerInformacionQuadbikes();
            alert("Se ha actualizado correctamente la cuatrimoto")
        }
    });

}
function borrarQuadbike(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.122.133:8080/api/Quadbike/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionQuadbikes();
            alert("Se ha eliminado la cuatrimoto.")
        }
    });

} 