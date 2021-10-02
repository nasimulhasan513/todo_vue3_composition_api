import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import { auth } from "./plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

let app;
onAuthStateChanged(auth, () => {
  app = createApp(App);
  app.mount("#app");
});
