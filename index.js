import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs");
})

app.post("/random", async (req, res) =>{
    var choice;
    var data;
    var URL;
    if(req.body.choice === "music"){
        URL = "https://binaryjazz.us/wp-json/genrenator/v1/genre/";
        choice = "music";
    }else if(req.body.choice === "picture"){
        URL = "https://picsum.photos/400/600";
        choice = "picture";
    }else if(req.body.choice === "quote"){
        URL = "https://api.adviceslip.com/advice";
        choice = "quote";
    }

    try{
        const response = await axios.get(URL);
        if (choice === 'music') {
            data = response.data;
        } else if (choice === 'picture') {
            data = response.request.res.responseUrl;
        } else if (choice === 'quote') {
            data = response.data.slip.advice;
        }
        res.render("index.ejs", {data : data, choice: choice})
    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`Sever running at port ${port}`);
})