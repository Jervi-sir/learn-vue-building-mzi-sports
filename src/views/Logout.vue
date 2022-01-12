<template>
  <div class="about">
    <h1>Page for logout</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    name: 'Logout',
    data () {
        return {
        }
    },
    methods: {
      logout () { 
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log('loggedout');
          console.log(getAuth().currentUser);
          // Sign-out successful.
        }).catch((error) => {
          console.log(error);
        });
      },
    },
    mounted() {
        console.log(getAuth());
    },
    
}
</script>