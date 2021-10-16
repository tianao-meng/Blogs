<template>
  <div class="post-view">
      <div class="container quillWrapper">
        <h2>{{this.blogTitle}}</h2>
        <img :src="blogCoverPhoto" alt="">
        <div class="post-content ql-editor" v-html="blogHTML">

        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"BlogPreview",
    computed:{
        blogTitle(){
            return this.$store.state.blogTitle;
        },
        blogCoverPhoto(){
            return this.$store.state.blogPhotoFileURL;
        },
        blogHTML(){
            return this.$store.state.blogHTML;
        },
    }
}
</script>

<style lang="scss">

.post-view {
    min-height: 100%;

    .container{
        max-width:1000px;
        padding: 0px 25px 60px;

    }

    h2{
        margin-bottom: 16px;
        font-weight: 300;
        font-size:32px;
    }

    img{
        // width: 200px;
        width: 100%;
        // height: 100%;
        
        margin-bottom: 32px;
    }

    .ql-editor{
        padding: 0;
    }
}

</style>