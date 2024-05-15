

// Funcion de generar numeros de 20 digitos
function generateNumbers() {
        var currentDate = new Date();
        var timestamp = currentDate.getFullYear().toString() + padNumber(currentDate.getMonth() + 1) + padNumber(currentDate.getDate()) + padNumber(currentDate.getHours()) + padNumber(currentDate.getMinutes()) + padNumber(currentDate.getSeconds());
        var generatedNumbers = "0000" + timestamp + "000000000000000000";
        return generatedNumbers.substring(0, 20);
    }

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    document.querySelector('.generateButton').addEventListener('click', function() {
        var generatedNumbers = generateNumbers();
        document.getElementById('generatedNumbers').value = generatedNumbers;
    });

    document.querySelector('.copyButton').addEventListener('click', function() {
        var generatedNumbers = document.getElementById('generatedNumbers').value;
        navigator.clipboard.writeText(generatedNumbers)
            .then(function() {
                console.log('Contenido copiado al portapapeles: ' + generatedNumbers);
            })
            .catch(function(error) {
                console.error('Error al copiar al portapapeles: ', error);
            });
    });

//Funcion para copiar y pegar de textarea
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function() {
            console.log('Contenido copiado al portapapeles: ' + text);
        })
        .catch(function(error) {
            console.error('Error al copiar al portapapeles: ', error);
        });
}

function pasteFromClipboard(callback) {
    navigator.clipboard.readText()
        .then(function(clipboardText) {
            callback(clipboardText);
        })
        .catch(function(error) {
            console.error('Error al pegar desde el portapapeles: ', error);
        });
}

document.querySelectorAll('.copyButton').forEach(function (button) {
    button.addEventListener('click', function() {
        var textarea = this.parentNode.querySelector('textarea');
        if (textarea) {
            copyToClipboard(textarea.value);
        }
    });
});

document.querySelectorAll('.pasteButton').forEach(function(button) {
    button.addEventListener('click', function() {
        var textarea = this.parentNode.querySelector('textarea');
        if (textarea) {
            pasteFromClipboard(function(clipboardText) {
                textarea.value = clipboardText;
                console.log('Contenido pegado del portapapeles: ' + clipboardText);
            });
        }
    });
});







// Funcion para leer los datos almacenados
function ReadData() {
    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    // Dentro de la Funcion ReadData(), donde se construye el HTML para agregar al principio del formulario
    // Estructura HTML para la tabla
    var html = "";
        html += "<tr>";
        html += "<th>ID</th>"; // Agregamos el encabezado para el campo ID
        html += "<th>Nombre</th>";
        html += "<th>Telefono</th>";
        html += "<th>Cedula</th>"; // Agregamos el encabezado para el campo Cedula
        html += "<th>Contrato</th>"; // Agregamos el encabezado para el campo Contrato
        html += "<th>Email</th>"; // Agregamos el encabezado para el campo Email
        html += "<th>Direccion</th>"; // Agregamos el encabezado para el campo Direccion
        html += "<th>OE/Pedido</th>"; // Agregamos el encabezado para el campo OE/Pedido
        html += "<th>Radicado</th>"; // Agregamos el encabezado para el campo Radicado
        html += "<th>Solucion</th>"; // Agregamos el encabezado para el campo Solucion
        html += "<th>Resultado</th>";
        html += "<th>Descripcion</th>"; // Agregamos el encabezado para el campo Descripcion
        html += "<th>IDRescate</th>";
        html += "<th>Colecte</th>";
        html += "<th>Acciones</th>";
        html += "</tr>";
    listPeople.forEach(function (element, index) {
        // Agregando los valores para la fila de la tabla dentro del bucle forEach
        html += "<tr>";
        html += "<td>" + element.id + "</td>"; // Agregamos el valor del campo ID
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.telefono + "</td>";
        html += "<td>" + element.cedula + "</td>"; // Agregamos el valor del campo cedula
        html += "<td>" + element.contrato + "</td>"; // Agregamos el valor del campo Contrato
        html += "<td>" + element.email + "</td>"; // Agregamos el valor del campo Email
        html += "<td>" + element.direccion + "</td>"; // Agregamos el valor del campo Direccion
        html += "<td>" + element.pedido + "</td>"; // Agregamos el valor del campo OE/Pedido
        html += "<td>" + element.radicado + "</td>"; // Agregamos el valor del campo Radicado
        html += "<td>" + element.solucion + "</td>"; // Agregamos el valor del campo Solucion
        html += "<td>" + element.resultado + "</td>";
        html += "<td>" + element.descripcion + "</td>"; // Agregamos el valor del campo Descripcion
        html += "<td>" + element.idrescate + "</td>"; 
        html += "<td>" + element.colecte + "</td>"; 
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar Datos</button> <button onclick="editData(' + index + ')" class="btn btn-warning">Editar Datos</button></td>';
        html += "</tr>";

    });
    document.querySelector('#tableData').innerHTML = html;
}

