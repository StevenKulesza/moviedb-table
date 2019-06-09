# AM Developer Challenge - Frontend
Written in React 

## Usage
`npm install`
`npm start`


#### Data

The data used for this challenge will be from the https://www.themoviedb.org/ API. The key required for calling this API will be provided to you. Please see https://developers.themoviedb.org/3/getting-started/introduction for further API documentation.

#### Code
The backend and full-stack challenges should be written with node.js. The *full-stack* or *front-end* challenge should be written using either Vue, React, or any other front end framework that you are familiar with for the front-end framework if applicable.

## Front-End Challenge
*NOTE:* the front-end portion does not need a server or a Database, CRUD ops should only affect state on the front-end. Do not use any open-source code for the UI components in your application, but you can use open-source for anything that is not an UI component.

* Use the Top Rated API to get the first few pages of data, and store it locally in the Web Application, on startup of the application https://developers.themoviedb.org/3/movies/get-top-rated-movies
* Create a Custom Table Component *(Movie Table)* for showing the movies
	* Title
	* Vote Count
	* Average Vote
	* Popularity
	* Poster (use https://image.tmdb.org/t/p/w370_and_h556_bestv2/{key})
	* Overview
	* Favorite
	* Delete
* Allow for sorting of Strings and Number columns only
* Add a Delete button to the table for each cell, that will delete that row of information and not display it again(unless the user refreshes the application)
* Add a checkmark for setting a Boolean for selecting the favorite movies
* The column for displaying the vote average should be editable (because the user wishes to have this power). Clicking on it will change the cell to an input that allows you to insert and change the vote_average for the movie
* Create a Second Table *(The Favorite Table)* showing the selected movies that have a checkmark in the first table, or have a vote_average of 7 or more
	* shows the same data as the first except delete
* Add a checkmark here to remove them from this list, and correspondingly uncheck the checkmark in the Movie table
* This table is sorted by the vote average whenever the amount changes re-sort the Favorite Table
* If the vote_average is above a 7 then no matter what the movie is added to the Favorites list (overrides the checkmark to add them here)

## Hints

* Do your best to impress us.
* Expect us to Lint your javascript.
* Form is as important as function.  If your app works, but is written like a website from 2001, that would be bad.
* We're suckers for new technologies (i.e. Vue, React, Angular, media queries, Handlebars).
* Creativity: Don't like our requirements? Feel free to enhance this app as you see fit.
* Feel free to host the app somewhere (Azure, EC2, S3, AppHarbor, etc)
