$(document).ready(function(){
  $('#containerTable').append( '<table data-toolbar="#toolbar" data-show-columns="true" data-unique-id="ColumnId" data-click-to-select="true" data-single-select="true" data-toggle="table" id="tablaDinamica" data-search="true" data-pagination="true">' );
  $('#tablaDinamica').append('<thead> <tr> <th tabindex="0" data-field="ColumnState" data-checkbox="true"></th> <th data-field="ColumnId" data-sortable="true">Indice</th><th data-field="ColumnFName" data-sortable="true">First Name</th><th data-field="ColumnLName" data-sortable="true">Last Name</th> <th data-field="ColumnUName" data-sortable="true">Username</th></tr>');

  $('#tablaDinamica').append('</thead><tbody>');   
  for(i=0;i<15;i++){
        //$('#tablaDinamica').append( '<tr id="I'+i*2+'">'+
        $('#tablaDinamica').append( '<tr id="A'+i*2 +'">'+
        '  <td></td>' + //Esta columna la sustituye el pluging de bootstrap por el checkbox
        '  <td class="columnId">'+  'A'+i*2 +'</td>' +
        '  <td class="columnFName">'+ 'FName ' +  i*2 + '</td>' + 
        '  <td class="columnLName">'+ 'LName ' +  i*2 + '</td>' +
        '  <td class="columnUName">'+ 'User ' +  i*2 + '</td>' +
       // '  <td><div>'+ ' <button class="btnEdit'+i+'" onclick="accion(\'editar\','+i+')">Editar</button><button hidden="true" class="btnSave'+i+'"" onclick="accion(\'guardar\','+i+')">Guardar</button></div></td>' +
        ' </tr>');
    }


     $('#tablaDinamica').append(  '</tbody></table>' );           





$("#btnAdd").click(function(){
  $(".containerEdit").fadeOut();
  $(".containerAdd").fadeIn();
});


$("#btnEdit").click(function(){
  var elementSelect = checkStatusCheckbox(); 
  if(elementSelect.length > 0){
  $(".containerAdd").fadeOut();
  $("#editIndice").val(elementSelect[0].ColumnId);
  $("#editFirstName").val(elementSelect[0].ColumnFName);
  $("#editLastName").val(elementSelect[0].ColumnLName);
  $("#editUserName").val(elementSelect[0].ColumnUName);
  $(".containerEdit").fadeIn();
  }
  else{
    alert("Por favor, selecciona la fila a modificar");
  }
});


$("#btnRemove").click(function(){
    var elementSelect = checkStatusCheckbox(); 
  if(elementSelect.length > 0){
  $(".containerEdit").fadeOut();
  $(".containerAdd").fadeOut();

            var ids = $.map($("#tablaDinamica").bootstrapTable('getSelections'), function (row) {
                return row.ColumnId;
            });
            $("#tablaDinamica").bootstrapTable('remove', {
                field: 'ColumnId',
                values: ids
            });
          
}
   //$("#tablaDinamica").bootstrapTable('remove', {field: 'id', values: elementSelect[0].ColumnId}); 
    else{
    alert("Por favor, selecciona la fila a eliminar");
  }

});


});




function tratamientoFila(accion){
  switch (accion){
    case "alta":
    insertaFila();
    break;

    case "remove":
    removeFila();
    break;

    case "actualiza":
    actualizaFila();
    $(".containerEdit").fadeOut();
    break;
  }
}




function insertaFila(){
  var identificadorInput, FNameInput, LNameInput, UNameInput;
  var posicionInsercionElemento  = 0;
  identificadorInput = $("#addIndice").val();
  FNameInput = $("#addFirstName").val();
  LNameInput = $("#addLastName").val();
  UNameInput = $("#addUserName").val();
  var evalua = checkValues(identificadorInput);
  if(!evalua){
    return evalua;
  }
    
    
  $("#tablaDinamica").bootstrapTable('insertRow', {
    index: posicionInsercionElemento,
    row: {
        //name: 'Item ' + randomId,
        ColumnState : false,
        ColumnId : "A"+identificadorInput,
        ColumnFName: FNameInput,
        ColumnLName: LNameInput,
        ColumnUName: UNameInput
    }
  });
            
                //añadimos etiquetas a nueva fila
/*
                  $("#tablaDinamica tbody tr").each(function(index){
                    if($(this).attr("data-index")== posicionInsercionElemento){
                      $(this).attr("id","A"+identificadorInput);
                      return false;
                    }
                  });
                  */
                  //var fila = $("#tablaDinamica tbody tr")[posicionInsercionElemento];
                  //fila.id = "A"+identificadorInput;
                  annadeEtiquetas("A"+identificadorInput,posicionInsercionElemento);
       
                  $(".containerAdd").fadeOut();

}



function actualizaFila(){
  var identificadorInput, FNameInput, LNameInput, UNameInput, indiceFila;
  identificadorInput = $("#editIndice").val();
  FNameInput = $("#editFirstName").val();
  LNameInput = $("#editLastName").val();
  UNameInput = $("#editUserName").val();  

  //indiceFila = $("#"+identificadorInput)[0].dataset.index;
  indiceFila = $("#"+identificadorInput).attr("data-index");
  //var objectRow = $(".selected").attr("id",identificadorInput);

$("#tablaDinamica").bootstrapTable('updateRow', {
                index: indiceFila,
                row: {
                    //name: 'Item ' + randomId,
                    ColumnState : false,
                    ColumnId : identificadorInput,
                    ColumnFName: FNameInput,
                    ColumnLName: LNameInput,
                    ColumnUName: UNameInput
                }
            });  
annadeEtiquetas(identificadorInput,indiceFila);
}



function checkExistId(identificador){
  var enc = false;
  var existe = $("#tablaDinamica").bootstrapTable('getRowByUniqueId',"A"+identificador);
  if(existe instanceof Object){
    enc = true;
  }
  return enc;
}


function checkStatusCheckbox(){
return $("#tablaDinamica").bootstrapTable('getSelections');
}

function checkValues(identificador){
  if(isNaN(identificador)|| (identificador == "")){
      alert("Por favor, inserte un identificador numerico.");
      return false;
        }
        else{
        var encontrado = checkExistId(identificador);
        if (encontrado == true ){
          alert("Identificador duplicado.");
          return false;
        }
        else{
          return true;
        }        
      }
}

function annadeEtiquetas(identificadorInput,indexRowSelected){
    var elementosFila = '';
    var fila = '';
    /*if(accion == "alta"){
    //var row = $("#"+identificadorInput).attr("id","A"+identificadorInput);
    //var row = $("#"+identificadorInput).attr("id",identificadorInput);
    elementosFila = $("#"+identificadorInput)[0].childNodes;
    }
    else{*/
      $("tr").each(function(index){
        if($(this).attr("data-index")== indexRowSelected){
          fila = $(this);
          //$(this).attr("id",identificadorInput);
            elementosFila = $(this)[0].childNodes;
        }
      });
   // }
    fila.attr("id",identificadorInput);
    elementosFila[1].className = "columnId";
    elementosFila[2].className = "columnFName";
    elementosFila[3].className = "columnLName";
    elementosFila[4].className = "columnUName";

    //Hay que añadir esta etiqueta al elemento siguiente al de la inserción, ya que desaparece
    var indiceElementoSiguiente = fila.next().attr("data-uniqueid");
    fila.next().attr("id",indiceElementoSiguiente);
}