// Al cargar la pagina, leer los datos almacenados
document.onload = ReadData();

// Funcion para agregar datos
function AddData() {
    let id = document.getElementById('InputLlamada').value;
    let telefono = document.getElementById('InputPhone').value;
    let nombre = document.getElementById('InputName').value;
    let cedula = document.getElementById('InputCC').value;
    let contrato = document.getElementById('InputContrato').value;
    let email = document.getElementById('InputEmail').value;
    let direccion = document.getElementById('InputDireccion').value;
    let pedido = document.getElementById('InputPedido').value;
    let radicado = document.getElementById('InputRadicado').value;
    let solucion = document.getElementById('InputSolucion').value;
    let resultado = document.getElementById('InputResultado').value;
    let descripcion = document.getElementById('InputDescripcion').value;
    let idrescate = document.getElementById('generatedNumbers').value;
    let colecte = document.getElementById('colecteCheckbox').value;
    
    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }
    // Verificar si al menos uno de los campos obligatorios estan llenos
    if (id || telefono || nombre || cedula || contrato || email || direccion || pedido || radicado || solucion || resultado || descripcion || idrescate || colecte) {
        listPeople.push({
            id: id,
            nombre: nombre,
            telefono: telefono,
            cedula: cedula,
            contrato: contrato,
            email: email,
            direccion: direccion,
            pedido: pedido,
            radicado: radicado,
            solucion: solucion,
            resultado: resultado,
            descripcion: descripcion,
            idrescate: idrescate,
            colecte: colecte
                });
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        alert("Se ha guardado correctamente");
        // Limpiar los campos despues de agregar datos
        document.getElementById('InputLlamada').value = '';
        document.getElementById('InputPhone').value = '';
        document.getElementById('InputName').value = '';
        document.getElementById('InputCC').value = '';
        document.getElementById('InputContrato').value = '';
        document.getElementById('InputEmail').value = '';
        document.getElementById('InputDireccion').value = '';
        document.getElementById('InputPedido').value = '';
        document.getElementById('InputRadicado').value = '';
        document.getElementById('InputSolucion').value = '';
        document.getElementById('InputResultado').value = '';
        document.getElementById('InputDescripcion').value = '';
        document.getElementById('generatedNumbers').value = '';

        // Leer y mostrar los datos
        ReadData();
    } else {
        alert("Por favor complete al menos uno de los campos obligatorios.");
    }
}
   
// Funcion para eliminar datos
function deleteData(index) {
    if (confirm("Estas seguro de que quieres borrar este elemento?")) {
        let listPeople = JSON.parse(localStorage.getItem('listPeople'));
        listPeople.splice(index, 1);
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        ReadData(); // Actualizar la tabla despues de eliminar los datos
    }
}

// Funcion para cargar los datos en la tabla
function loadTable() {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let tableBody = $('#tablaEjemplo tbody');
    tableBody.empty(); // Limpiar contenido anterior

    if (listPeople) {
        listPeople.forEach(function(person, index) {
            let row = `<tr>
                <td>${person.nombre}</td>
                <td>${person.telefono}</td>
                <!-- Agrega aqui las celdas de las otras columnas -->
                <td><button class="btn btn-primary" onclick="editData(${index})">Editar</button></td>
            </tr>`;
            tableBody.append(row);
        });
    }
}

