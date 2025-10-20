if (!localStorage.getItem("tab")) localStorage.setItem("tab", 0);
else
  bootstrap.Tab.getOrCreateInstance(
    document.querySelector(
      `button[data-tab-number="${localStorage.getItem("tab")}"`
    )
  ).show();
const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
tabs.forEach((tab) => {
  tab.addEventListener("shown.bs.tab", (e) => {
    localStorage.setItem("tab", e.target.dataset.tabNumber);
  });
});

getCustomers();
getCarModels();
getJobs();

function deleteButton(parent, path, id) {
  const button = document.createElement("button");
  button.classList.add("btn", "btn-danger");
  button.innerText = "Delete";
  button.addEventListener("click", () => {
    fetch("/" + path + "/" + id, {
      method: "DELETE",
    }).then(async (result) => {
      alert((await result.json()).msg);
      if (result.ok) {
        getCustomers();
        getCarModels();
        getJobs();
      }
    });
  });
  parent.appendChild(button);
}

function c(parent, tag, text) {
  const elem = document.createElement(tag);
  if (text) elem.innerText = text;
  parent.appendChild(elem);
  return elem;
}

async function createCustomer(e) {
  const result = await fetch("/customer", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const msg = (await result.json()).msg;
  alert(msg);
  if (result.ok) {
    e.target.reset();
    getCustomers();
  }
}

function getCustomers() {
  const customersTable = document.getElementById("customersTable");
  customersTable.innerHTML = "";
  fetch("/customer")
    .then((r) => r.json())
    .then((customers) => {
      for (const customer of customers) {
        const tr = c(customersTable, "tr");
        c(tr, "td", customer.id);
        c(tr, "td", customer.name);
        c(tr, "td", customer.address);
        c(tr, "td", customer.birthDate);
        c(tr, "td", customer.phone);
        deleteButton(c(tr, "td"), "customer", customer.id);
      }
    });
}

async function createCarModel(e) {
  const result = await fetch("/carmodel", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const msg = (await result.json()).msg;
  alert(msg);
  if (result.ok) {
    e.target.reset();
    getCarModels();
  }
}

function getCarModels() {
  const carModelTable = document.getElementById("carModelTable");
  carModelTable.innerHTML = "";
  fetch("/carmodel")
    .then((r) => r.json())
    .then((models) => {
      for (const model of models) {
        const tr = c(carModelTable, "tr");
        c(tr, "td", model.id);
        c(tr, "td", model.make);
        c(tr, "td", model.model);
        c(tr, "td", model.year);
        c(tr, "td", model.type);
        deleteButton(c(tr, "td"), "carmodel", model.id);
      }
    });
}

async function createJob(e) {
  const result = await fetch("/job", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const msg = (await result.json()).msg;
  alert(msg);
  if (result.ok) {
    e.target.reset();
    getJobs();
  }
}

function getJobs() {
  const jobTable = document.getElementById("jobTable");
  jobTable.innerHTML = "";
  fetch("/job")
    .then((r) => r.json())
    .then((jobs) => {
      for (const job of jobs) {
        const tr = c(jobTable, "tr");
        c(tr, "td", job.id);
        c(tr, "td", job.description);
        c(tr, "td", job.price);
        c(tr, "td", job.licensePlate);
        c(tr, "td", job.deadline);
        c(tr, "td", job.CustomerId);
        c(tr, "td", job.CarModelId);
        deleteButton(c(tr, "td"), "job", job.id);
      }
    });
}
