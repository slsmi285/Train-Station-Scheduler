
# Firebase-Train-Station-Scheduler
Creating a train schedule application that incorporates Firebase to host arrival and departure data. The app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.
- - -
BASIC REQUIREMENTS IN CREATING THIS APP:
* Make sure that the app suits this basic spec:
  * When adding trains, administrators should be able to submit the following:
    * Train Name
    * Destination 
    * First Train Time -- in military time
    * Frequency -- in minutes
  * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  * Users from many different machines must be able to view same train times.
  * Styling and theme can be anything. Get Creative!

### Bonus (Extra Challenges)
* Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
* Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
* As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.


