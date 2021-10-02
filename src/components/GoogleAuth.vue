<template>
  <button
    @click="signIn"
    style="backdrop-filter: blur(2px)"
    class="
      flex
      items-center
      gap-2
      px-5
      py-3
      text-xl
      font-bold
      bg-gray-700
      border border-white
      rounded
      text-gray-50
      bg-opacity-10
    "
  >
    <img
      src="https://img.icons8.com/color/240/000000/google-logo.png"
      class="h-10"
    />
    Sign In with Google
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { auth } from "../plugins/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export default defineComponent({
  setup() {
    const signIn = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    };
    return { signIn };
  },
});
</script>

<style scoped>
</style>