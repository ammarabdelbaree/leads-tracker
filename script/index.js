let myLeads = [];
const inputEl = document.getElementById("input-el"); // Can't reassign
const inputBtn = document.getElementById("input-btn");
const leadEl = document.getElementById("leads");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");
const myLeadsValues = JSON.parse(localStorage.getItem("myLeads"));

if (myLeadsValues) {
  myLeads = myLeadsValues;
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = "";
  render(myLeads);
});

delBtn.addEventListener("click", function () {
  clear(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a>" + "</li>";

    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">
          ${leads[i]}
        </a>
      </li>
    `;

    // leadEl.innerHTML += "<li>" + leads[i] + "</li>"; // innerHTML => to type in HTML
    // create element
    // set text content
    // append to element

    // const li = document.createElement("li");
    // li.textContent = leads[i];
    // leadEl.append(li);
  }
  leadEl.innerHTML = listItems;
}

function clear(leads) {
  localStorage.clear();
  leads = [];
  render(leads);
}

// 6:35:12
