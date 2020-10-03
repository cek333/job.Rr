// Refresh Button
// Search Function
var titleBtn = document.getElementById("titleBtn")
var searchBtn = document.getElementById("searchBtn");
var bookBox = document.getElementById("bookResults")
var jobBox = document.getElementById("jobResults")
var searchBox = document.getElementById("searchBox")
var header = document.getElementById("header")
var results = document.getElementById("results")
var msgDiv = document.querySelector("#message")
var sideBar = document.querySelector("sidebar")
var searchTerms;
var firstSearch = true;

searchBtn.addEventListener('click', function(){
   console.log("hi there")
   if (firstSearch) {
    searchBox.style.left = "50%"
    searchBox.style.top = "-785px"
    searchBox.style.height = "20px"
    results.style.display = "grid"
    sideBar.style.marginTop = "0px"
    firstSearch = false;
  }
});

var searchInput = document.querySelector("#searchBar");
var searchBtn = document.querySelector("#searchBtn");
var searchRecommendationSpan = document.querySelector(".search-recommendations");

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

function loadSearchTerms() {
   searchTerms = localStorage.search ? JSON.parse(localStorage.search) : [];
   //  document.querySelector("#search-list").innerHTML+=`
   //     <button type="button" class="btn btn-warning" onClick="clearAll()">Clear All</button>`
   for(let i=0; i < searchTerms.length; i++) {
    document.querySelector("#search-list").innerHTML+=`
              <button class="btn btn-info mb-2" onclick="sideBarSearch('${searchTerms[i]}')">${searchTerms[i]}</button>`
   }
}

function sideBarSearch( search ) {
  if (firstSearch) {
    searchBox.style.left = "50%"
    searchBox.style.top = "-780px"
    // searchBox.style.height = "20px"
    results.style.display = "grid"
    firstSearch = false;
  }
  displayJobs(search);
  displayBooks(search);
}

document.querySelector("#searchBtn").addEventListener("click", function(event) {
    event.preventDefault();
    let search = searchInput.value.trim();
    
        console.log(search);
    
        if (search === "") {
            displayMessage("error", "Search cannot be blank");
        } else {
            displayMessage("success", "Search successful");
            if (searchTerms.indexOf(search)<0) {
              // new search term
              searchTerms.push(search);
              localStorage.setItem("search", JSON.stringify(searchTerms));
              
              //var lastSearch = JSON.parse(localStorage.getItem("search"));
              //searchRecommendationSpan.textContent = lastSearch.search;
              document.querySelector("#search-list").innerHTML+=`
              <button class="btn btn-info mb-2" onclick="sideBarSearch('${search}')">${search}</button>`
            }
            displayJobs(search);
            displayBooks(search);
        }

    });

// Jobs Results Function
function displayJobs( userInput ) {

    var apiID = "f79398ab";
    var apiKey = "6f3c4d62b7cf24c28993c2b466b44ea6";

    queryURL = "https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id="+ (apiID) + "&app_key="+ (apiKey) + "&results_per_page=5&what=" + userInput + "&content-type=application/json"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (result){
          console.log(result);
          $("#job-options").text("");
          for(i=0; i<result.results.length; i++){
        //   document.querySelector("#jobtitle").innerHTML += result.results[i].title
        //   console.log(result.results[i].title)
        //   document.querySelector("#joblink").innerHTML += result.results[i].redirect_url
          //Job title
        let jobTitle = result.results[i].title;
        //Job posting
        let jobLink = result.results[i].redirect_url;
        $("#job-options").append(
          `<div id="job-options">
              <h5 class="jobTitle text-wrap"><a href="${jobLink}" target="_blank" class="card-text text-wrap">${jobTitle}</a></h5>
            </div>`
        )
        }
        })
}

// Book Results Function
 function displayBooks( subject ) {
   let bookURL = `https://openlibrary.org/subjects/${subject}.json?published_in=2000-2020&limit=20`;
   $.ajax({
     url: bookURL,
     method: "GET"
   }).then(function(response) {
     let rDbg = response;
     console.log(rDbg);
     $('#book-rr').text("");
     let newBookDiv;
     for (let idx=0; idx < response.works.length; idx++) {
       // Book title
       let title = response.works[idx].title;
       // Book authors
       let authors;
       if (response.works[idx].authors.length > 0) {
          authors = response.works[idx].authors[0].name;
          // Add additional authors if any
          for (let jdx=1; jdx < response.works[idx].authors.length; jdx++) {
              authors += ` & ${response.works[idx].authors[jdx].name}`;
          }
       }
       // Book image
       let olid = response.works[idx].cover_edition_key;
       if (olid == null) {
         console.log(`[displayBooks] No book image for ${title}. Skipping ...`);
       } else {
         let bookUrl = `https://openlibrary.org/books/${olid}`;
         let imgUrl = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
         // Add to html. 
         $('#book-rr').append(`
         <div id="book-rr">
         <h5 class="bookTitle text-wrap">${title}</h5>
         <p class="authorName text-wrap">${authors}</p>
         <a href="${bookUrl}" target="_blank"><img src="${imgUrl}" class="img-thumbnail" alt="Book Image"></a></div>`); 
       } 
     }
   });
 }

 loadSearchTerms();




 function clearAll(){
   localStorage.clear();
   document.querySelector("#search-list").innerHTML=""
   searchTerms = []
 }