// Funcion para editar datos
function editData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let person = listPeople[index];

    // Rellenar los campos de la ventana modal con los datos existentes
    $('#nombre').val(person.nombre);
    $('#telefono').val(person.telefono);
    // Rellena los demas campos de la misma manera

    // Guardar el apendice del elemento a editar
    $('#editModal').data('index', index);

    // Mostrar la ventana modal
    $('#editModal').modal('show');
}

function saveDataToFile() {
//modificacion
        // Obtener el elemento que contiene las tablas generadas
    var tableContainer = document.getElementById('tableData');
    
    // Eliminar el contenido del elemento para borrar las tablas
    tableContainer.innerHTML = '';
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));

    // Verificar si hay datos en el localStorage
    if (!listPeople || listPeople.length === 0) {
        alert("No hay datos guardados para exportar.");
        return;
//modificacion
    // Obtener la fecha y hora actual
    let currentDate = new Date();
    let dateTimeString = currentDate.toLocaleString().replace(/[/\\?%*:|"<>]/g, '-'); // Reemplazar caracteres no permitidos en nombres de archivos

    // Construir el titulo del archivo con la fecha y hora actual
    let fileName = 'llamadas' + dateTimeString + '.txt';

    // Construir el contenido del archivo de texto
    let textContent = "Informacion Guardada:\n\n";
    listPeople.forEach(function (person) {
        textContent += "ID: " + person.id + "\n";
        textContent += "Nombre: " + person.nombre + "\n";
        textContent += "Telefono: " + person.telefono + "\n";
        textContent += "Cedula: " + person.cedula + "\n";
        textContent += "Contrato: " + person.contrato + "\n";
        textContent += "Email: " + person.email + "\n";
        textContent += "Direccion: " + person.direccion + "\n";
        textContent += "OE/Pedido: " + person.pedido + "\n";
        textContent += "Radicado: " + person.radicado + "\n";
        textContent += "Solucion: " + person.solucion + "\n";
        textContent += "Resultado: " + person.resultado + "\n\n";
        textContent += "Descripcion: " + person.descripcion + "\n\n";
        textContent += "IDRescate:" + person.idrescate + "\n\n";
        textContent += "colecte:" + person.colecte + "\n\n";
    });

    // Crear un Blob con los datos y un enlace para descargarlo
    let blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // Simular clic en el enlace para iniciar la descarga del archivo
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Asignar la Funcion saveDataToFile() al boton correspondiente
let saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveDataToFile);


// Funcion para mostrar la ventana modal de edicion de datos
function showEditDataModal() {
    var editDataModal = new bootstrap.Modal(document.getElementById('editDataModal'));
    editDataModal.show();
}

// Funcion para guardar los cambios en la edicion de datos
function saveEditedData() {
    let index = $('#editModal').data('index');
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));

    // Obtener los valores actualizados desde el formulario modal
    let newLlamada = $('#editLlamada').val();
    let newPhone = $('#editPhone').val();
    let newName = $('#editName').val();
    let newCC = $('#editCC').val();
    let newContrato = $('#editContrato').val();
    let newEmail = $('#editEmail').val();
    let newDireccion = $('#editDireccion').val();
    let newPedido = $('#editPedido').val();
    let newSolucion = $('#editSolucion').val();
    let newResultado = $('#editResultado').val();
    let newDescripcion = $('#editDescripcion').val();
    // Obtener los demas valores de los campos segun sea necesario

    // Actualizar los datos en el localStorage
    listPeople[index].llamada = newLlamada;
    listPeople[index].telefono = newPhone;
    listPeople[index].nombre = newName;
    listPeople[index].cc = newCC;
    listPeople[index].contrato = newContrato;
    listPeople[index].email = newEmail;
    listPeople[index].direccion = newDireccion;
    listPeople[index].pedido = newPedido;
    listPeople[index].solucion = newSolucion;
    listPeople[index].resultado = newResultado;
    listPeople[index].descripcion = newDescripcion;
     // Actualizar los demas campos de la misma manera

    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    // Cerrar la ventana modal
    var editDataModal = new bootstrap.Modal(document.getElementById('editDataModal'));
    editDataModal.hide();

    // Actualizar la tabla despuÃƒÂ©s de editar los datos
    loadTable();
                       }
