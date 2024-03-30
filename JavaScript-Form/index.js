let dataPersona = [];
let indexDniAeditar = -1;

let btnEditPerson = document.getElementById("btnEditPerson");
let btnCancelEdit = document.getElementById("btnCancelEdit");
let btnAgregar = document.getElementById("btnAgregar");

let listPerson = document.getElementById("listPerson");

let showAlertError = document.getElementById("showAlertError");
showAlertError.classList.add("d-none");

//ADD PERSON METHOD
function addDataPersona(dni, firstName, lastName, age, address, status) {
  let person = {
    dni,
    firstName,
    lastName,
    age,
    address,
    status,
  };
  dataPersona.push(person);
}

//ADD PERSON ONCLICK
const addFormPerson = () => {
  let dni = document.getElementById("dni");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let age = document.getElementById("age");
  let address = document.getElementById("address");
  let status = document.getElementById("status");

  if (dni == NaN) {
    alertMessage(3, "<b>DNI DEBE SER NUMERICO...</b>");
  } else {
    if (
      validateForm(dni.value) &&
      validateForm(firstName.value) &&
      validateForm(lastName.value) &&
      validateForm(address.value) &&
      validateForm(age.value)
    ) {
      if (filterDni(dni.value) == -1) {
        addDataPersona(
          dni.value,
          firstName.value,
          lastName.value,
          age.value,
          address.value,
          parseInt(status.value)
        );
        document.getElementById("person").reset();
        dni.focus();
        showDataPerson(dataPersona);
        alertMessage(1, "<b>DATOS GUARDADOS...</b>");
      } else {
        alertMessage(3, "<b>DNI YA EXISTE...</b>");
      }
    } else {
      alertMessage(3, "<b>NO DEJAR CAMPOS VACIOS...</b>");
    }
    toggleAlert();
    storageDataPerson();
  }
};

// EDIT ONCLICK
const editFormPerson = () => {
  nroDni = document.getElementById("dni").value;

  let dniInput = document.getElementById("dni");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let age = document.getElementById("age");
  let address = document.getElementById("address");
  let status = document.getElementById("status");

  if (
    validateForm(dni.value) &&
    validateForm(firstName.value) &&
    validateForm(lastName.value) &&
    validateForm(address.value) &&
    validateForm(age.value)
  ) {
    let indexDniInput = filterDni(dniInput.value);

    if (indexDniInput == -1 || indexDniInput == indexDniAeditar) {
      dataPersona[indexDniAeditar].dni = dniInput.value;
      dataPersona[indexDniAeditar].firstName = firstName.value;
      dataPersona[indexDniAeditar].lastName = lastName.value;
      dataPersona[indexDniAeditar].age = age.value;
      dataPersona[indexDniAeditar].address = address.value;
      dataPersona[indexDniAeditar].status = status.value;

      alertMessage(3, "<b>DATOS MODIFICADOS...</b>");
      showDataPerson(dataPersona);
      cancelEdit();
      toggleAlert();
    } else {
      alertMessage(3, "<b>DNI YA EXISTE...</b>");
    }
  } else {
    alertMessage(3, "<b>NO DEJAR CAMPOS VACIOS...</b>");
  }
};

//FINDINDEX DNI. devuelve el index del dni ingresado por parametro.
let filterDni = (nroDni) => {
  return dataPersona.findIndex((person) => {
    return person.dni == parseInt(nroDni);
  });
};

//VALIDATE FORM
const validateForm = (data) => {
  return data != "";
};

//LOAD DATA ON THE FORM INPUTS
const loadData = (dni) => {
  let dataindex = filterDni(dni);
  let person = dataPersona[dataindex];

  let dniInput = document.getElementById("dni");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let age = document.getElementById("age");
  let address = document.getElementById("address");
  let status = document.getElementById("status");

  dniInput.value = person.dni;
  firstName.value = person.firstName;
  lastName.value = person.lastName;
  age.value = person.age;
  address.value = person.address;
  status.value = person.status;

  indexDniAeditar = dataindex;
  showHideBtn(true);
};

