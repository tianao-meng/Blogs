import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
// import "firebase/auth"
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    blogPosts:[],
    postLoaded:null,
    blogHTML:"Write your blog here...",
    blogTitle:"",
    blogPhotoName:"",
    
    blogPhotoFileURL:null,
    blogPhotoPreview:null,
    editPost:null,
    user:null,
    profileAdmin:null,
    profileEmail:"",
    profileFirstName:"",
    profileLastName:"",
    profileUsername:"",
    profileId:"",
    profileInitials:null,

  },
  getters:{
    blogPostsFeed(state){
      return state.blogPosts.slice(0,2);
    },
    blogPostsCards(state){
      return state.blogPosts.slice(2, 6);
    }, 
  },
  mutations: {
    newBlogPost(state, payload){
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload){
      state.blogTitle = payload;
    },
    fileNameChange(state, payload){
      state.blogPhotoName = payload;
    },
    createFileURL(state,payload){
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {

      state.editPost=payload;
      console.log(payload);

    },
    updateUser(state,payload){
      console.log("update user");
      state.user = payload;
    },
    setProfileInfo(state, payload) {
      state.profileId = payload.id;
      console.log(payload.id);
      state.profileEmail = payload.data().email;
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().username;
    },
    setProfileInitials(state){
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") + 
      state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload){
      state.profileFirstName = payload;
    },
    changeLastName(state, payload){
      state.profileLastName = payload;
    },
    changeUserName(state, payload){
      state.profileUsername = payload;
    },
    setProfileAdmin(state, payload){
      state.profileAdmin = payload; 
      // console.log(state.profileAdmin);
    },
    filterBlogPost(state, payload){
      state.blogPosts = state.blogPosts.filter((post) => {
        return post.blogID !== payload;
      })
    },
    setBlogState(state, payload){
      state.blogHTML = payload.blogHTML;
      state.blogTitle = payload.blogTitle;
      state.blogPhotoName = payload.blogCoverPhotoName;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
    }

  },

  actions: {
    async getCurrentUser({commit},user){
      const database = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo",dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = token.claims.admin;
      commit("setProfileAdmin",admin);
    },

    async updateUserSettings({commit, state}){
      const database = await db.collection("users").doc(state.profileId);
      await database.update({
        firstName:state.profileFirstName,
        lastName:state.profileLastName,
        username:state.profileUsername,
      });
      commit("setProfileInitials");
    },
    async getPost({state}){
      const dataBase = await db.collection("blogPosts").orderBy("date","desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if(!state.blogPosts.some((post) => post.blogID === doc.id)){
          const data = {
            blogID:doc.data().blogID,
            blogHTML:doc.data().blogHTML,
            blogCoverPhoto:doc.data().blogCoverPhoto,
            blogTitle:doc.data().blogTitle,
            blogDate:doc.data().date,
            blogCoverPhotoName:doc.data().blogCoverPhotoName
          };
          state.blogPosts.push(data);
        }
      })
      state.postLoaded = true;
      console.log(state.blogPosts);
    },
    async deletePost({commit}, payload){
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit('filterBlogPost', payload);
    },
    async updatePost({commit, dispatch}, payload){
      commit('filterBlogPost', payload);
      await dispatch("getPost");
    }
  },
  modules: {
  }
})
