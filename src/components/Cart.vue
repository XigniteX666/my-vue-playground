<template>
    <div>
        <h2>My cart</h2>
        Here should be my cart details ;-)
        <div v-if="this.$store.getters.cart.id != null">
            <table> 
                 <tr v-for = "line in cartdetails.lineItems" :key="line.id">
                    <td>{{ line.quantity }}</td>
                     <td> {{ line.name }} </td>
                     <td> {{ line.totalPrice.currencyCode }} </td>
                     <td align=right> {{ line.totalPrice.centAmount / 100 }}</td>
                </tr>       
            </table>
        </div>
        <button v-if="this.$store.getters.cart.id == null" v-on:click="createCart">Create a cart</button><br/>
        <button v-if="this.$store.getters.cart.id != null" v-on:click="updateCart">Checkout</button><br/>
    </div>
</template>

<script>
import gql from 'graphql-tag';


export default {
 name: 'cart',
 computed:{
        cartdetails(){
          return this.$store.getters.cart;
        }
},
 methods:{
    createCart() {
        console.log("creating a cart");
        const result = this.$apollo.mutate({
            mutation: gql`mutation createCart($cart: CartDraft!) {
                      createCart(draft: $cart) {
                            id
                            version
                        }
                    }`,
            // Parameters
            variables: {
                cart:{
                    currency: "EUR"
                }   
            },
        }).then((data) => this.$store.commit('setCart', data.data.createCart))
     },
     updateCart(){
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
                        productId: "569d5da1-890d-4d21-914c-e1050336bd57",
                        quantity: 1
                    }
                }]
            }  
        }).then((data) =>{
            console.log(data);
            this.$store.commit('setCart', data.data.updateCart)
        })
     }
 }
}
</script>

<style>

</style>
