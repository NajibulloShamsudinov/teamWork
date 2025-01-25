const API = "http://localhost:3000/data";

let box = document.querySelector(".box");

//Add
// let btnAdd = document.querySelector(".btnAdd");
// let inpAddName = document.querySelector(".name");
// let inpAddAvatar = document.querySelector(".avatar");
let form = document.querySelector(".form1");

//Edit
let btnEdit = document.querySelector(".btnEdit");
let inpEditName = document.querySelector(".nameEdit");
let inpEditAvatar = document.querySelector(".avatarEdit");
let modal = document.querySelector(".dialog");

//search
let btnSearch = document.querySelector(".btnSearch");
let inpSearch = document.querySelector(".searchInp");

let select = document.querySelector(".select");

let dialog2 = document.querySelector(".dialog2");
let h1 = document.querySelector(".h1");

select.onclick = async (e) => {
  let value = e.target.value;
  if (value === "true") {
    try {
      let response = await fetch(`${API}?status=${true}`);
      let data = await response.json();
      getData(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (value === "false") {
    try {
      let response = await fetch(`${API}?status=${false}`);
      let data = await response.json();
      getData(data);
    } catch (error) {
      console.log(error);
    }
  }
  if (value === "All") {
    get();
  }
};

btnSearch.onclick = async () => {
  try {
    let response = await fetch(`${API}?name=${inpSearch.value}`);
    let data = await response.json();
    getData(data);
  } catch (error) {
    console.log(error);
  }
};

form.onsubmit = (event) => {
  event.preventDefault();

  let user = {
        name: form["name"].value,
        avatar: form["avatar"].value,
        status: false,
      };
      addData(user);
};

// btnAdd.onclick = () => {
//   let user = {
//     name: inpAddName.value,
//     avatar: inpAddAvatar.value,
//     status: false,
//   };
//   addData(user);
// };

async function addData(user) {
  try {
    let response = await axios.post(API, user)();
  } catch (error) {
    console.log(error);
  }
}

async function get() {
  try {
    let { data } = await axios.get(API);

    getData(data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id) {
  try {
    let response = await axios.delete(`${API}/${id}`);
    get();
  } catch (error) {
    console.log(error);
  }
}

let idx = null;
function openModal(e) {
  idx = e.id;
  modal.showModal();
  inpEditName.value = e.name;
  inpEditAvatar.value = e.avatar;
}

async function editData() {
  let editUser = {
    id: idx,
    name: inpEditName.value,
    avatar: inpEditAvatar.value,
    status: false,
  };
  try {
    let response = await axios.put(`${API}/${idx}`, editUser);
    get();
    modal.close();
  } catch (error) {}
}

btnEdit.onclick = editData;

async function getById(id) {
  try {
    let response = await fetch(`${API}/${id}`);
    let data = await response.json();
    console.log(data);
    dialog2.showModal();
    h1.innerHTML = data.name;
  } catch (error) {
    console.log(error);
  }
}

function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");

    let h1 = document.createElement("h1");
    h1.innerHTML = e.name;

    let imgTeg = document.createElement("img");
    imgTeg.src = e.avatar;
    imgTeg.alt = "Icon";

    let statusTeg = document.createElement("p");
    statusTeg.innerHTML = e.status ? "Active" : "Inactive";

    let btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    btnDelete.onclick = () => {
      deleteData(e.id);
    };

    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.onclick = () => {
      openModal(e);
    };

    let btnInfo = document.createElement("button");
    btnInfo.innerHTML = "Info";
    btnInfo.onclick = () => {
      getById(e.id);
    };

    div.append(h1, imgTeg, statusTeg, btnDelete, btnEdit, btnInfo);
    box.append(div);
  });
}

get();
