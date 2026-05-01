import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFEmFHHsa0BdLld_r1Ogi3SCZ-Qd6WRhY",
  authDomain: "voterpath-d8e11.firebaseapp.com",
  projectId: "voterpath-d8e11",
  storageBucket: "voterpath-d8e11.firebasestorage.app",
  messagingSenderId: "738276742105",
  appId: "1:738276742105:web:fcd947a2ea83bf5896ffc8",
  measurementId: "G-FXXST8QVQK"
};

// Initialize Firebase only if it hasn't been initialized already (important for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics only in the browser (it uses window object)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
}

export { app, analytics };
