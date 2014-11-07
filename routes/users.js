var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connectionInfo = {
    host     : 'localhost',
    user     : 'root',
    password : 'letmein'
};

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('users', {title: "" });
});

/* json get users */
router.get('/json',function(req,res,next){
    var connection = mysql.createConnection(connectionInfo);
    connection.connect();
    connection.query('select name from test.node_test', function(err, rows, fields) {
        if (err) throw err;
        var tempNames = new Array();
        for(var i=0;i<rows.length;i++){
            var nameOne =[];
            nameOne.push(rows[i].name);
            tempNames.push(nameOne);
        }
        res.json({"data":tempNames});
});

    connection.end();
});

/* To add a user */
router.get('/toAdd', function (req, res) {
    res.render('addUser', {title: 'Add User' });
});

/* Do add a user */
router.get('/doAdd', function(req, res){
    var userName = req.param("name");
    var connection = mysql.createConnection(connectionInfo);
    connection.connect();
    connection.query('select name from test.node_test where name = ?', [userName], function(err, rows, fields ) {
        if (err) throw err;
        if(rows.length >0 ){
            res.json({ hasUser: "true" });
        }else{
            var connection = mysql.createConnection(connectionInfo);
            connection.connect();
            connection.query('insert into test.node_test( name) values(?)', [userName], function(err, result ) {
                if (err) throw err;
                res.json({ success: "true" });
            });
        }

    });

    connection.end();
});
module.exports = router;
