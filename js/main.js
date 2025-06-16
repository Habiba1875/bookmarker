siteName = document.getElementById("siteName")
siteURL = document.getElementById("siteURL")
tableContent = document.getElementById("tableContent")
var sites = JSON.parse(localStorage.getItem("sites")) || []
displaySites()
function addSite() {
  if (validation(siteName) && validation(siteURL)) {
    var site = {
      sName: siteName.value,
      sURL: siteURL.value
    }
    if (!site.sURL.includes("https://") || !site.sURL.includes("http://")) {
      site.sURL = "https://" + site.sURL
    }
    sites.push(site)
    localStorage.setItem("sites", JSON.stringify(sites))
    displaySites()
    clearAll()
   }

}
function displaySites() {
  box = ''
  for (var i = 0; i < sites.length; i++) {
    if (i == 0) {
      box += `
       <div class="row main-row pt-2 d-flex align-items-center">
        <div class="col-3">
          <h6 class="fw-bold">Index</h6>
        </div>
        <div class="col-3">
          <h6 class="fw-bold">Website Name</h6>
        </div><div class="col-3">
          <h6 class="fw-bold">Visit</h6>
        </div>
        <div class="col-3">
          <h6 class="fw-bold">Delete</h6>
        </div>
      </div>
      `
    }
    box += `<div class="row d-flex align-items-center">
        <hr>
        <div class="col-3">
          <h6>${i + 1}</h6>
        </div>
        <div class="col-3">
          <h6>${sites[i].sName}</h6>
        </div>
        <div class="col-3">
          <a href="${sites[i].sURL}" target="_blank" class="btn btn-success">
              <i class="fa-solid fa-eye"></i>
              Visit
          </a>        
        </div>
        <div class="col-3">
          <button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </div>
      </div>`
  }
  tableContent.innerHTML = box

}
function clearAll() {
  siteName.value = ""
  siteURL.value = ""
}
function deleteSite(Index){
  sites.splice(Index,1)
  localStorage.setItem("sites",JSON.stringify(sites))
  displaySites()
}
function validation(input){
  var regex ={
    siteName:/^[a-zA-z0-9]{3,}$/,
    siteURL:/^[a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{2,}/
  }
  if (regex[input.id].test(input.value))
  {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  }
  else{
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }

}
siteName.addEventListener("input",function(){
  validation(siteName)
})
siteURL.addEventListener("input",function(){
  validation(siteURL)
})