var express = require('express');
var router = express.Router();


var start = Date.now();
var call = 0;

// The endpoint for base URL.
router.get('/',(req, res)=> {
   return res.status(200).send("Welcome");
})

// The endpoint for calculating age.
router.get('/howwold', (req, res)=>{
    var check = dateIsValid(req.body.birth);
    if (check){
        call ++;
        var call_time = Date.now() - start;
        var t_sec = Math.floor(call_time / 1000);
        if(call <= 3){
            if (t_sec >= 1) { 
                call = 1;
                start = Date.now();
                t_sec = 0;
            } 
            var cal_age = calculate_age(req.body.birth);
            var response = "Age:"+cal_age; 
        } else{  
            if (t_sec >= 1) { 
                call = 1;
                start = Date.now();
                t_sec = 0;
                var cal_age = calculate_age(req.body.birth);
                var response = "Age:"+cal_age; 
            } else{
                var response = "wait ..........";
            } 
        }

        return res.status(200).send(response);
    }
    return res.status(400).send("Date of birth is invalid");
})

module.exports = router;


function calculate_age(birth)
 {
    var dob = new Date(birth);
    var today = new Date();

    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate()+1)) 
    {
        age--;
    }
    return age;
 }


function dateIsValid(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
      
    if (dateStr.match(regex) === null) {
        return false;
    }
      
    return true;
}