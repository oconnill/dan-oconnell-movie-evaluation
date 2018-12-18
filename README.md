Dan O'Connell Movie Evaluation

When the user goes to either: http://candidate-test.icapture.com/oconnelld/display.cfm http://candidate-test.icapture.com/oconnelld/display.php Or http://candidate-test.icapture.com:8082/display(.html)
a page should be displayed that shows 20 movies at a time sorted initially by “Vote Count” in descending order. Fields to be displayed are as follows:
● Title
● Release Date
● Vote Count
Clicking the column header in the table will sort the table on that column. Clicking the movie title in the table will AJAX load and display either a modal popup or change the view. If you want to use UI-Router you can just create a view. The view or modal popup will show details of the movie like description, image, etc. Use your own discretion on layout and design, but make it look nice.


Work Overview

1. Create boilerplate template for evaluation that includes a blank component, store, axios, vuex, bootstrap.

2. In vue store create requests from both endpoints. Create getter and setter functions for both full movie list and single movie modal view.

3. Create a mounted function on page load to call AJAX requests populating full movie list in the store.

4. Write a watcher / computed function to observe and update the DOM with any change in the movie data.

5. Create Html markup of a table and write a loop through the array of movie data from AJAX response to display in a html table.

6. Create an onclick function that takes the movie id as a callback and adds it as query string to the single movie request.

7. Build modal that is populated by the onclick function and displays the single movie response.

8. Add css styling for enhanced user experience navigating movie data.
