// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';

// console.log('nexmoClient: ', NexmoClient);

// // Add Firebase products that you want to use
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
// import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-functions.js';

// const revealSlides = document.querySelector(".reveal");

// const firebaseConfig = {
//     apiKey: "AIzaSyDQ_LBtYF0sPclzGHH0rFc3UuhxEPtwxks",
//     authDomain: "myworkshops-live.firebaseapp.com",
//     projectId: "myworkshops-live",
//     storageBucket: "myworkshops-live.appspot.com",
//     messagingSenderId: "384421034954",
//     appId: "1:384421034954:web:524e3973fce18ba8862d33"
// };

// let allowControlsData;
// let allowControlsAdmin;
// // let jwt;


// const params = (new URL(document.location)).searchParams;
// let username = params.get('name');
// console.log("username: ", username);
// console.log("location.pathname: ", location.pathname);
// // const slug = location.pathname.replace('/','').replace('.html','');
// const pathParts = location.pathname.split('/');
// const slugWithExtension = pathParts[pathParts.length - 1];
// const slug = slugWithExtension.replace('.html', '');
// console.log('slug: ', slug);  

// let conversationId;
// let conversation;
// let client;
// let vapp;
// let votes = {};




// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const functions = getFunctions(app);

// const getJWT = httpsCallable(functions, 'getJWT');



// //Get info from Firestore
// async function getData(){
//     console.log("getData()");
//     const docRef = doc(db, "workshops", slug);
//     const docSnap = await getDoc(docRef);
//     return new Promise((resolve)=>{
//         if (docSnap.exists()){
//             console.log("Document data: ", docSnap.data());
//             //Check if allowControls
//             conversationId = docSnap.data().conversationId;
//             resolve(docSnap.data().allowControls);
//         } else {
//             console.log("No such document");
//             resolve (false);
//         }    
//     })    
// }

// //Check if logged in user/admin
// async function getUser(){
//     return new Promise((resolve) => {
//         onAuthStateChanged(auth, async (user) => {
//             console.log("onAuthStateChanged user: ", username);
//             const q =  await getDocs(query(collection(db, "allowed"), where("email","array-contains",username)));
//             if(user) {
//                 console.log("user: ", user);
//                 username = user.email
//                 resolve(true);
//             } else if (!q.empty){
//                 console.log("is admin");
//                 resolve(true);
//             } else {
//                 console.log("not signed in");
//                 resolve(false);
//             }
        
//         });        
//     });
// }




// connect to Vonage



// console.log("app: ", app);
// console.log("auth: ", auth);

// console.log("test");

// async function setup(jwt,conversationId){
//     try {
//         client = new NexmoClient({debug:false});
//         vapp = await client.createSession(jwt);
//         conversation = await vapp.getConversation(conversationId);
//         console.log('setup conversation: ',conversation);   
        
//         conversation.on('slidechanged', (from, event) => {
//             // console.log('from: ', from);
//             if (conversation.me.id !== from.memberId){
//                 console.log(event.body);
//                 Reveal.slide( event.body.indexh, event.body.indexv, event.body.indexf );
//             }
//         });

//         conversation.on('vote', (from, event) => {
//             const voteId = `${event.body.id}-${event.body.option}`;
//             console.log("voteId: ", voteId);
//             votes[voteId]++;
//             // console.log('votes: ', votes);
//             document.querySelector(`#${voteId}`).innerText = votes[voteId];        
//         });

      
//     //   vonageInput.conversation = conversation;
//     //   vonageTypingIndicator.conversation = conversation;
//     //   vonageMembers.conversation = conversation;
//     //   vonageMessagesFeed.conversation = conversation;
          
//       // Log out of chat
//     //   logoutButton.addEventListener("click", (event)=>{
//     //     console.log('leave conversation!');
//     //     conversation.leave({reason_code: "logout", reason_text: "pressed logout"})
//     //       .then((response)=> {
//     //         console.log('response: ',response);
//     //         chatContainer.style.display = "none";
//     //         loginContainer.style.display = "block";
//     //         vonageMembers.members = [];
//     //       })
//     //       .catch((error)=>{
//     //           console.log('error: ', error);
//     //     });
//     //   });        
//         return;
//     }
//     catch (error){
//         console.error('error in setup: ', error);
//         return;
//     }
  
// }
  

async function initialize(){
// // Make sure to uncomment this!
//     allowControlsData = await getData();
//     allowControlsAdmin = await getUser();
//     if(allowControlsAdmin){
//         document.querySelector("#frameworks-choice-links").style.display = "block";
//     }
// // Make sure to uncomment this!
//     if (conversationId && !allowControlsData){
//         getJWT({username, conversationId})
//         .then((result) => {
//             console.log("getJWT result.data: ", result.data);
//             setup(result.data.jwt, conversationId);
//         })
//         .catch((error) => {
//             console.dir(error);
//         });    
//     }

// initialize reveal
    Reveal.initialize({
        center: true,
        history: true,
// Make sure to uncomment this!
        // controls: allowControlsAdmin || allowControlsData,
        controls: true,
        keyboard: true,
        transition: 'none',
        touch: true,
        mouseWheel: true,
        // transitionSpeed: 'slow',
        // backgroundTransition: 'slide'
        plugins: [ RevealHighlight ]
    });

}

initialize();

// revealSlides.addEventListener('slidechanged', event => {
//     console.log(event); //send custom event
//     const {indexh, indexv, indexf} = event;
//     console.log(indexh, indexv, indexf);
// // Make sure to uncomment this!
//     if (conversation && allowControlsAdmin){
//         conversation.sendCustomEvent({ type: 'slidechanged', body: { indexh, indexv, indexf }}).then((custom_event) => {
//             console.log(custom_event);
//         });    
//     }
// });
  
// Polls
// function submitVote(event){
//     console.log('event: ', event.target.dataset.id, event.target.dataset.option);

// // Make sure to uncomment this!
//     if (conversation){
//         conversation.sendCustomEvent({ type: 'vote', body: { id: event.target.dataset.id, option: event.target.dataset.option }}).then((custom_event) => {
//             console.log(custom_event);
//             document.querySelectorAll(`.${event.target.dataset.id}`).forEach((pollOption) => {
//                 pollOption.disabled = true;
//             });    
//         });    
//     }
    
// }
// const pollOptions = document.querySelectorAll('.poll-option');

// pollOptions.forEach((pollOption) => {
//     pollOption.addEventListener('click', submitVote, false);
//     console.log('pollOption: ', pollOption);
//     // initialize votes
//     votes = {...votes, [`${pollOption.dataset.id}-${pollOption.dataset.option}`]: 0};
// });


// const couponBtn = document.querySelector("#coupon-button");
// const couponEl = document.querySelector("#coupon-code");

// couponBtn.addEventListener("click", ()=>{
//     couponBtn.style.display = "none";
//     couponEl.style.display = "block";
// });


