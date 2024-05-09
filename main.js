document.querySelectorAll('.copyButton').forEach(function (button) {
      button.addEventListener('click', function() {
        var inputField = this.parentNode.querySelector('input');
        if (inputField) {
          navigator.clipboard.writeText(inputField.value)
            .then(function() {
              console.log('Contenido copiado al portapapeles: ' + inputField.value);
            })
            .catch(function(error) {
              console.error('Error al copiar al portapapeles: ', error);
            });
        }
      })
    });

    document.querySelectorAll('.pasteButton').forEach(function(button) {
      button.addEventListener('click', function() {
        var inputField = this.parentNode.querySelector('input');
        if (inputField) {
          navigator.clipboard.readText()
            .then(function(clipboardText) {
              inputField.value = clipboardText;
              console.log('Contenido pegado del portapapeles: ' + clipboardText);
            })
            .catch(function(error) {
              console.error('Error al pegar desde el portapapeles: ', error);
            });
        }
      })
    });


// Función para leer los datos almacenados
function ReadData() {
    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    // Dentro de la función ReadData(), donde se construye el HTML para agregar al principio del formulario
    // Estructura HTML para la tabla
    var html = "";
        html += "<tr>";
        html += "<th>ID</th>"; // Agregamos el encabezado para el campo ID
        html += "<th>Nombre</th>";
        html += "<th>Teléfono</th>";
        html += "<th>Cédula</th>"; // Agregamos el encabezado para el campo Cédula
        html += "<th>Contrato</th>"; // Agregamos el encabezado para el campo Contrato
        html += "<th>Email</th>"; // Agregamos el encabezado para el campo Email
        html += "<th>Dirección</th>"; // Agregamos el encabezado para el campo Dirección
        html += "<th>OE/Pedido</th>"; // Agregamos el encabezado para el campo OE/Pedido
        html += "<th>Radicado</th>"; // Agregamos el encabezado para el campo Radicado
        html += "<th>Solución</th>"; // Agregamos el encabezado para el campo Solución
        html += "<th>Resultado</th>";
        html += "<th>Descripción</th>"; // Agregamos el encabezado para el campo Descripción
        html += "<th>Acciones</th>";
        html += "</tr>";
    listPeople.forEach(function (element, index) {
        // Agregando los valores para la fila de la tabla dentro del bucle forEach
        html += "<tr>";
        html += "<td>" + element.id + "</td>"; // Agregamos el valor del campo ID
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.telefono + "</td>";
        html += "<td>" + element.cedula + "</td>"; // Agregamos el valor del campo Cédula
        html += "<td>" + element.contrato + "</td>"; // Agregamos el valor del campo Contrato
        html += "<td>" + element.email + "</td>"; // Agregamos el valor del campo Email
        html += "<td>" + element.direccion + "</td>"; // Agregamos el valor del campo Dirección
        html += "<td>" + element.pedido + "</td>"; // Agregamos el valor del campo OE/Pedido
        html += "<td>" + element.radicado + "</td>"; // Agregamos el valor del campo Radicado
        html += "<td>" + element.solucion + "</td>"; // Agregamos el valor del campo Solución
        html += "<td>" + element.resultado + "</td>";
        html += "<td>" + element.descripcion + "</td>"; // Agregamos el valor del campo Descripción
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar Datos</button> <button onclick="editData(' + index + ')" class="btn btn-warning">Editar Datos</button></td>';
        html += "</tr>";

    });
    document.querySelector('#tableData').innerHTML = html;
}

// Al cargar la página, leer los datos almacenados
document.onload = ReadData();

// Función para agregar datos
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
        
        var listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }
        // Verificar si al menos uno de los campos obligatorios está lleno
    if (id || telefono || nombre || cedula || contrato || email || direccion || pedido || radicado || solucion || resultado || descripcion) {
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
            descripcion: descripcion
        });
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        alert("Se ha guardado correctamente");

         ReadData();

        // Limpiar los campos después de agregar datos
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
    } else {
        alert("Por favor complete al menos uno de los campos obligatorios.");
    }
}

// Función para eliminar datos
function deleteData(index) {
    if (confirm("¿Estás seguro de que quieres borrar este elemento?")) {
        let listPeople = JSON.parse(localStorage.getItem('listPeople'));
        listPeople.splice(index, 1);
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        ReadData(); // Actualizar la tabla después de eliminar los datos
    }
}

// Función para cargar los datos en la tabla
function loadTable() {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let tableBody = $('#tablaEjemplo tbody');
    tableBody.empty(); // Limpiar contenido anterior

    if (listPeople) {
        listPeople.forEach(function(person, index) {
            let row = `<tr>
                <td>${person.nombre}</td>
                <td>${person.telefono}</td>
                <!-- Agrega aquí las celdas de las otras columnas -->
                <td><button class="btn btn-primary" onclick="editData(${index})">Editar</button></td>
            </tr>`;
            tableBody.append(row);
        });
    }
}

// Función para editar datos
function editData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let person = listPeople[index];

    // Rellenar los campos de la ventana modal con los datos existentes
    $('#nombre').val(person.nombre);
    $('#telefono').val(person.telefono);
    // Rellena los demás campos de la misma manera

    // Guardar el índice del elemento a editar
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

    // Construir el título del archivo con la fecha y hora actual
    let fileName = 'datos_guardados_' + dateTimeString + '.txt';

    // Construir el contenido del archivo de texto
    let textContent = "Información Guardada:\n\n";
    listPeople.forEach(function (person) {
        textContent += "ID: " + person.id + "\n";
        textContent += "Nombre: " + person.nombre + "\n";
        textContent += "Teléfono: " + person.telefono + "\n";
        textContent += "Cédula: " + person.cedula + "\n";
        textContent += "Contrato: " + person.contrato + "\n";
        textContent += "Email: " + person.email + "\n";
        textContent += "Dirección: " + person.direccion + "\n";
        textContent += "OE/Pedido: " + person.pedido + "\n";
        textContent += "Radicado: " + person.radicado + "\n";
        textContent += "Solución: " + person.solucion + "\n";
        textContent += "Resultado: " + person.resultado + "\n\n";
        textContent += "Descripción: " + person.descripcion + "\n\n";
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

// Asignar la función saveDataToFile() al botón correspondiente
let saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveDataToFile);


// Función para mostrar la ventana modal de edición de datos
function showEditDataModal() {
    var editDataModal = new bootstrap.Modal(document.getElementById('editDataModal'));
    editDataModal.show();
}

// Función para guardar los cambios en la edición de datos
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
    // Obtener los demás valores de los campos según sea necesario

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
     // Actualizar los demás campos de la misma manera

    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    // Cerrar la ventana modal
    var editDataModal = new bootstrap.Modal(document.getElementById('editDataModal'));
    editDataModal.hide();

    // Actualizar la tabla después de editar los datos
    loadTable();
}
