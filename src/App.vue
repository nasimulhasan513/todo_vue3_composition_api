<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen gap-2  app bangla"
  >
    <div
      class="w-1/2 px-2 py-5 mt-10 bg-white border border-gray-200 rounded-lg shadow-lg  bg-opacity-40 card"
      v-if="isAuthenticated"
    >
      <div class="">
        <img
          :src="user?.photoURL"
          :alt="user?.displayName"
          class="object-cover mx-auto rounded-full"
        />
      </div>
      <div class="mt-2 text-center">
        <h1 class="text-2xl font-semibold text-center">
          {{ user?.displayName }}
        </h1>
        <button
          class="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-full  hover:bg-green-600"
        >
          Sign Out
        </button>
      </div>
    </div>
    <div v-if="!isAuthenticated">
      <GoogleAuth />
    </div>
    <div
      v-else
      class="container p-5 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg  card bg-opacity-40 lg:w-1/4 md:w-1/2"
    >
      <div class="flex w-full">
        <input
          type="text"
          v-model="title"
          class="input-decoration"
          placeholder="Todo Title"
        />
        <button
          class="flex items-center justify-center px-3 py-2 ml-2 font-semibold text-white transition duration-200 bg-green-400 rounded shadow-sm  hover:bg-gray-700"
          @click="addTodo"
        >
          <span class="material-icons"> add </span> Add
        </button>
      </div>
      <div class="mt-5" v-if="todos.length > 0">
        <ul class="space-y-3">
          <li
            v-for="(t, i) in todos"
            :key="i"
            class="flex items-center p-2 text-lg bg-gray-300 rounded-full cursor-pointer  bg-opacity-60 hover:bg-gray-100"
            @click="viewDetails(t)"
          >
            <span class="mr-2 text-green-500 material-icons">
              check_circle
            </span>
            {{ t.title }}
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed z-0 flex items-center justify-center min-w-full min-h-screen p-4 bg-opacity-50  bg-gray-50"
    >
      <div
        class="z-10 p-5 bg-white border border-white shadow-sm  md:w-1/2 lg:w-1/3 rounded-2xl"
      >
        <div v-if="!editable">
          <div class="my-3 mb-5">
            <h2 class="text-xl font-semibold text-center capitalize">
              {{ currentTodo.title }}
            </h2>
            <p class="my-2 text-center">
              {{ new Date(currentTodo.time.toDate()).toLocaleString() }}
            </p>
          </div>
          <div class="flex justify-center gap-2">
            <button
              @click="editable = !editable"
              class="px-3 py-2 font-semibold text-white transition duration-150 bg-green-500  hover:bg-red-600"
            >
              Edit
            </button>
            <button
              @click="deleteTodo(currentTodo.id)"
              class="px-3 py-2 font-semibold text-white transition duration-150 bg-red-500  hover:bg-red-600"
            >
              Delete
            </button>

            <button
              @click="showModal = !showModal"
              class="px-3 py-2 font-semibold text-white transition duration-150 bg-blue-500  hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
        <div class="space-y-3 text-center" v-else>
          <input
            type="text"
            class="input-decoration"
            v-model="currentTodo.title"
          />
          <button
            @click="updateTodo"
            class="px-3 py-2 font-semibold text-white transition duration-150 bg-blue-500  hover:bg-red-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useAuth } from "@vueuse/firebase/useAuth";
import GoogleAuth from "./components/GoogleAuth.vue";
import { auth, todoCollection, db } from "./plugins/firebase";
import {
  onSnapshot,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default defineComponent({
  components: { GoogleAuth },
  setup() {
    const { isAuthenticated, user } = <{ isAuthenticated: any; user: any }>(
      useAuth(auth)
    );

    const todos = ref(<Array<any>>[]);

    let title = ref<String>("");
    const addTodo = async () => {
      try {
        await addDoc(todoCollection, {
          title: title.value,
          uid: user.value.uid,
          time: serverTimestamp(),
        });
        title.value = "";
      } catch (error) {
        console.log(error);
      }
    };
    const initTodo = onMounted(() => {
      const qu = query(todoCollection, where("uid", "==", user.value.uid));
      onSnapshot(qu, (docs) => {
        let tds: Array<any> = [];
        docs.forEach((doc) => {
          tds.push({ ...doc.data(), id: doc.id });
        });
        todos.value = tds;
      });
    });
    const currentTodo = ref<any>();
    const showModal = ref<Boolean>(false);
    const editable = ref<Boolean>(false);
    const viewDetails = (todo: Object) => {
      currentTodo.value = todo;
      showModal.value = true;
    };
    const updateTodo = async () => {
      try {
        await updateDoc(
          doc(db, "todos", currentTodo.value.id),
          currentTodo.value
        );
        editable.value = false;
      } catch (error) {}
    };
    const deleteTodo = async (id: string) => {
      try {
        await deleteDoc(doc(db, "todos", id));
        showModal.value = false;
      } catch (err) {
        console.log(err);
      }
    };
    return {
      addTodo,
      title,
      deleteTodo,
      isAuthenticated,
      currentTodo,
      user,
      todos,
      viewDetails,
      showModal,
      editable,
      updateTodo,
    };
  },
});
</script>

<style scoped>
.app {
  background-image: url("https://source.unsplash.com/1018x1000");
}
.card {
  backdrop-filter: blur(5px);
}
</style>