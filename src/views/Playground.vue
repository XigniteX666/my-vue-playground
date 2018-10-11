<template>
  <div class="home">
    <Header />
    <my-first-component msg="Oskar" v-bind:seen="false" />
    <my-second-component msg="test"/>
    <Footer />
  </div>
</template>

<script>

import MyFirstComponent from '../components/MyFirstComponent.vue'
import MySecondComponent from '../components/MySecondComponent.vue'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  name: 'home',
  components: {
    Header,
    MyFirstComponent,
    MySecondComponent,
    Footer
  }
}
</script>
