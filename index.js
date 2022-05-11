const express = require('express');
const request = require('request');
const app = express();
const PORT = 8000;

app.use(express.json());

app.listen(
    PORT
)

let robot_state = {};

request('https://60c8ed887dafc90017ffbd56.mockapi.io/robots', function (error, response, body) {
    if(!error && response.statusCode == 200){
        let res = JSON.parse(body);
        robot_state = res;
        console.log(robot_state);
      }
    else{
        console.log(error);
    }
});

app.get('/robot_routing',(req,res) => {
    res.status(200).send({
        robotId: 58,
        distanceToGoal: 49.9, //Indicates how far the robot is from the load which needs to be moved.
        batteryLevel: 30 //Indicates current battery level of the robot.
    })

})