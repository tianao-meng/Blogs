<template>
  <header class="container">
    <nav>
        <div  class="branding">
            <router-link class="header" :to="{name:'Home'}">FireBlogs</router-link>
        </div>
      
        <ul class="nav-links" v-show="!mobile">
            <router-link class="link" :to="{name:'Home'}">Home</router-link>
            <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
            <router-link v-if="admin" class="link" :to="{name:'CreatePost'}">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{name:'Login'}">Login/Register</router-link>
            <div v-if="user" class="profile" @click="toggleProfileMenu" ref="profile">
                <span>{{this.$store.state.profileInitials}}</span>
                <div class="profile-menu" v-show="profileMenu">
                    <div class="info">
                        <p class="initials">{{this.$store.state.profileInitials}}</p>
                        <div class="right">
                            <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                            <p>{{this.$store.state.profileUsername}}</p>
                            <p>{{this.$store.state.profileEmail}}</p>
                        </div>
                    </div>

                    <div class="options">
                        <div class="option">
                            <router-link class="option" :to="{name:'Profile'}">
                                <userIcon class="icon"/>
                                <p>Profile</p>
                            </router-link>
                        </div>
                        <div v-if="admin" class="option">
                            <router-link class="option" :to="{name:'Admin'}">
                                <adminIcon class="icon"/>
                                <p>Admin</p>
                            </router-link>
                        </div>
                        <div @click="signOut" class="option">
                            
                                <signOutIcon class="icon"/>
                                <p>Sign Out</p>
                       
                        </div>
                    </div>

                </div>
            </div>
        </ul>


      
    </nav>

    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
    <transition name="mobile-nav">
        
        <ul class="mobile-nav-links" v-show="mobileNav">
            <router-link class="link" :to="{name:'Home'}">Home</router-link>
            <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
            <router-link v-if="admin" class="link" :to="{name:'CreatePost'}">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{name:'Login'}">Login/Register</router-link>
        </ul>
        
    </transition>
  </header>
  
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import firebase from "firebase/app";
// import "firebase/auth";
export default {
    name:"navigation",
    components:{
        menuIcon,
        userIcon,
        adminIcon,
        signOutIcon
    },
    data(){
        return {
            mobile:null,
            mobileNav:null,
            windowWidth:null,
            profileMenu:false
        }
    },
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },

    methods:{
        checkScreen(){
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750){
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        toggleMobileNav () {
            this.mobileNav = !this.mobileNav;
        },

        toggleProfileMenu(e){
            if(e.target === this.$refs.profile){
                this.profileMenu = !this.profileMenu;
            }
            
        },

        signOut(){
            firebase.auth().signOut();
            window.location.reload();
        }


    },
    computed:{
        user(){
            return this.$store.state.user;
        },
        admin(){
            return this.$store.state.profileAdmin;
        } 
    }
}
</script>

<style lang="scss" scoped>

    header {
        position: relative;
        width: 100vw;
        box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06);
        nav{
            display:flex;
            align-items: flex-start;
            justify-content: space-between;

            .nav-links{
                margin-top: 0;
                display: flex;
                flex-direction:row;
                align-items: center;
                & :not(:first-child){
                    margin-left:10px;
                }
                .link{
                    
                    transition: 0.3s color ease;

                    &:hover{
                        color: #1eb8b8;
                    }
                }

                .profile{
                     position: relative;
                     cursor: pointer;
                     display: flex;
                     
                     align-items: center;
                     justify-content:center;
                     width:40px;
                     height:40px;
                     border-radius:50%;
                     color:white;
                     background-color: #303030;

                     span{
                         pointer-events:none;
                     }

                     .profile-menu{
                        position:absolute;
                        top:60px;
                        right: 0;
                        width:250px;
                        background-color: #303030;
                        box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06);
                        z-index: 2;
                        .info{
                            display: flex;
                            align-items: center;
                            padding:15px;
                            border-bottom:1px solid #fff;
                            .initials{
                                
                                width:40px;
                                height:40px;
                                background-color: #fff;
                                color: #303030;
                                display: flex;
                                align-items:center;
                                justify-content: center;
                                border-radius: 30%;
                            }

                            .right{
                                flex:1;
                                margin-left: 24px;
                                p:nth-child(1){
                                    font-size: 14px;
                                
                                }


                                p:nth-child(2),p:nth-child(3){
                                    font-size: 12px;
                                    margin-left: 0;
                                }
                            }

    
                        }

                        .options{
                            padding: 15px;
                            .option{
                                text-decoration: none;
                                color:#fff;
                                display: flex;
                                align-items:center;
                                

                                .icon{
                                    width:18px;
                                   
                                }

                                p{
                                    font-size: 14px;
                                    margin-left: 12px;
                                }
                            }
                            .option:nth-child(2),.option:nth-child(3){
                                margin-left: 0;
                                
                            }
                            .option:nth-child(3){
                                margin-bottom: 0;
                            }
                            
                        }


                     }
                     
                }
                
            }
        }
        .menu-icon {
            cursor: pointer;
            height:18px;
            width:18px;
            position: absolute;
            right:10px;
            top: 50px;
        }
        .mobile-nav-links{
            padding:20px;
            margin-top:0;
            background-color: #303030;
            width:70%;
            max-width: 250px;
            display:flex;
            flex-direction: column;
            position: fixed;
            top:0;
            left:0;
            height: 100vh;
            z-index: 100;
            .link{
                padding:15px 0;
                color:white;
            }

        }
        .mobile-nav-enter-active,
        .mobile-nav-leave-active{
            transition: all 1s ease;
            
        }

        .mobile-nav-enter{
            transform: translateX(-250px);
        }
        .mobile-nav-enter-to{
            transform: translateX(0px);
        }
        .mobile-nav-leave-from{
            transform: translateX(0px);
        }
        .mobile-nav-leave-to{
            transform: translateX(-250px);
        }
    }

</style>