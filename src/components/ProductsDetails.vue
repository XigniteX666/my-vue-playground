<template>
    <div>
        <div>
            <h1>Product information</h1>
            {{ product.masterData.current.name }}<br/>
            {{ product.masterData.current.description }}<br/>
           <img v-bind:src= product.masterData.current.masterVariant.images[0].url v-if="product.masterData.current.masterVariant.images[0] !=null"/> <br/>
           <button v-on:click="addToCart(id)">Add a cart</button><br/>
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

         const result3 = this.$apollo.mutate({
            mutation: gql`mutation addProductToCart($cartId: String!, $version: Long!,$actions: [CartUpdateAction!]!){
                            updateCart(id: $cartId, version: $version, actions:$actions){
                                id
                                version
  	                            lineItems {
                                    id
                                    quantity
                                    productId
                                    name(locale:"EN")
                                    productSlug(locale:"EN")
  	                            }
                                totalPrice{
                                    currencyCode
                                    centAmount
                                }
                            }
                        }`,
            // Parameters
            variables: {
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
            console.log(data);
            this.$store.commit('setCart', data.data.updateCart)
        })
        }
    },
    apollo: {
        product: {
      query: gql`    
        query getproduct($productId: String!, $locale: Locale!) {
            product(id: $productId) {
                masterData {
                    current {
                        name(locale: $locale)
                        description(locale: $locale)
                        masterVariant{
                            images{
                                url
                            }
                        }
                    }
                }
            }
        }`
    ,
    variables(){
          return {
            locale: "EN",
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
