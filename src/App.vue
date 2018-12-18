<template>
  <div class="container">
      <div id="app">
        <Component1></Component1>
        </div>
  </div>
</template>

<script>
  import Component1 from './components/Component1.vue'
  import '../node_modules/bootstrap/scss/bootstrap.scss';
  import '../public/style.scss';

  export default {
    name: 'app',
    components: {
      Component1
    }
  }
</script>