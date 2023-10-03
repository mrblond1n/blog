// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from 'firebase/app'
import {Auth, connectAuthEmulator, getAuth, User} from 'firebase/auth'
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore'
import {getPerformance} from 'firebase/performance'
import {connectStorageEmulator, getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || 'mock_key',
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || 'local',
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'local',
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID || 'local',
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()

export const auth = getAuth(app)
export const storage = getStorage(app)

export const perf = typeof window != undefined ? () => getPerformance(app) : void 0

//https://stackoverflow.com/questions/65066963/firebase-firestore-emulator-error-host-has-been-set-in-both-settings-and-usee
const EMULATORS_STARTED = 'EMULATORS_STARTED'

function startEmulators() {
  if (!(global as any)[EMULATORS_STARTED]) {
    ;(global as any)[EMULATORS_STARTED] = true
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true})
    connectStorageEmulator(storage, 'localhost', 9199)
  }
}

if (process.env.NODE_ENV === 'development') {
  startEmulators()
}

// todo find correct resolve for check auth request
export function getCurrentUser(auth: Auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export default db
