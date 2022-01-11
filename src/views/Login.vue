<template>
    <div class="body">
        <div class="form">
            <div class="logo">
                <img src="images/logs_logo.svg" alt="mzi sports">
            </div>
            <input v-model="email" type="email" placeholder="Email">
            <input v-model="password" type="password" placeholder="Password">
            <div class="forgot">
                Forgot password?
            </div>
            <button @click="register">Login</button>
        </div>
        <footer>
            <span>Don’t have an account?</span>
            <router-link to="/register" class="bold"> SingUp</router-link>
        </footer>
    </div>
</template>

<style scoped>
body {
    margin: 0;
}
.form {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    transform: translate(0%, 50%);
}

.logo {
    margin-bottom: 2rem;
    text-align: center;
}

input {
    background: rgba(196, 196, 196, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    height: 2.5rem;
    padding-left: 1rem;
    margin-bottom: 1rem;
}

.forgot {
    color: #000000;
    text-align: end;
    font-weight: 600;
    font-size: 0.8rem;
}

button {
    background: #000000;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    color: white;
    padding: 0.7rem;
    margin-top: 1rem;
}

footer {
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
    border-top: 1.5px solid black;
    padding: 0.5rem;
    font-size: .8rem;
    margin: 0;
}

.bold {
    font-weight: 700;
    text-decoration: none;
    color: #000000;
}

</style>

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