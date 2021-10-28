

// Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
    apiKey: "AIzaSyAdkBrnmaA50_IoyRW6PqNk6xWnsibZdLI",
    authDomain: "samples-1c5ad.firebaseapp.com",
    databaseURL: "https://samples-1c5ad.firebaseio.com",
    projectId: "samples-1c5ad",
    storageBucket: "samples-1c5ad.appspot.com",
    messagingSenderId: "809059195566",
    appId: "1:809059195566:web:0261d33eb33fc682182b3f",
    measurementId: "G-6P7YJ7J5LH"
};
  // Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();
const rotRef = database.ref("RIGID");
const userList = database.ref("RIGID_USER_LIST");


var name;
var rowIndex = 1;


//check if name is null
//if null then open the hidden div
if(name != ""){
  var cont = document.getElementById('join');

  var p = document.createElement('p');
  var labelId = document.getElementById('labelId');
  var btn = document.getElementById('btn');
  var userName = document.getElementById('userName');
  var wlcm = document.getElementById('wlcm');
  var sendMess = document.getElementById('sendMess');

  sendMess.dissabled = "false";

  p.textContent = name;
  p.style.fontSize = 23;


  labelId.style.visibility = "hidden"
  btn.style.visibility = "hidden";
  userName.style.visibility = "hidden";
  wlcm.style.visibility = "visible";
  
  cont.appendChild(p);
}


//Enter A  UserName
function lezzGO(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const userName = document.getElementById("userName");
  name = userName.value;

  if(name == ""){
    window.alert("Please Input A UserName");
  }else{
      const autoId = rotRef.push().key;
      rotRef.child(autoId).set({
        Name: name,
        Message: "New User Connected",
        D_ate: date,
        T_ime: time
    })
    reload_page();
  }
  
}



//Send Button
//Send Message Entered when A Decision is made
sendMess.addEventListener('click', (e) => {
  const message = document.getElementById("message");

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //message shouldn't be null
  if(message.value == ""){
    window.alert("Please Input A Message");
  }
  else{
    e.preventDefault();
    const autoId = rotRef.push().key;
    rotRef.child(autoId).set({
      Name: name,
      Message: message.value,
      D_ate: date,
      T_ime: time
    })
    .catch((error) =>{
      console.log(error);
    })
  }
  //Sccrool to bottom
  message.value = "";
  scroll();
});



//Reloaad when a new message is added
rotRef.on('child_added', function (childSnapshot) { 
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
    
     var container = document.getElementById('messageList');

     
     var h4 = document.createElement('h4');
     var h5 = document.createElement('h5');
     var p1 = document.createElement('p');
     var p2 = document.createElement('p');
     var br = document.createElement('br');
     p1.textContent = childData.D_ate;
     p2.textContent = childData.T_ime;
     h4.textContent = childData.Name;
     h5.textContent = childData.Message;


     //append and add li element annd other elements to li elem
     var li = document.createElement('li');
     li.appendChild(h4);
     li.appendChild(h5);
     li.appendChild(p1);
     li.appendChild(p2);
     li.appendChild(br);
     container.appendChild(li);

     if(name == childData.Name){
      li.style.float = "right";
      li.style.textAlign = "right";
     }else{
      li.style.float = "left";
     }
     scroll();
});


//reload the whole page using window reload;
function reload_page(){
   window.location.reload();
   document.getElementsByTagName('input').value = "";
}

//Scroll send message list
function scroll(){
  var cont = document.getElementById("messageList");
  cont.scrollTop = cont.scrollHeight;
}


//check user list
//this is where we check our user..in our database
var status;
function tryMe(){

}


//SignUpvariable
const newUserName = document.getElementById("newUserName");
const newUserPass = document.getElementById("newUserPass");
const confirmUserPass = document.getElementById("confirmUserPass");
const ifDataNotEqual = document.getElementById("ifDataNotEqual");
const submitNewUser = document.getElementById("submitNewUser");

//logIn variables
const logInUserName = document.getElementById('logInUserName');
const logInUserPass = document.getElementById('logInUserPass');
const logIn = document.getElementById('logIn');

//checker if change has been made on passSimilar 
function passSimilar(){

  if(newUserPass.value != confirmUserPass.value){
    console.log("Not Equal");
    ifDataNotEqual.style.visibility = "visible";
  }else{
    ifDataNotEqual.style.visibility = "hidden";
  }
}



submitNewUser.addEventListener('click', (e) => {
  

  var status = userList.orderByChild('Name').equalTo(newUserName.value).isEqual(userList.orderByChild('Name').equalTo(newUserName.value));

  if(status){
    alert("UserName ALready Use");
    reload_page();
  }else{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
    if(newUserPass.value != confirmUserPass.value){
        alert("Please Confirm Your Password");
    }else{
      const autoId = userList.push().key;
      userList.child(autoId).set({
        User_Name: newUserName.value,
        User_Pass: newUserPass.value,
        Date_Log: date,
        Time_Log: time
      })
      .catch((error) =>{
        console.log(error);
      })  
      alert("New User Has Been Added");
      reload_page();
    }
  }
})

logIn.addEventListener('click', (e) => {
  userList.orderByChild('User_Name').equalTo(logInUserName.value).on('child_added', function(childSnapshot){
    var childData = childSnapshot.val();
    if(childData.User_Pass = logInUserPass.value){
      alert("Success");
      name = childData.User_Name;
      reload_page();
    }else{
      alert("Failed");
    }
  })
})