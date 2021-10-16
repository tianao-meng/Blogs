<template>
  <div id="app" v-if="this.$store.state.postLoaded">
    <Navigation class="navigation" v-if="!navigation" />
    <router-view/>
    <Footer v-if="!navigation"/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name:"app",
  components:{Navigation,Footer},
  data(){
    return{
      navigation:null,
    }
  },
  updated(){
    console.log(this.$store.state.user);
    console.log(this.$store.state.profileFirstName)
  },
  async created(){
    // rerender whole?.....
    // firebase.auth().onAuthStateChanged((user) => {

      this.$store.commit("updateUser", firebase.auth().currentUser);
      if(firebase.auth().currentUser) {
        // const token = await firebase.auth().currentUser.getIdTokenResult();
        // console.log(token.claims);
        this.$store.dispatch("getCurrentUser",firebase.auth().currentUser);
      }
    // })

    this.checkRoute();
    this.$store.dispatch("getPost");
    
  },

  methods:{
    checkRoute(){
      if((this.$route.name === "Login") || (this.$route.name === "Register") || (this.$route.name === "ForgotPassword")){
        this.navigation = true;
        console.log("in route check true");
        return;
      }
      this.navigation = false;
      console.log("in route check false");
      return;
    }
  },
  watch:{
    $route(){
      this.checkRoute();
    }
  },
}
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }
  body {
    margin:0;
  }

  #app{
    font-family:'Times New Roman', Times, serif;
    font-weight: 400;
    max-width: 100%;
    margin: 0;
    min-height:100vh;
    display: flex;
    flex-direction: column;
  }

  .container {
    width: 1200px;
    max-width: 100%;
    margin: 0 auto;
    padding: 50px;
  }
  .header{
    font-size:24px;
    text-decoration: none;
    color:black;
    font-weight: 600;
  }

  .link{
    text-decoration: none;
    font-size: 18px;
    color:black;
    font-weight:300;
  }
  .link-light{
    color: #fff;
  }

  .arrow {
    margin-left:8px;
    width:12px;
    path {
      fill: black;
    }
  }
  
  .arrow-light{
    path{
      fill:white;
    }
  }

  .blog-card-wrap{
    position: relative;
    padding:80px 16px;
    background-color: #f1f1f1;
    @media(min-width: 500px){
      padding:100px 16px;
    }

    .blog-cards{
      display:grid;
      gap:32px;
      grid-template-columns: 1fr;
      @media(min-width: 500px){
        grid-template-columns: repeat(2, 1fr);
      }
      @media(min-width: 900px){
        grid-template-columns: repeat(3, 1fr);
      }
      @media(min-width: 1200px){
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  button,
  .router-button{
    
    cursor: pointer;
    padding:12px 24px;
    margin-top: 24px;
    background-color: #303030;
    color:white;
    border-radius:20px;
    border: none;
    text-transform: uppercase;
   
    
    transition:0.5s ease all;
    &:focus{
      outline: none;
    }

    &:hover{
      background-color:rgba(48, 48, 48,0.7)
    }
    
  }

  .button-ghost{
    color:#000;
    padding: 0;
    border-radius:0;
    margin-top: 50px;
    font-size:15px;
    font-weight:500;
    background-color: transparent;
    @media(min-width: 700px){
      margin-top: 0;
      margin-left: auto;
    }

    i {
      margin-left: 8px;
    }
  }

  .button-light{
    background-color:transparent;
    border: 2px solid white;
    color:white;
  }

  .error{
    text-align: center;
    font-size:12px;
    color: red;
  }

</style>
