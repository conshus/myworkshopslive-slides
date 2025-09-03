import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';

console.log('nexmoClient: ', NexmoClient);

// Add Firebase products that you want to use
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-functions.js';

const revealSlides = document.querySelector(".reveal");

const firebaseConfig = {
    apiKey: "AIzaSyDQ_LBtYF0sPclzGHH0rFc3UuhxEPtwxks",
    authDomain: "myworkshops-live.firebaseapp.com",
    projectId: "myworkshops-live",
    storageBucket: "myworkshops-live.appspot.com",
    messagingSenderId: "384421034954",
    appId: "1:384421034954:web:524e3973fce18ba8862d33"
};

let allowControlsData;
let allowControlsAdmin;
// let jwt;


const params = (new URL(document.location)).searchParams;
let username = params.get('name');
console.log("username: ", username);
console.log("location.pathname: ", location.pathname);
const slug = location.pathname.replace('/','').replace('.html','');
console.log('slug: ', slug);  

let conversationId;
let conversation;
let client;
let vapp;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

const getJWT = httpsCallable(functions, 'getJWT');



//Get info from Firestore
async function getData(){
    console.log("getData()");
    const docRef = doc(db, "workshops", slug);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve)=>{
        if (docSnap.exists()){
            console.log("Document data: ", docSnap.data());
            //Check if allowControls
            conversationId = docSnap.data().conversationId;
            resolve(docSnap.data().allowControls);
        } else {
            console.log("No such document");
            resolve (false);
        }    
    })    
}

//Check if logged in user/admin
async function getUser(){
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                console.log("user: ", user);
                username = user.email
                resolve(true);
            } else {
                console.log("not signed in");
                resolve(false);
            }
        
        });        
    });
}




// connect to Vonage



console.log("app: ", app);
console.log("auth: ", auth);

console.log("test");

async function setup(jwt,conversationId){
    try {
        client = new NexmoClient({debug:false});
        vapp = await client.createSession(jwt);
        conversation = await vapp.getConversation(conversationId);
        console.log('setup conversation: ',conversation);   
        
        conversation.on('slidechanged', (from, event) => {
            console.log('from: ', from);
            if (conversation.me.id !== from.memberId){
                console.log(event.body);
                Reveal.slide( event.body.indexh, event.body.indexv, event.body.indexf );
            }
        });
      
    //   vonageInput.conversation = conversation;
    //   vonageTypingIndicator.conversation = conversation;
    //   vonageMembers.conversation = conversation;
    //   vonageMessagesFeed.conversation = conversation;
          
      // Log out of chat
    //   logoutButton.addEventListener("click", (event)=>{
    //     console.log('leave conversation!');
    //     conversation.leave({reason_code: "logout", reason_text: "pressed logout"})
    //       .then((response)=> {
    //         console.log('response: ',response);
    //         chatContainer.style.display = "none";
    //         loginContainer.style.display = "block";
    //         vonageMembers.members = [];
    //       })
    //       .catch((error)=>{
    //           console.log('error: ', error);
    //     });
    //   });        
        return;
    }
    catch (error){
        console.error('error in setup: ', error);
        return;
    }
  
}
  

async function initialize(){
    allowControlsData = await getData();
    allowControlsAdmin = await getUser();
    // initialize reveal
    Reveal.initialize({
        center: true,
        history: true,
        controls: allowControlsAdmin || allowControlsData,

        // transition: 'slide',
        // transitionSpeed: 'slow',
        // backgroundTransition: 'slide'
    });
    getJWT({username, conversationId})
    .then((result) => {
        console.log("getJWT result.data: ", result.data);
        setup(result.data.jwt, conversationId);
    })
    .catch((error) => {
        console.dir(error);
    })


}

initialize();

revealSlides.addEventListener('slidechanged', event => {
    console.log(event); //send custom event
    const {indexh, indexv, indexf} = event;
    console.log(indexh, indexv, indexf);
    conversation.sendCustomEvent({ type: 'slidechanged', body: { indexh, indexv, indexf }}).then((custom_event) => {
        console.log(custom_event);
    });
});
  