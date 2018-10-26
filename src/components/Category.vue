<template>
  <div>
    <h2>Category</h2>
        Products in this category: <br/>
        <Product  v-for = "product in products.results" v-bind:product = product :key="product.id"/>       
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Product from './Product'

export default {
    name: 'category',
    components:{
      Product
    },
    data() {
        return {
            products: {},
        };
    },
    props:{
        id:{
            type: String,
            required: false
        }
    },
  apollo: {
    products: {
      query: gql`    
        query listProducts($locale: Locale!, $currency: Currency!, $where: String, $maxNr: Int = 12) {
          products(limit: $maxNr, where: $where) {
            count
            results{
              id
              masterData{
                current{
                  name(locale: $locale)
                  description(locale: $locale)
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
        }
        `,
        variables(){
          return {
            locale: this.$store.getters.language,
            currency: "EUR",
            where: "masterData(current(categories(id=\"" + this.id + "\")))",
          }
        }
    }
  }
}
</script>

<style>

</style>
