$(document).ready(function(){

  $('#containerTable').append( '<table data-toolbar="#toolbar" data-click-to-select="true" data-single-select="true" data-toggle="table" id="tablaDinamica" data-search="true" data-pagination="true">' );
  $('#tablaDinamica').append('<thead> <tr> <th data-field="state" data-checkbox="true"></th> <th data-field="FirstName">First Name</th><th data-field="LastName">Last Name</th> <th data-field="UserName">Username</th></tr> ');
  $('#tablaDinamica').append('</thead><tbody>');   
  for(i=0;i<15;i++){
        $('#tablaDinamica').append( '<tr>'+
        '  <td id="th'+i+'" class="nr" scope="row"><div>' +  i + '</div></td>' +
        '  <td><div>'+ 'FName ' +  i + '</div></td>' + 
        '  <td><div>'+ 'LName ' +  i + '</div></td>' +
        '  <td><div>'+ 'User ' +  i + '</div></td>' +
       // '  <td><div>'+ ' <button class="btnEdit'+i+'" onclick="accion(\'editar\','+i+')">Editar</button><button hidden="true" class="btnSave'+i+'"" onclick="accion(\'guardar\','+i+')">Guardar</button></div></td>' +
        ' </tr>');
    }


     $('#tablaDinamica').append(  '</tbody></table>' );           


});


