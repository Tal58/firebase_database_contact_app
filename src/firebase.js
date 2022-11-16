import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, push, update, remove } from "firebase/database";



// env. is used for security reasons
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    databaseURL: process.env.REACT_APP_databaseURL,
  };


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database


//write database
export function writeUserData(userId, avatar, name, phoneNumber, gender, flag,countryName) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        avatar: avatar,
        username: name,
        phone: phoneNumber,
        gender:gender,
        flag: flag,
        // countryName:countryName
        //   profile_picture : imageUrl
    });
}

//update database
export function updateDB(userId, avatar, name, phoneNumber, gender, flag,countryName){
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        avatar: avatar,
        username: name,
        phone: phoneNumber,
        gender:gender,
        flag: flag,
        // countryName:countryName
    })
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
}

//remove database

export function removeDB(userId){
    const db = getDatabase();
    remove(ref(db, 'users/' + userId))
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
}


//edit
function writeNewPost(uid, username, picture, title, body) {
    const db = getDatabase();

    // A post entry.
    const postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return update(ref(db), updates);
}

