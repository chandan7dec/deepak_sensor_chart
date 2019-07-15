const express = require('express');
const app = express();

app.get('/', function (req, res) {
    fs = require('fs')
    fs.readFile('binary.bin', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        const buf = Buffer.from(data, 'ascii');
        //converting string into buffer
        var hexvalue = buf.toString('hex');
        //with buffer, convert it into hex
        var array = hexvalue.split("4040");
        var eachArray;
        var jsonArr = [];

        /* for (i=1; i<20; i++){
             console.log(array[i]);
         } */

        for (i = 1; i < 80; i++) {

            eachArray = array[i].split("2323");
            for (j = 0; j < 10; j++) {
                if (typeof (eachArray[1]) != 'undefined' && eachArray[1].length > 100) {
                    var chrtTime = "0x" + eachArray[0].slice(1);
                    jsonArr.push({

                        // time: "0x" + eachArray[0].slice(1),
                        /*
                        point: eachArray[1].substring(0 + (14 * j), 2 + (14 * j))
                        */

                        time: parseInt("0x" + eachArray[0].slice(1)),
                        //time: eachArray[0],
                        //time: (new Date(chrtTime)).toUTCString(),
                        point: parseInt("0x" + eachArray[1].substring(0 + (14 * j), 2 + (14 * j)))

                    });

                }

            }
        }

        res.json(jsonArr);
    });

})


app.get("/chart", function (req, resp) {
    fs = require('fs')
    fs.readFile("GoogleChart1.html", function (error, pgResp) {
        if (error) {
            resp.writeHead(404);
            resp.write('Contents you are looking are Not Found');
        } else {
            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write(pgResp);
        }

        resp.end();
    });
})




app.listen(3000, function () {
    console.log('Example of app listing at port no 3000');
})