<template>
  <div class="blog-card-wrap">
      <div class="blog-cards container">
          <div class="toggle-edit">
              <span>Toggle Editing Post</span>
              <input type="checkbox" v-model="editPost">
          </div>
          <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index"/>
      </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue"
export default {

    name:"blogs",
    components:{
        BlogCard
    },
    data() {
        return {
            
        }
    },
    computed:{
        blogPosts(){
            return this.$store.state.blogPosts;
        },
        editPost:{
            get(){
                return this.$store.state.editPost;
            },
            set(payload){
                this.$store.commit("toggleEditPost", payload);
            }
        }
    },
    beforeDestroy(){
        this.$store.commit("toggleEditPost",false);
    }
    
}
</script>

<style lang="scss" scoped>

.blog-cards{
    position: relative;
    .toggle-edit {
        display:flex;
        flex-direction:row;
        align-items:center;
        position:absolute;
        top: -70px;
        right:50px;
        span{
            margin-right: 16px;
        }
        input[type="checkbox"]{
            position: relative;
        
            appearance: none;
            background-color: #fff;

            width:80px;
            height:30px;
            border-radius:20px;
            box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06);
        }

        input[type="checkbox"]::before{
            content:"";
            position:absolute;
            width:30px;
            height:30px;
            border-radius:20px;
            top:0;
            left:0;
            background-color:#303030;
            transform:scale(1.1);
            transition:0.75s ease all;
            box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06);
        }
        input:checked[type="checkbox"]::before{
            background-color: white;
            left:52px;
        }

    }
}


</style>