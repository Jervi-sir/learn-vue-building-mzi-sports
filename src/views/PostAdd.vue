<template>
  <div>
    <div v-show="showProgress">
        <progress-bar :options="options" :value="progress" />
    </div>

    <div>
        <label for="description-input">description:</label>
        <input id="description-input" v-model="description" placeholder="description" />
        <br>
        <label for="tags-input">tags:</label>
        <input id="tags-input" v-model="tags" placeholder="tags" />
        <br>
        <label for="location-input">location:</label>
        <input id="location-input" v-model="location" placeholder="location" />
        <br>
        <label for="file-input">Upload:</label>
        <input id="file-input" type="file" accept="video/*, image/*" @change="handleFileChange($event)" />
        <br>
        <button type="submit" @click="upload" :disabled="filesSelected < 1">Upload</button>
    </div>

    <!-- display uploaded image if successful -->
    <section v-if="results && results.secure_url">
      <img :src="results.secure_url" :alt="results.public_id" />
    </section>

    <!-- display errors if not successful -->
    <section>
      <ul v-if="errors.length > 0">
        <li v-for="(error,index) in errors" :key="index">{{error}}</li>
      </ul>
    </section>
    {{auth}}
  </div>
</template>

<script>
import axios from "axios";
import ProgressBar from "vuejs-progress-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, setDoc, doc, arrayUnion, collection, getFirestore } from "firebase/firestore"; 

export default {
  name: "PostAdd",
  components: {
    ProgressBar
  },
  data() {
    const progressBarOptions = {
      text: { shadowColor: "black", fontSize: 14, fontFamily: "Helvetica", dynamicPosition: true },
      progress: {  color: "#E8C401", backgroundColor: "#000000" },
      layout: { height: 35, width: 140, type: "line", progressPadding: 0, verticalTextAlign: 63 }
    };
    return {
      results: null, file: null,
      errors: [],
      filesSelected: 0,
      cloudName: "dbnslnawc",
      preset: "images",
      mediaTags: "browser-upload",
      progress: 0,
      showProgress: false,
      options: progressBarOptions,
      fileContents: null,
      formData: null,
      auth: '',
      description: '',
      tags: '',
      location: '',
      type: '',
    };
  },
  methods: {
    // function to handle file info obtained from local
    // file system and set the file state
    handleFileChange: function(event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.type = this.file.type.split('/')[0];
      console.log("type", this.type);
      this.filesSelected = event.target.files.length;
    },
    prepareFormData: function() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.type + 's');
      this.formData.append("tags", this.mediaTags); // Optional - add tag for image admin in Cloudinary
      this.formData.append("file", this.fileContents);
      this.formData.append("quality", 'auto');
    },
    // function to handle form submit
    upload: function() {
      //no need to look at selected files if there is no cloudname or preset
      if (this.preset.length < 1 || this.cloudName.length < 1) {
        this.errors.push("You must enter a cloud name and preset to upload");
        return;
      }
      // clear errors
      else {
        this.errors = [];
      }
      console.log("upload", this.file.name);
      let reader = new FileReader();
      // attach listener to be called when data from file
      reader.addEventListener(
        "load",
        function() {
          this.fileContents = reader.result;
          this.prepareFormData();
          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: this.formData,
            onUploadProgress: function(progressEvent) {
              console.log("progress", progressEvent);
              this.progress = Math.round(
                (progressEvent.loaded * 100.0) / progressEvent.total
              );
              console.log(this.progress);
            //bind "this" to access vue state during callback
            }.bind(this)
          };
          //show progress bar at beginning of post
          this.showProgress = true;
          axios(requestObj)
            .then(response => {
              this.results = response.data;
              console.log(this.results);
              console.log("public_id", this.results.public_id);

              addDoc(collection(getFirestore(), "posts"), {
                user_id: this.auth,
                url: this.results.secure_url,
                public_id: this.results.public_id,
                resource_type: this.results.resource_type,
                thumbnail: this.results.secure_url.replace('.' + this.results.format, '.jpg'),
                description: this.description,
                location: this.description,
                tags: this.tags,
                nb_likes: 0,
                nb_comments: 0,
                nb_views: 0,
              });

              setDoc(doc(getFirestore(), "postLikes", this.auth.uid), {
                  user_id: arrayUnion(0),
              })

            })
            .catch(error => {
              this.errors.push(error);
              console.log(this.error);
            })
            .finally(() => {
              setTimeout(
                function() {
                  this.showProgress = false;
                }.bind(this),
                1000
              );
            });
        }.bind(this),
        false
      );
      // call for file read if there is a file
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.auth = user.uid;
      } else {
        // ...
      }
    });

  },
};
</script>