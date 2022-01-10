<template>
    <div>
        <input v-model="email" type="email" >
        <br>
        <input v-model="password" type="password" >
        <br>
        <button @click="register">Regsiter</button>
    </div>
</template>


<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore"; 

export default {
  
    name: 'Register',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        register () { 
        const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((cred) => {
                      return setDoc(doc(getFirestore(), "users", cred.user.uid), {
                            name: "",
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        },
    },
    
}
</script>