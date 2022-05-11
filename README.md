# robot_routing_api
This api is based on node.js and express.js

I depoly the api on heroku so the api can be accessed by:
https://robot-routing.herokuapp.com/robot_routing?loadId=123&x=50&y=50 (replace the loadId,x and y to see result)

Local run:

1.git clone the code

2.in the terminal:npm install (although I include all the node modules without using gitignore)

3.in the terminal:node server.js

4.GO TO: http://localhost:8000/robot_routing?loadId=123&x=50&y=50  (replace the loadId,x and y to see result)

normally I should use the request body to convey the parameters. However, to show the result quickly I choose to include the parameters in the query.



Description of what features, functionality, etc. you would add next and how you would implement them:

1. I would add a user interface(using either react or Vue) to make the api easy to use.(since the requirement is to make a api so I skiped that)

2. I think the function should be able to determine it is possible for the robot to get the load with the remaining battery.

3. If the function ask me to return the top 5 or top 10 close then evaluate the battery, I would use a heap structure to store the data.
