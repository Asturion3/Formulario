

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







// FunciÃ³n para leer los datos almacenados
function ReadData() {
    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    // Dentro de la funciÃ³n ReadData(), donde se construye el HTML para agregar al principio del formulario
    // Estructura HTML para la tabla
    var html = "";
        html += "<tr>";
        html += "<th>ID</th>"; // Agregamos el encabezado para el campo ID
        html += "<th>Nombre</th>";
        html += "<th>TelÃ©fono</th>";
        html += "<th>CÃ©dula</th>"; // Agregamos el encabezado para el campo CÃ©dula
        html += "<th>Contrato</th>"; // Agregamos el encabezado para el campo Contrato
        html += "<th>Email</th>"; // Agregamos el encabezado para el campo Email
        html += "<th>DirecciÃ³n</th>"; // Agregamos el encabezado para el campo DirecciÃ³n
        html += "<th>OE/Pedido</th>"; // Agregamos el encabezado para el campo OE/Pedido
        html += "<th>Radicado</th>"; // Agregamos el encabezado para el campo Radicado
        html += "<th>SoluciÃ³n</th>"; // Agregamos el encabezado para el campo SoluciÃ³n
        html += "<th>Resultado</th>";
        html += "<th>DescripciÃ³n</th>"; // Agregamos el encabezado para el campo DescripciÃ³n
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
        html += "<td>" + element.cedula + "</td>"; // Agregamos el valor del campo CÃ©dula
        html += "<td>" + element.contrato + "</td>"; // Agregamos el valor del campo Contrato
        html += "<td>" + element.email + "</td>"; // Agregamos el valor del campo Email
        html += "<td>" + element.direccion + "</td>"; // Agregamos el valor del campo DirecciÃ³n
        html += "<td>" + element.pedido + "</td>"; // Agregamos el valor del campo OE/Pedido
        html += "<td>" + element.radicado + "</td>"; // Agregamos el valor del campo Radicado
        html += "<td>" + element.solucion + "</td>"; // Agregamos el valor del campo SoluciÃ³n
        html += "<td>" + element.resultado + "</td>";
        html += "<td>" + element.descripcion + "</td>"; // Agregamos el valor del campo DescripciÃ³n
        html += "<td>" + element.idrescate + "</td>"; 
        html += "<td>" + element.colecte + "</td>"; 
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar Datos</button> <button onclick="editData(' + index + ')" class="btn btn-warning">Editar Datos</button></td>';
        html += "</tr>";

    });
    document.querySelector('#tableData').innerHTML = html;
}

// Al cargar la pÃ¡gina, leer los datos almacenados
document.onload = ReadData();

// FunciÃ³n para agregar datos
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
    // Verificar si al menos uno de los campos obligatorios estÃ¡ lleno
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
        // Limpiar los campos despuÃ©s de agregar datos
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
   
// FunciÃ³n para eliminar datos
function deleteData(index) {
    if (confirm("Â¿EstÃ¡s seguro de que quieres borrar este elemento?")) {
        let listPeople = JSON.parse(localStorage.getItem('listPeople'));
        listPeople.splice(index, 1);
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        ReadData(); // Actualizar la tabla despuÃ©s de eliminar los datos
    }
}

// FunciÃ³n para cargar los datos en la tabla
function loadTable() {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let tableBody = $('#tablaEjemplo tbody');
    tableBody.empty(); // Limpiar contenido anterior

    if (listPeople) {
        listPeople.forEach(function(person, index) {
            let row = `<tr>
                <td>${person.nombre}</td>
                <td>${person.telefono}</td>
                <!-- Agrega aquÃ­ las celdas de las otras columnas -->
                <td><button class="btn btn-primary" onclick="editData(${index})">Editar</button></td>
            </tr>`;
            tableBody.append(row);
        });
    }
}

// FunciÃ³n para editar datos
function editData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let person = listPeople[index];

    // Rellenar los campos de la ventana modal con los datos existentes
    $('#nombre').val(person.nombre);
    $('#telefono').val(person.telefono);
    // Rellena los demÃ¡s campos de la misma manera

    // Guardar el Ã­ndice del elemento a editar
    $('#editModal').data('index', index);

    // Mostrar la ventana modal
    $('#editModal').modal('show');
}

function saveDataToFile() {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));

    // Verificar si hay datos en el localStorage
    if (!listPeople || listPeople.length === 0) {
        alert("No hay datos guardados para exportar.");
        return;
    }

    // Obtener la fecha y hora actual
    let currentDate = new Date();
    let dateTimeString = currentDate.toLocaleString().replace(/[/\\?%*:|"<>]/g, '-'); // Reemplazar caracteres no permitidos en nombres de archivos

    // Construir el tÃ­tulo del archivo con la fecha y hora actual
    let fileName = 'llamadas' + dateTimeString + '.txt';

    // Construir el contenido del archivo de texto
    let textContent = "InformaciÃ³n Guardada:\n\n";
    listPeople.forEach(function (person) {
        textContent += "ID: " + person.id + "\n";
        textContent += "Nombre: " + person.nombre + "\n";
        textContent += "TelÃ©fono: " + person.telefono + "\n";
        textContent += "CÃ©dula: " + person.cedula + "\n";
        textContent += "Contrato: " + person.contrato + "\n";
        textContent += "Email: " + person.email + "\n";
        textContent += "DirecciÃ³n: " + person.direccion + "\n";
        textContent += "OE/Pedido: " + person.pedido + "\n";
        textContent += "Radicado: " + person.radicado + "\n";
        textContent += "SoluciÃ³n: " + person.solucion + "\n";
        textContent += "Resultado: " + person.resultado + "\n\n";
        textContent += "DescripciÃ³n: " + person.descripcion + "\n\n";
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

// Asignar la funciÃ³n saveDataToFile() al botÃ³n correspondiente
let saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveDataToFile);


// FunciÃ³n para mostrar la ventana modal de ediciÃ³n de datos
function showEditDataModal() {
    var editDataModal = new bootstrap.Modal(document.getElementById('editDataModal'));
    editDataModal.show();
}

// FunciÃ³n para guardar los cambios en la ediciÃ³n de datos
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
    // Obtener los demÃ¡s valores de los campos segÃºn sea necesario

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
     // Actualizar los demÃ¡s campos de la misma manera

    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    // Cerrar la ventana modal
    var editDataModal = new bootstrap.Modal(document.getElementById('editDataModal'));
    editDataModal.hide();

    // Actualizar la tabla despuÃ©s de editar los datos
    loadTable();
            }
