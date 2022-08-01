const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const multer = require("multer");
const s3 = require("./s3");
const uidSafe = require("uid-Safe");

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

/* ----------------------------------------------------------------------------------------------------------
                                                   Middleware
-----------------------------------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------------------------------------------------
                                                   About  
-----------------------------------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------------------------------------------------
                                                   Checkout  
-----------------------------------------------------------------------------------------------------------*/

app.get("/chekcout", function (req, res) {
    res.json({
        success: true,
    });
});

/* ----------------------------------------------------------------------------------------------------------
                                                   Register Product 
-----------------------------------------------------------------------------------------------------------*/
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename(req, file, callback) {
        //create a randome file name
        //pick up the file extension and save it too
        uidSafe(24).then((randomString) => {
            const extname = path.extname(file.originalname);
            // callback(null, `${randomString}.jpg`);
            callback(null, `${randomString}${extname}`);
        });
    },
});

const uploader = multer({
    storage,
    limits: { fileSize: 2097152 },
});

app.post("/register", uploader.single("image"), s3.upload, (req, res) => {
    // If nothing went wrong the file is already in the uploads directory
    console.log("req body in upload post:", req.body);
    console.log(req.file);
    console.log(
        "this is req file:",
        "https://s3.amazonaws.com/spicedling/" + req.file.filename
    );

    let url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
    if (req.file) {
        db.registerProduct(
            req.body.name,
            req.body.description,
            req.body.price,
            url,
            req.body.quantity
        )
            .then(() => {
                res.json({ success: true });
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    } else {
        res.json({
            success: false,
        });
    }
});

/* ----------------------------------------------------------------------------------------------------------
                                                   Display Product 
-----------------------------------------------------------------------------------------------------------*/

app.get("/findProduct", (req, res) => {
    console.log("we are in find products");
    db.findProduct()
        .then((result) => {
            console.log("result in user:", result.rows);
            const product = result.rows;
            res.json({
                success: true,
                product,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                error: true,
            });
            console.log(err, "error in user GET");
        });
});

/* ----------------------------------------------------------------------------------------------------------
                                                   End
-----------------------------------------------------------------------------------------------------------*/

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
