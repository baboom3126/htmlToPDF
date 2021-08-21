var express = require('express');
var router = express.Router();

var sql = require('mssql');
var config = {
  user: 'david',
  password: 'david123',
  server: '140.120.54.182',   //這邊要注意一下!!
  database: 'test0821',
  options: { "trustServerCertificate": true }
};


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function (req, res, next) {
  try {

    sql.connect(config, function (err) {
      if (err) console.log(err);

      //create Request object
      var request = new sql.Request();
      request.query('SELECT * FROM myTable1', function (err, result) {
        if (err) console.log(err);

        //send records as a response
        res.send(result);
      });
    });




  } catch (err) {
    console.log(err)
    res.send(err)
  }
})


router.get('/insert', function (req, res, next) {
  try {

    sql.connect(config, function (err) {
      if (err) console.log(err);

      //create Request object
      var request = new sql.Request();
      request.query(`INSERT INTO myTable1 (id,name) VALUES ('1','david')`, function (err, result) {
        if (err) console.log(err);

        //send records as a response
        res.send(result);
      });
    });




  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.get('/insertWithIdAndName', function (req, res, next) {
  try {
    var id = req.query.id
    var name = req.query.name
    if (id && name) {
      sql.connect(config, function (err) {
        if (err) console.log(err);

        //create Request object
        var request = new sql.Request();
        request.query(`INSERT INTO myTable1 (id,name) VALUES ('${id}','${name}')`, function (err, result) {
          if (err) console.log(err);

          //send records as a response
          res.send(result);
        });
      });
    } else {
      res.send('Please send id and name.')
    }



  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

module.exports = router;
