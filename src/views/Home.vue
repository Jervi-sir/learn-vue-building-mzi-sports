<template>
  <div class="home">
    <Menu></Menu>
    <div class="post-container">
      <div class="post" v-for="(post, index) in posts" :key="index">
        <div class="profile">
          <img src="" alt="">
          <div class="details">
            <h4>Username</h4>
            <h6>follow</h6>
          </div>
        </div>
        <div class="image">
          <img :src="post.thumbnail" alt="">
        </div>
        <div class="stats">
          <button v-if="post.liked" class="heart" @click="unlike(post.post_id, index)">
            <img src="images/heart_full.svg" alt="">
          </button>
          <button v-if="!post.liked" class="heart" @click="like(post.post_id, index)">
            <img src="images/heart_empty.svg" alt="">
          </button>
          <span class="created-at">{{ post.created_at }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { collection, getDocs, getDoc, getFirestore, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import Menu from '../views/Menu.vue'
import timeDifference from '../helpers/tools'

export default {
  name: 'Home',
  components: {
    Menu,
  }, 
  data() {
    return {
      posts: [],
      auth: '',
      userLikes: [],
    }
  },

  methods: {
    like (uid, index) { 
      this.posts[index].liked = true;
      updateDoc(doc(getFirestore(), "userLikes", this.auth), {
          post_id: arrayUnion(uid),
      }).then(() => {
        this.posts[index].nb_likes++;
      });
    },
    unlike (uid, index) { 
      this.posts[index].liked = false;
      updateDoc(doc(getFirestore(), "userLikes", this.auth), {
          post_id: arrayRemove(uid),
      }).then(() => {
        this.posts[index].nb_likes--;
      });
    },
    
  },

  created() {  
    this.auth = localStorage.getItem('user_id');
  },

  async mounted() {
    const db = getFirestore();

    const userLikesDoc = await getDoc(doc(db, "userLikes", this.auth));
    const userLikes = userLikesDoc.data().post_id;
    const querySnapshot =await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      var post = doc.data();
      const userRef = doc(db, 'users', post.user_id);

      getDoc(userRef).then((res) => {
        console.log(res.data(), res.id);
      })

      this.posts.push({
        post_id: doc.id,
        user_id: post.user_id,
        url: post.url,
        thumbnail: post.thumbnail,
        tags: post.tags,
        resource_type: post.resource_type,
        location: post.location,
        description: post.description,
        nb_likes: post.nb_likes,
        nb_comments: post.nb_comments,
        nb_views: post.nb_views,
        liked: userLikes.includes(doc.id) ? true : false,
        created_at: timeDifference(post.created_at) 
      });
      //console.log(`${doc.id} => ${doc.data().user_id}`);
    });

  },
  


}
</script>

<style scoped>

.profile .details h4, .profile .details h6 {
  margin: 0;
}

.image img {
  width: 100%;
}
.stats {
  display: flex;
  align-items: center;
}
button {
  background: transparent;
  border: none;
}
</style>

