
Cecil King
Brooklyn Minor
Victor Sherman
Leah O’Gorman
# Project 1
The purpose of this project was to create a functional website using our knowledge pertaining to the criteria that has been taught thus far in the program. For this project, we as a group decided to fabricate a website that would search job-listings as well as related novels.
CSS describes how the HTML elements should be displayed; it is used to style an HTML file. The CSS properties are located in the style.css file.
Var statements create a variable that declares a value.
The console log is used for a variety of purposes. Primarily for debugging a variable or/and function. However, it is also used for printing errors related to the web application. This can be accessed by right clicking and selecting inspect, from there you can manage console. 
Event listener is used to create an event handler to a specific function. An add event listener is used to attach an event handler to a document. When a click function is utilized to run/start an event when a click function occurs. Query Selector is used to return the first child element that is in conjunction to a specified CSS.
```
document.querySelector("#searchBtn").addEventListener("click", function(event) {
    event.preventDefault();
    let search = searchInput.value.trim();
    
        console.log(search);
```

 
An Application Programming Interface (API) is a software that allows two applications to be compatible. In this case, we used an API for the job search and an API for the related books. 
```
// Jobs Results Function
function displayJobs( userInput ) {

    var apiID = "f79398ab";
    var apiKey = "6f3c4d62b7cf24c28993c2b466b44ea6";

    queryURL = "https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id="+ (apiID) + "&app_key="+ (apiKey) + "&results_per_page=5&what=" + userInput + "&content-type=application/json"
```
 
Ajax allows a web page to update by exchanging data with a webserver. Within this functional scope a value of let works similar to var, however variables declared by let are limited in a scope in which it used. Within this functional scope and that of the book result functional scope, a for loop is used to cycle through an array of job listings and related novels. 
```
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
              <h5 class="jobTitle text-wrap">${jobTitle}</h5>
              <a href="${jobLink}" target="_blank" class="card-text text-wrap">Link to Posting</a>
            </div>`
        
        )
        }
        })
 ``` 

The sidebar on the right-hand side of the webpage contains recent searches which are saved through the local storage, even following the refresh of the page.

In order for the search to be cleared from the local storage a clear function is implemented into the JS file. 
```
function clearAll(){
   localStorage.clear();
   document.querySelector("#search-list").innerHTML=""
   searchTerms = []
 }
 ```

After the website is complete the files are pushed through GitBash in the repository; project 1.  
