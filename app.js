const express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require("body-parser")
const mysql = require('mysql');
const ejs = require('ejs');
let alert = require('alert');
const nodemailer = require('nodemailer');
process.env.PWD = process.cwd()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
// Then
app.use(express.static(process.env.PWD + '/public'));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'serl'
});

connection.connect();
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")

})
app.get('/login_ad.html', function (req, res) {
    res.sendFile(__dirname + "/login_ad.html")
})

app.get('/login_stu.html', function (req, res) {
    res.sendFile(__dirname + "/login_stu.html")
})

app.get('/faculty.html', function (req, res) {
    res.sendFile(__dirname + "/faculty.html")
});
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get('/cour.html', function (req, res) {
    res.sendFile(__dirname + "/cour.html")
});

app.get('/about.html', function (req, res) {
    res.sendFile(__dirname + "/about.html")
});
app.get('/research.html', function (req, res) {
    res.sendFile(__dirname + "/research.html")
});

app.get('/refer.html', function (req, res) {
    res.sendFile(__dirname + "/refer.html")
});

app.get('/edit.html', function (req, res) {
    res.sendFile(__dirname + "/edit.html")
});

// app.get('/edit.html', async (req, res) => {
//     const query1 = "SELECT * FROM publi";
//     const query2 = "SELECT * FROM proj";

//     var query = "SELECT * FROM publi";

//     connection.query(query, function (error, data) {

//         if (error) {
//             throw error;
//         }
//         else {
//             res.render('/edit.html', { title1: 'Publications', action: 'list', Data1: data });
//         }
//     });


// const query3 = "SELECT * FROM login";
// try {
//     // Get connection once
//     // const conn = getConn();
//     // Techniques: Array destructuring and Promise resolving in batch
//     let pu, pr, lo;
//     await Promise.all(
//         [
//             connection.query(query1, (err, rows) => { directions = rows; }),
//             connection.query(query2, (err, rows) => { sousDirectios = rows; }),
//             // connection.query(query3, (err, rows) => { departments = rows; }),
//         ]
//     );
//     setTimeout(() => {
//         res.render('edit', {
//             data1: pu,
//             data2: pr,
//             action: 'list',
//             title1: 'Publications',
//             title2: 'Projects'
//             // data3: lo,
//             // data4: equipes,
//         });
//     }, 100);
// } catch (error) {
//     console.log(error);
//     res.end();
// }
// });

app.get('/publi.html', function (req, res) {

    var query = "SELECT * FROM publi";

    connection.query(query, function (error, data) {

        if (error) {
            throw error;
        }
        else {
            res.render('publi', { title: 'Publications', action: 'list', sampleData: data });
        }
    });
})

app.get('/proj.html', function (req, res) {

    var query = "SELECT * FROM proj";

    connection.query(query, function (error, data) {

        if (error) {
            throw error;
        }
        else {
            res.render('proj', { title: 'Projects', action: 'list', sampleData: data });
        }

    });


})

app.post("/user", function (req, res) {
    var username = (req.body.uname)
    var password = (req.body.pswd)

    connection.query('SELECT * FROM admin', function (error, results, fields) {
        if (error) throw error;
        var log = false;
        results.forEach(function (row) {
            if (username == row.admin_username && password == row.admin_password) {
                log = true
            }
        });
        if (log) {
            res.sendFile(__dirname + '/edit.html')
        }
        else {
            alert("Wrong Credentials");
            res.redirect("/login_ad.html")
            // res.send("fail")
        }
    })
})

app.post("/user1", function (req, res) {
    var username = (req.body.uname)
    var password = (req.body.pswd)

    connection.query('SELECT * FROM student', function (error, results, fields) {
        if (error) throw error;
        var log = false;
        results.forEach(function (row) {
            if (username == row.student_username && password == row.student_pw) {
                log = true
            }
        });
        if (log) {
            // res.sendFile(__dirname + '/edit_stu.html')
            res.render('edit_stu');
        }
        else {
            alert("Wrong Credentials");
            res.redirect("/login_stu.html")
            // res.send("fail")
        }
    })
})

app.get('/edit_stu', function (req, res) {

    res.render('edit_stu');

});

// app.post("/user", function (req, res) {
//     var username = (req.body.aname)
//     var password = (req.body.pswd)

//     connection.query('SELECT * FROM login', function (error, results, fields) {
//         if (error) throw error;
//         var log = false;
//         results.forEach(function (row) {

