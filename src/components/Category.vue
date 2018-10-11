<template>
  <div>
    <div>Category</div>
    Products: <br/>
      <span v-for = "product in products.results" :key="product.id">
        <product-info  v-bind:product = product />
      </span>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import productInfo from './ProductInfo'

export default {
    name: 'category',
    components:{
      productInfo
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
        query listProducts($locale: Locale!, $currency: Currency!, $where: String, $maxNr: Int = 1) {
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
            locale: "EN",
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
