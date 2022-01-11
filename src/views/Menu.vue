<template>
    <div class="header">
      <div class="hamburger" @click="openMenu">
        <span></span><span></span><span></span>
      </div>
      <img alt="mzi sports" src="images/logo_home.svg" width="50%">
      <router-link to="/postadd"><img src="images/add.svg" alt="" class="add-btn"></router-link>
      <div id="menu" class="menu">
        <div class="close">
          <img src="images/x.svg" alt="" @click="closeMenu">
        </div>
        <div class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/register">Register</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/logout">Logout</router-link>
          <router-link to="/postadd">Post</router-link>
        </div>
      </div>
    </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 00%;
  left: -200%;
  right: 00%;
  bottom: 00%;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 99;
  transition: 0.5s;
}
.menu.show {
  left: 0%;
  transition: 0.5s;
}
.close {
  height: 4rem;
  display: flex;
  align-items: center;
}
.close img {
  width: 3rem;
}


.menu .top {
  height: 4rem;
}
.menu .nav {
  display: inline-flex;
  flex-direction: column;
  margin: auto;
}
.menu .nav a {
  margin-bottom: 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  margin-top: 1rem;
}
img.add-btn {
  height: 100%;
  width: 100%;
}
.hamburger {
  display: flex;
  flex-direction: column;
  width: 2rem;
  height: 1.5rem;
  justify-content: space-between;
}

.hamburger span  {
  width: 100%;
  height: 4px;
  border-radius: 2rem;
  background: black;
}
</style>

<script>
export default {
    name: 'Menu',
    methods: {
      openMenu () { 
        var menu = document.getElementById('menu');
        menu.classList.add('show');
      },
      closeMenu () { 
        var menu = document.getElementById('menu');
        menu.classList.remove('show');
      },
      
    },
}
</script>