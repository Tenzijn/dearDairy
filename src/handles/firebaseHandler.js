import {
  deleteDoc,
  getDocs,
  doc,
  addDoc,
  collection,
} from 'firebase/firestore'; // Import the necessary package
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { fireStore, auth, provider } from '../firebase/firebaseConfig';

// handle submit
export const handleSubmit = async (data) => {
  try {
    const docRef = await addDoc(collection(fireStore, 'dairy'), {
      title: data.title,
      content: data.content,
      date: data.date,
      time: data.time,
      uid: data.uid,
    });
    console.log('data', data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// handle update
export const handleUpdate = async (data, id) => {
  console.log(data);
  try {
    const docRef = await addDoc(collection(fireStore, 'dairy'), {
      title: data.title,
      content: data.content,
      date: data.date,
      time: data.time,
      uid: data.uid,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// handle delete
export const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(fireStore, 'dairy', id));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

// handle fetch
export const handleFetch = async () => {
  const querySnapshot = await getDocs(collection(fireStore, 'dairy'));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// handle create user
export const handleCreateUser = async (email, password, logInSuccessful) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      logInSuccessful();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode);
      // ..
    });
};

// handle login user
export const handleLoginUser = async (email, password, logInSuccessful) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      logInSuccessful();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode);
    });
};

// handle logout user
export const handleLogoutUser = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('logout');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

// handle google login with redirect
export const handleGoogleLoginWithRedirect = async () => {
  signInWithRedirect(auth, provider);
};
