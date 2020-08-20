<template>
  <MyTable
    v-if="posts"
    title="Postagens"
    objectName="Postagem"
    :items="posts"
    :headers="headers"
    @save="savePost"
    @delete="deletePost"
  />
</template>

<script>
import postsAPI from "../api/posts";
import MyTable from "../components/MyTable";
export default {
  name: "Posts",

  components: {
    MyTable,
  },

  data() {
    return {
      posts: [],
      headers: [
        { text: "Título", value: "title" },
        { text: "Conteúdo", value: "body" },
      ],
    };
  },

  async mounted() {
    this.posts = await postsAPI.getPosts();
  },

  methods: {
    async savePost(post, index) {
      if (post.id) {
        const updatedPost = await postsAPI.updatePost(post);
        this.posts.splice(index, 1, updatedPost);
      } else {
        const newPost = await postsAPI.addPost(post);
        this.posts.push(newPost);
      }
    },

    async deletePost(post, index) {
      await postsAPI.deletePost(post.id);
      this.posts.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