//             if (username == row.name && password == row.password) {
//                 log = true
//             }
//         });
//         if (log) {
//             res.sendFile(__dirname + "/student.html")
//         }
//     })
// })

app.post("/signup", function (req, res) {
    var student_username = (req.body.aname)
    var student_pw = (req.body.pswd)

    connection.query('INSERT INTO student (student_id,student_username,student_pw) VALUES(NULL,?,?)', [student_username, student_pw], function (error, results, fields) {
        if (error) throw error;
        alert("Succesfully Added");
        // res.jsonp({ success: true })
    });

    res.redirect("/login_stu.html")
})

app.get('/edit_proj', function (req, res) {

    res.render('edit_proj', { title: 'Projects' });

});

app.get('/edit_publi', function (req, res) {

    res.render('edit_publi', { title: 'Publications' });

});

app.get('/edit_admin', function (req, res) {

    res.render('edit_admin', { title: 'Administrators' });

});

app.post('/action', function (req, res) {

    var action = req.body.action;

    if (action == 'fetch') {
        // alert("hi");
        var query = "SELECT * FROM proj";

        connection.query(query, function (error, data) {

            res.json({
                data: data
            });

        });
    }
    if (action == 'Add') {
        // var id_proj = req.body.first_name;

        var author_proj = req.body.author_proj;

        var title_proj = req.body.title_proj;

        var type_proj = req.body.type_proj;

        var query = `
		INSERT INTO proj 
		(author_proj, title_proj, type_proj) 
		VALUES ("${author_proj}", "${title_proj}", "${type_proj}")
		`;

        connection.query(query, function (error, data) {

            res.json({
                message: 'Data Added'
            });

        });
    }
    if (action == 'fetch_single') {
        var id_proj = req.body.id_proj;

        var query = `SELECT * FROM proj WHERE id_proj = "${id_proj}"`;

        connection.query(query, function (error, data) {

            res.json(data[0]);

        });
    }

    if (action == 'Edit') {
        var id_proj = req.body.id_proj;

        // var first_name = req.body.first_name;

        var author_proj = req.body.author_proj;

        var title_proj = req.body.title_proj;

        var type_proj = req.body.type_proj;

        var query = `
		UPDATE proj 
		SET author_proj = "${author_proj}", 
		type_proj = "${type_proj}", 
		title_proj = "${title_proj}" 
		WHERE id_proj = "${id_proj}"
		`;

        connection.query(query, function (error, data) {
            res.json({
                message: 'Data Edited'
            });
        });
    }

    if (action == 'delete') {
        var id_proj = req.body.id_proj;

        var query = `DELETE FROM proj WHERE id_proj = "${id_proj}"`;
        var query1 = `ALTER TABLE proj AUTO_INCREMENT = 1`;

        connection.query(query, function (error, data) {

            // connection.query(query1, function (error, data) {
            res.json({
                message: 'Data Deleted'
            });
            // })

        });

        connection.query(query1, function (error, data) {
            console.log('Done!');
        });
    }
    // else {
    //     alert("NO");
    // }

});

app.post('/action1', function (req, res) {

    var action = req.body.action;

    if (action == 'fetch') {
        // alert("hi");
        var query = "SELECT * FROM publi";

        connection.query(query, function (error, data) {

            res.json({
                data: data
            });

        });
    }
    if (action == 'Add') {
        // var id_pub = req.body.first_name;

        var author_pub = req.body.author_pub;

        var title_pub = req.body.title_pub;

        var jour_pub = req.body.jour_pub;

        var date_pub = req.body.date_pub;

        var query = `
		INSERT INTO publi 
		(author_pub, title_pub, jour_pub,date_pub) 
		VALUES ("${author_pub}", "${title_pub}", "${jour_pub}","${date_pub}")
		`;

        connection.query(query, function (error, data) {

            res.json({
                message: 'Data Added'
            });

        });
    }
    if (action == 'fetch_single') {
        var id_pub = req.body.id_pub;

        var query = `SELECT * FROM publi WHERE id_pub = "${id_pub}"`;

        connection.query(query, function (error, data) {

            res.json(data[0]);

        });
    }

    if (action == 'Edit') {
        var id_pub = req.body.id_pub;

        // var first_name = req.body.first_name;

        var author_pub = req.body.author_pub;

        var title_pub = req.body.title_pub;

        var jour_pub = req.body.jour_pub;

        var date_pub = req.body.date_pub;

        var query = `
		UPDATE publi 
		SET author_pub = "${author_pub}", 
		jour_pub = "${jour_pub}",
        date_pub = "${date_pub}",  
		title_pub = "${title_pub}" 
		WHERE id_pub = "${id_pub}"
		`;

        connection.query(query, function (error, data) {
            res.json({
                message: 'Data Edited'
            });
        });
    }

    if (action == 'delete') {
        var id_pub = req.body.id_pub;

        var query = `DELETE FROM publi WHERE id_pub = "${id_pub}"`;
        var query2 = `ALTER TABLE publi AUTO_INCREMENT = 1`;

        connection.query(query, function (error, data) {

            // connection.query(query1, function (error, data) {
            res.json({
                message: 'Data Deleted'
            });
            // })

        });

        connection.query(query2, function (error, data) {
            console.log('Done1!');
        });
    }
    // else {
    //     alert("NO");
    // }

});

