<template>
    <div class="searchBox">
        searchBox:  <input name="searchTerm" v-model="searhTerm"><button v-on:click="searchQL">Search</button>       
       
        <SearchResults v-if="results !=null" v-bind:searchResults = this.results />
    </div>
</template>

<script>

import gql from 'graphql-tag';
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
        searchQL:function(){
            let searchTerm = this.searhTerm;
            console.log("Searching for: " + searchTerm);
            const result3 = this.$apollo.query({
                query: gql`query searchProducts($locale: Locale!, $where: String, $maxNr: Int = 10, $currency:Currency!) {
                            products(limit: $maxNr, where: $where) {
                                count
                                results{
                                    id
                                    masterData{
                                        current{
                                           name(locale:$locale)
                                           description(locale:$locale)
                                           masterVariant{
                                               images{
                                                   url
                                               }
                                               price(currency: $currency){
                                                    value{
                                                    ...printPrice
                                                }
                                            }
                                           }
                                        }
                                    }
                                }
                            }
                        }
                        fragment printPrice on BaseMoney{
          centAmount
          fractionDigits
        }`,
                        // Parameters
                        variables: {
                            where: "masterData(current(description(en = \"" + searchTerm + "\") or name(en=\"" + searchTerm + "\")))",
                            locale: "EN",
                            currency: "EUR"
                        }  
        }).then((data) =>{
            console.log(data);
            this.results = data.data.products
            
        })
    }
        
    }
}
</script>

<style>

</style>
