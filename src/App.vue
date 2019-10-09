<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import NewProduct from './components/NewProduct';
export default {
  name: 'app',
  components: {
    Navbar,
    NewProduct
  }
}
</script>

<style>
  nav {
    margin-bottom:10px;
  }
</style>