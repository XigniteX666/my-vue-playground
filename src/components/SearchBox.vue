<template>
    <div class="searchBox">
        searchBox:  <input name="searchTerm" v-model="searhTerm"><button v-on:click="search">Search</button>       
        <SearchResults v-if="results !=null" v-bind:searchResults = this.results.data />
    </div>
</template>

<script>
import axios from 'axios'
import SearchResults from './SearchResults'

export default {
    name: 'SearchBox',
    components: {
        SearchResults  
    },
    props: {
        searhTerm: {
            type: String,
            required: false
        },
        results: {
           
        }
    },
    data(){
        return{
             
        }
    },
    methods:{
        search:function(){       
            let config = {
                headers: {
                    'Authorization':'Bearer ' + this.$store.getters.token
                    }
            }
            axios
                .get("https://api.sphere.io/myplayground-68/product-projections/search?staged=false&fuzzy=true&text.en="+ this.searhTerm, config)
                //.then(response => this.$store.commit('setSearchResults', response))
                .then(response => this.results = response)
        }
    }

}
</script>

<style>

</style>