app.post('/admin1', function (req, res) {

    var action = req.body.action;

    if (action == 'fetch') {
        // alert("hi");
        var query = "SELECT * FROM admin";

        connection.query(query, function (error, data) {

            res.json({
                data: data
            });

        });
    }
    if (action == 'Add') {
        // var id_proj = req.body.first_name;

        var admin_username = req.body.admin_username;

        var admin_password = req.body.admin_password;

        // var type_proj = req.body.type_proj;

        var query = `
		INSERT INTO admin 
		(admin_username, admin_password) 
		VALUES ("${admin_username}", "${admin_password}")
		`;

        connection.query(query, function (error, data) {

            res.json({
                message: 'Data Added'
            });

        });
    }
    if (action == 'fetch_single') {
        var admin_id = req.body.admin_id;

        var query = `SELECT * FROM admin WHERE admin_id = "${admin_id}"`;

        connection.query(query, function (error, data) {

            res.json(data[0]);

        });
    }

    if (action == 'Edit') {
        var admin_id = req.body.admin_id;

        // var first_name = req.body.first_name;

        var admin_username = req.body.admin_username;

        var admin_password = req.body.admin_password;

        // var type_proj = req.body.type_proj;

        var query = `
		UPDATE admin 
		SET admin_username = "${admin_username}", 
		admin_password = "${admin_password}" 
		WHERE admin_id = "${admin_id}"
		`;

        connection.query(query, function (error, data) {
            res.json({
                message: 'Data Edited'
            });
        });
    }

    if (action == 'delete') {
        var admin_id = req.body.admin_id;

        var query = `DELETE FROM admin WHERE admin_id = "${admin_id}"`;
        var query1 = `ALTER TABLE admin AUTO_INCREMENT = 1`;

        connection.query(query, function (error, data) {

            // connection.query(query1, function (error, data) {
            res.json({
                message: 'Data Deleted'
            });
            // })

        });

        connection.query(query1, function (error, data) {
            console.log('Done!');
        });
    }
    // else {
    //     alert("NO");
    // }

});

// // [
//     check('name').notEmpty().withMessage('Name is required'),
//     check('email').isEmail().withMessage('Invalid Email Address'),
//     check('subject').notEmpty().withMessage('Subject is required'),
//     check('message').notEmpty().withMessage('Message is required')
// ],

app.post('/send', (request, response) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ratankalpasai@gmail.com',
            pass: 'kadzpkunrinuyvhy'
        }
    });

    const mail_option = {
        from: request.body.email,
        to: 'ratankalpasai@gmail.com',
        subject: request.body.subject,
        text: request.body.message
    };

    transporter.sendMail(mail_option, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            res.redirect('/success');
        }
    });
});

app.get('/success', (request, response) => {

    res.send('<h1>Your Message was Successfully Send!</h1>');

});


// app.post('/send1', (request, response) => {

//     // const errors = validationResult(request);

//     // if (!errors.isEmpty()) {
//     //     res.render('contact', { errors: errors.mapped() });
//     // }
//     // else {
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'ratankalpasai@gmail.com',
//             pass: 'kadzpkunrinuyvhy'
//         }
//     });

//     const mail_option = {
//         from: request.body.email,
//         to: 'ratankalpasai@gmail.com',
//         subject: request.body.subject,
//         text: request.body.message
//     };

//     transporter.sendMail(mail_option, (error, info) => {
//         if (error) {
//             console.log(error);
//         }
//         else {
//             console.log("Succesfully Sent");
//             // response.redirect('/success');
//         }
//     });
//     // }
// });

// app.get('/success', (request, res) => {

//     // alert("Succesfully Sent");
//     // res.sendFile(__dirname + "/index.html")

// });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = router;