<template>
    <div>
        <div v-if="product !=null">
            <h2>Product information</h2>
            <h3>{{ product.masterData.current.name }}</h3>
            {{ product.masterData.current.description }}<br/><br/><br/>
            Price: {{ product.masterData.current.masterVariant.price.value.centAmount / 100 }}<button v-if="this.$store.getters.cart.id !=null" v-on:click="addToCart(id)">Add a cart</button><br/>
           <img v-bind:src= product.masterData.current.masterVariant.images[0].url v-if="product.masterData.current.masterVariant.images[0] !=null"/> <br/>
           
        </div>
          
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'ProductDetails', 
    props:{
        id:{
            type: String,
            required: true
        }
    }, 
    data(){
     return {
        product:{}        
       }
    }, 
    methods:{
     
        addToCart(productId){

         console.log("updating cart "+this.$store.getters.cart.id + ", version: " + this.$store.getters.cart.version);
         let cartId = this.$store.getters.cart.id;
         let version = this.$store.getters.cart.version;

            this.$apollo.mutate({
                mutation: gql`mutation addProductToCart($cartId: String!, $version: Long!,$actions: [CartUpdateAction!]!, $locale: Locale!){
                                updateCart(id: $cartId, version: $version, actions:$actions){
                                    id
                                    version
                                    lineItems {
                                        id
                                        quantity
                                        productId
                                        name(locale:$locale)
                                        productSlug(locale:$locale)
                                        totalPrice{
                                            centAmount
                                            currencyCode
                                        }
                                    }
                                    totalPrice{
                                        currencyCode
                                        centAmount
                                    }
                                }
                            }`,
                // Parameters
                variables: {
                    locale: this.$store.getters.language,
                    cartId:cartId,
                    version: version,
                    actions: [{
                        addLineItem: {
                            productId: productId,
                            quantity: 1
                        }
                    }]
                }  
            }).then((data) =>{
                this.$store.commit('setCart', data.data.updateCart)
            }).catch((error) =>{
                console.log(error)
            })
        }
    }
    ,
    apollo: {
        product: {
      query: gql`    
        query getproduct($productId: String!, $locale: Locale!, $currency: Currency!) {
            product(id: $productId) {
                masterData {
                    current {
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
        fragment printPrice on BaseMoney{
          centAmount
          fractionDigits
        }`
    ,
    variables(){
          return {
            locale: this.$store.getters.language,
            currency: "EUR",
            productId: this.id,
          }
        }
    }
  }
}
</script>

<style>

</style>
