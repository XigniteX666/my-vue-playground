<template>
  <div class="home">
    <Header />
      Wecome to my commerce tools demo project {{$t('main.header.search') }}
      <button v-on:click="getContent()">getContent</button>
       <div class="mb-3 mb-md-5 mx-auto text-center">
      
        <h1 class="display-4">{{ title }}</h1>
        <p class="lead">
         {{ intro }}
        </p>
      </div>
    
    <Footer />
  </div>
</template>

<script>

import Header from '../components/Header'
import Footer from '../components/Footer'
import { HOME } from '@/content/landingpage';
import landingPageModel, {LandingPage} from '@/content/landingpage';


export default {
  name: 'home',
  components: {
    Header,
    Footer
  },
  data() {
        return {
          title : '',
          intro: ''
        }
  },
  methods:{
    async getContent(){
      let result = new LandingPage();
      result = await landingPageModel.get(HOME); // wait till the promise resolves (*)
      this.title = result.title;
      this.intro = result.text;
    }
  },
  //   computed:{
  //     title(){
  //       return result.title;
  //     }
    
  // }
}
</script>
