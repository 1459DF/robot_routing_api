const express = require('express');
const request = require('request');
const app = express();
const PORT = 8000;

app.use(express.json());

app.listen(
    PORT
)

let robot_state = {};

// Example: http://localhost:8000/robot_routing?loadId=123&x=50&y=50

app.get('/robot_routing/',(req,res) => {

    const {loadId,x,y} = req.query;
    new Promise(function (resolve, reject) {
        request('https://60c8ed887dafc90017ffbd56.mockapi.io/robots', function (error, response, body) {
            if(!error && response.statusCode == 200){
                let res = JSON.parse(body);
                robot_state = res;
                // console.log(robot_state);
                resolve();
            }
            else{
                console.log(error);
                reject();
            }
        });
    }).then(function () {

        let minrobot = helper(robot_state,x,y);

        res.status(200).send({
        robotId: minrobot.robotId,
        distanceToGoal: Math.sqrt(Math.pow(minrobot.x - x,2) + Math.pow(minrobot.y - y,2)), //Indicates how far the robot is from the load which needs to be moved.
        batteryLevel: minrobot.batteryLevel //Indicates current battery level of the robot.
        })
    });
})


function helper(robot_state,x,y){
    let mindis = Number.MAX_VALUE;
    let minrobot = {}; 
    let candidate = [];

    for (let robot of robot_state){
        let dis = Math.sqrt(Math.pow(robot.x - x,2) + Math.pow(robot.y - y,2));
        if(dis < mindis){
            mindis = dis;
            minrobot = robot;
        }
        if(dis < 10){
            candidate.push(robot);
        }
    }
    console.log(candidate);
    if(candidate.length > 0){
        let maxbattery = Number.MIN_VALUE;
        for (let robot of candidate){
            if(robot.batteryLevel > maxbattery){
                maxbattery = robot.batteryLevel;
                minrobot = robot;
            }
        }
    }
    return minrobot;
}    