//DISPLAY DATA ON TABLE
const showDataPerson = (unArrayPersona) => {
  listTable = "";
  if (dataPersona.length > 0) {
    unArrayPersona.forEach((person, position) => {
      let status = statusPerson(person.status);
      listTable += `
    <tr id="person${position}">
    <td>${person.dni}</td>
    <td>${person.firstName} ${person.lastName}</td>
    <td>${person.age}</td>
    <td>${person.address}</td>
    <td>${status}</td>
    <td class="container" id="btns"> 
    <button type="button" id="btnEdit${position}" class="btn btn-primary" onclick="loadData(${person.dni})">Editar</button>
    <button type="button" id="btnDelete${position}" class="btn btn-danger" onclick="deletePerson(${position})">Eliminar</button>
    </td></tr>
    `;
    });
  } else {
    listTable += `<tr><td colspan="6" class="text-center">No hay registros.</td></tr>`;
  }
  listPerson.innerHTML = "";
  listPerson.innerHTML += listTable;
};

//CANCEL
const cancelEdit = () => {
  document.getElementById("person").reset();
  dni.focus();
  showHideBtn(false);
};

//DELETE
const deletePerson = (nro) => {
  dataPersona.splice(nro, 1);
  showDataPerson(dataPersona);
  document.getElementById("person").reset();

  showHideBtn(false);
  alertMessage(1, "<b> PERSONA ELIMINADA CORRECTAMENTE. <b>");
  toggleAlert();
};

//STATUS VALUE
const statusPerson = (status) => {
  if (status == 0) {
    return "Inactivo";
  } else if (status == 1) {
    return "En Proceso";
  } else if (status == 2) {
    return "Concluido";
  } else {
    return "Activo";
  }
};

//FILTER PERSON SEARCHBAR
let filterPerson = () => {
  let searchInput = document.getElementById("search").value;
  //
  let filterArray = dataPersona.filter((person) => {
    return (
      person.firstName.toLowerCase().includes(searchInput) ||
      person.lastName.toLowerCase().includes(searchInput)
    );
  });

  if (searchInput.length > 0) {
    if (filterArray.length < 1) {
      listPerson.innerHTML = "";
      listPerson.innerHTML = `<tr><td colspan="6" class="text-center">No hay registros que coincidan con su búsqueda.</td></tr>`;
    } else {
      showDataPerson(filterArray);
    }
  } else {
    showDataPerson(dataPersona);
  }
};

//ALERT MESSAGE
const alertMessage = (type, message) => {
  "alert-danger alert-success alert-info alert-warning";
  showAlertError.removeAttribute("class");
  switch (type) {
    case 1:
      showAlertError.innerHTML = message;
      showAlertError.classList.add("alert-success", "alert");
      break;
    case 2:
      showAlertError.innerHTML = message;
      showAlertError.classList.add("alert-info", "alert");
      break;
    case 3:
      showAlertError.innerHTML = message;
      showAlertError.classList.add("alert-warning", "alert");
      break;
    default:
      break;
  }
};

//TOGGLE ALERT
const toggleAlert = () => {
  setTimeout(() => {
    showAlertError.classList.add("d-none");
  }, 2000);
};

//SHOW HIDDEN BUTTON
const showHideBtn = (active = false) => {
  if (active) {
    btnAgregar.classList.add("d-none");
    btnEditPerson.classList.remove("d-none");
    btnCancelEdit.classList.remove("d-none");
  } else {
    btnAgregar.classList.remove("d-none");
    btnEditPerson.classList.add("d-none");
    btnCancelEdit.classList.add("d-none");
  }
};

//LOCAL STORAGE
const storageDataPerson = () => {
  let arrayPerson = JSON.stringify(dataPersona);
  localStorage.setItem("person", arrayPerson);
};

const getStorageDataPerson = () => {
  if (localStorage.getItem("person") != null) {
    let arrayPerson = localStorage.getItem("person");
    arrayPerson = JSON.parse(arrayPerson);
    dataPersona = arrayPerson;
    showDataPerson(dataPersona);
  }
};

getStorageDataPerson();
