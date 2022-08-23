const firebase=require("firebase-admin");
const credentials = require("../serviceAccountKey.json");
require("firebase/auth")  

const firebaseConfig = {
    credential: firebase.credential.cert(credentials),
    databaseURL: "https://testproject-fb29c.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
module.exports=firebase;