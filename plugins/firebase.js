import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/analytics'

if (!firebase.apps.length) {
  firebase.initializeApp({
  })
}

firebase.analytics();

export default firebase
