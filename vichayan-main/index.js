var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
// mongodb://myUserName:MyPassword@ElasticIP:27017/databaseName?authSource=admin
mongoose.connect('mongodb+srv://vichayan123:vichayan123@cluster0.lwbbj.mongodb.net/vichayan?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/", (req, res) => {
    var name = req.body.uname;
    var email = req.body.email;
    var phone = req.body.phone;
    var data = {
        "name": name,
        "email": email,
        "phone": phone,
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.json({
        "status": true,
        "response": 200,
        "message": "Successful"
    });
})



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");