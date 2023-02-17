const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");
const firebase = require("firebase-admin");
require("firebase/firestore");
var serviceAccount = require("./privkey.json");

const firebaseConfig = {
  apiKey: "AIzaSyBeXB1sHEx-LTHyPovvwWF3xICYgncti3k",
  authDomain: "dust-ec112.firebaseapp.com",
  projectId: "dust-ec112",
  storageBucket: "dust-ec112.appspot.com",
  messagingSenderId: "878614089043",
  appId: "1:878614089043:web:7a3e60efb5b9616422e5a6",
};

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});
const db = firebase.firestore();

app.use(cors());

app.get("/binfull", async (req, res) => {
  //set bin1 to full
  await db.collection("dustbins").doc("bin1").set({
    full: true,
  });

  res.send({ status: "ok" });
});

// route for empty bin
app.get("/binempty", async (req, res) => {
  //set bin1 to empty
  await db.collection("dustbins").doc("bin1").set({
    full: false,
  });
  res.send({ status: "ok" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
