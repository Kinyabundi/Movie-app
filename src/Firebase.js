
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHE0_odxTWdkLMFaaGbzeSEIYfXhItgHY",
  authDomain: "movie-app-userauthenitication.firebaseapp.com",
  projectId: "movie-app-userauthenitication",
  storageBucket: "movie-app-userauthenitication.appspot.com",
  messagingSenderId: "453461577426",
  appId: "1:453461577426:web:2356f7eb776afaf683670b",
  measurementId: "G-R45RHHN3PM"
};

//intialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
//const analytics = getAnalytics(app);