var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json({extended: true})); //사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
app.use(bodyParser.urlencoded({extended: true})); //json이 아닌 post 형식으로 올때 parser

app.listen(3000, function () {
    console.log('서버 실행 중...');
});
//디비 연결
var connection = mysql.createConnection({
    host: "dbinstance.cezo5hq4m8rx.ap-northeast-2.rds.amazonaws.com",
    user: "toy5404",
    database: "workman",
    password: "rlafodnjs10",
    port: 3306
});


   //회원가입
  app.post('/register/', function (req, res) {
      var post_data = req.body;
    var UserEmail = post_data.UserEmail;
    var UserPwd = post_data.UserPwd;
    var UserName = post_data.UserName;
    var UserPhoneNumber = post_data.UserPhoneNumber;

    // 삽입을 수행하는 sql문.
    var sql = 'INSERT INTO Users (UserEmail, UserPwd, UserName, UserPhoneNumber) VALUES (?, ?, ?, ?)';
    var params = [UserEmail, UserPwd, UserName, UserPhoneNumber];
   
    connection.query(sql, params, function (err, result) {
        var resultCode = 404;
        var message = '에러가 발생했습니다';

        if (err) {
            console.log(err);
        } else {
            resultCode = 200;
            message = '회원가입에 성공했습니다.';
        }

        res.json({
            'code': resultCode,
            'message': message
        });
    });
});

app.post('/login/',function(req,res){
    var post_data = req.body;
    var loginEmail = post_data.UserEmail;
    var loginPwd = post_data.UserPwd;

    connection.query('SELECT * FROM Users where UserEmail =?'),[loginEmail],function(err,result,fields){
        connection.on('error',function(err){
            console.log('[MySQL ERROR]',err); 
        });
        
    }
})