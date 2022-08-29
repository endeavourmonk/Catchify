let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
// alert("The URL of this page is: " + window.location.href);
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn = document.getElementById("delete-btn");
const urlBtn = document.getElementById("url-btn");

if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}

inputBtn.addEventListener("click", function () {
  (inputEl.value == ['']) ? alert("Please enter url") : myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});

deleteBtn.addEventListener("click", function(){
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
  // alert("all leads deleted successfully");
})

urlBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads(myLeads);
  })
  // alert("url added successfullylist
})

function renderLeads(list) {
  let listItems = "";
  listItems = `<b>Total items :- ${list.length}</b><hr>`;
  for (let i = 0; i < list.length; i++)
    listItems += `
    <li>
        <a target = '_blank' href='${list[i]}'> ${list[i]}</a>
    </li>`;
  ulEl.innerHTML = listItems;
}