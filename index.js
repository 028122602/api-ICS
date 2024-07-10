import express from "express";
import bodyParser from "body-parser";
import {
  translateToAlien,
  translateToOriginal,
  detectLanguage,
} from "./translator.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>Translator</title>
    <style type="text/css">
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
      }

      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .form label {
        margin-bottom: 10px;
        font-size: 1.2em;
      }

      .form textarea {
        width: 300px;
        height: 100px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
      }

      .form button {
        margin-top: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .form button:hover {
        background-color: #0056b3;
      }

      .error {
        color: red;
        margin-top: 10px;
      }
    </style>
    
  </head>
  <body>
    <div class="container">
      <form class="form" method="post" action="/translate">
        <label for="text">Enter text to translate:</label>
        <textarea
          id="text"
          name="text"
          rows="4"
          required
        ></textarea>
        <button type="submit">Translate</button>
        <p id="error-message" class="error"></p>
      </form>
    </div>
  </body>
</html>`);
});

app.post("/translate", (req, res) => {
  const text = req.body.text;
  
  let translatedText;
  let langType = detectLanguage(text);
  if (langType) {
    translatedText = translateToOriginal(text);
  } else {
    translatedText = translateToAlien(text);
  }

  res.send(`
    <!DOCTYPE html>
<html>
  <head>
    <title>Translator</title>
    <style type="text/css">
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 80%;
        max-width: 600px;
      }

      .text-display {
        margin-bottom: 20px;
        font-size: 1.2em;
        color: #333;
        text-align: center;
      }

      .text-display p {
        margin: 10px 0;
      }

      .back-link {
        text-decoration: none;
        color: #007bff;
        font-size: 1em;
        border: 1px solid #007bff;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #fff;
        transition: background-color 0.3s, color 0.3s;
      }

      .back-link:hover {
        background-color: #007bff;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="text-display">
        <p>${!langType ? "English" : "Alien"} text: ${text}</p>
        <p>${langType ? "English" : "Alien"} text: ${translatedText}</p>
      </div>
      <a href="/" class="back-link">Go back</a>
    </div>
  </body>
</html>
  `);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
