<template>
  <div></div>
</template>

<script>
  export default {
    name: "app",
    components: {},
    data() {
      return {};
    },
    mounted() {
        this.$store.dispatch('getFullMovieList');
    },
    methods: {},
    computed: {}
  };
</script>
