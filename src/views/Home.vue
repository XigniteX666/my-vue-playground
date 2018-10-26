<template>
  <div class="home">
    <Header />
      Wecome to my commerce tools demo project
    <Footer />
  </div>
</template>

<script>

import Header from '../components/Header'
import Footer from '../components/Footer'


export default {
  name: 'home',
  components: {
    Header,
    Footer
  }
}
</script>
