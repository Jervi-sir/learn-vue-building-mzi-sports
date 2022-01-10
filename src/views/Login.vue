<template>
    <div>
        <input v-model="email" type="email" >
        <br>
        <input v-model="password" type="password" >
        <br>
        <button @click="register">Login</button>
    </div>
</template>


<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  
    name: 'Login',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        register () { 
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        },
    },
    mounted() {
        console.log(getAuth());
    },
    
}
</script>