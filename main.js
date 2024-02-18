//funcion copiar y pegar de los botones de la derecha de los labels    
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

// Función para validar el formulario
function ValidateForm() {
    var inputs = document.getElementsByClassName("form-control");
    var isValid = true;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            document.getElementById("error").innerHTML += "El campo " + inputs[i].id + " no puede estar vacío.\n";
            inputs[i].style.borderColor = "#E34244";
            isValid = false;
        }
    }
    return isValid;
}

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
    if (ValidateForm()) {
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
        let descripcion = document.getElementById('floatingTextarea').value;
        
        var listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }
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
            descripcion:descripcion
        });
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        alert("Se ha guardado correctamente");

        ReadData();

        // Limpiar los campos después de agregar datos
        document.getElementById('InputLlamada').value;
        document.getElementById('InputPhone').value;
        document.getElementById('InputName').value;
        document.getElementById('InputCC').value;
        document.getElementById('InputContrato').value;
        document.getElementById('InputEmail').value;
        document.getElementById('InputDireccion').value;
        document.getElementById('InputPedido').value;
        document.getElementById('InputRadicado').value;
        document.getElementById('InputSolucion').value;
        document.getElementById('InputResultado').value;
        document.getElementById('floatingTextarea').value;
 
    }
}

// Función para eliminar datos
function deleteData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    ReadData(); // Actualizar la tabla después de eliminar los datos
}

// Función para editar datos (esto es solo un ejemplo, puedes adaptarlo según tus necesidades)
function editData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let nombre = prompt("Ingrese el nuevo nombre:", listPeople[index].nombre);
    let telefono = prompt("Ingrese el nuevo teléfono:", listPeople[index].telefono);
    let cedula = prompt("Ingrese la nueva cédula:", listPeople[index].cedula);
    let contrato = prompt("Ingrese el nuevo contrato:", listPeople[index].contrato);
    let email = prompt("Ingrese el nuevo email:", listPeople[index].email);
    let direccion = prompt("Ingrese la nueva dirección:", listPeople[index].direccion);
    let pedido = prompt("Ingrese el nuevo OE/Pedido:", listPeople[index].pedido);
    let radicado = prompt("Ingrese el nuevo radicado:", listPeople[index].radicado);
    let solucion = prompt("Ingrese la nueva solución:", listPeople[index].solucion);
    let resultado = prompt("Ingrese el nuevo resultado:", listPeople[index].resultado);
    let descripcion = prompt("Ingrese la nueva descripción:", listPeople[index].descripcion);
    
    listPeople[index] = {
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
    };
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    ReadData(); // Actualizar la tabla después de editar los datos
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
        textContent += "Nombre: " + person.nombre + "\n";
        textContent += "Teléfono: " + person.telefono + "\n";
        textContent += "Cédula: " + person.cedula + "\n";
        textContent += "Contrato: " + person.contrato + "\n";
        textContent += "Email: " + person.email + "\n";
        textContent += "Dirección: " + person.direccion + "\n";
        textContent += "OE/Pedido: " + person.pedido + "\n";
        textContent += "Radicado: " + person.radicado + "\n";
        textContent += "Solución: " + person.solucion + "\n";
        textContent += "Resultado: " + person.resultado + "\n";
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
