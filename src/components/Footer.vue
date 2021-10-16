<template>
    <footer>
        <div class="container">

            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{name:'Home'}">FireBlogs</router-link>
                    <ul>
                        <li>
                            <a href="#"><youtube class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><twitter class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><instagram class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><linkedin class="svg-icon"/></a>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul>
                        <router-link class="link" :to="{name:'Home'}">Home</router-link>
                        <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
                        <router-link v-if="admin" class="link" :to="{name:'CreatePost'}">Create Post</router-link>
                        <router-link v-if="!user" class="link" :to="{name:'Login'}">Login / Register</router-link>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>Copyright 2021 All Rights Reserved</p>
            </div>

        </div>
    </footer>

</template>

<script>
import youtube from "../assets/Icons/youtube-brands.svg";
import twitter from "../assets/Icons/twitter-brands.svg";
import instagram from "../assets/Icons/instagram-brands.svg";
import linkedin from "../assets/Icons/linkedin-brands.svg";
export default {
    
    name:"footer",
    components:{
        youtube,
        twitter,
        instagram,
        linkedin
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
    footer {
        background-color: #303030;
        margin-top: auto;
        .container{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            padding-right:0px;
            padding-top:100px;
            padding-bottom:100px;
             @media (max-width: 750px) {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding-left:0;
               
            }
            .left{
                flex:0.6;
                display: flex;
                align-items: flex-end;
                @media (max-width: 750px) {
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .col-1{
                    display: flex;
                    flex-direction: column;
                    @media (max-width: 750px) {
                        flex-direction: column;
                        align-items:center;
                        
                    }
                    .header{
                        color: white;
                        @media (max-width: 750px) {
                            margin-bottom: 10px;;
                        }
                    }
                    ul{
                        padding: 0;
                        display: flex;
                        li{
                            
                            list-style: none;
                            .svg-icon{
                                height:24px;
                                width: 24px;
                                color:white;
                        
                            }
                            margin-right: 16px;
                        }
                        li:last-child{
                            margin-right:0;
                        }
                        
                    }
                }
                .col-2 {

                    ul {
                        display: flex;
                        flex-direction:column;
                        margin-top: 0;
                        @media (max-width: 750px) {
                            flex-direction: row;
                            align-items:center;
                           
                            padding: 0;
                            margin-top: 10px;
                            a{
                                margin-right:10px;
                            }
                            a:last-child{
                                margin-right:0;
                            }
                            
 
                        }
                        a {
                            color: white;
                        }
                    }
                    
                }
            }
            .right{
                color:white;
                flex:0.3;
                margin-right: 10px;
                @media (max-width: 750px) {
                    margin-right: 0px;
                    p{
                        text-align: center;
                        
                    }
                }
                p{
                    width: 100%;
                    font-size:12px;
                    text-align: end;
                    
                    
                }
            }
        }
        



    }
</style>