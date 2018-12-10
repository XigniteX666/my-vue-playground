<template>
  <div> 
      Cart details <br/> 
    <div v-if="cartdetails != null">
        <table border="0">
            
         <tr v-for = "line in cartdetails.lineItems" :key="line.id">
           <td>{{ line.quantity }}</td> <td> {{ line.name }} </td><td> {{ line.totalPrice.currencyCode }} </td><td align=right> {{ line.totalPrice.centAmount / 100 }}</td><br/>
        </tr>
        <tr><td colspan="4">Total: {{ cartdetails.totalPrice.currencyCode }} - {{ cartdetails.totalPrice.centAmount / 100 }} </td></tr>
        </table>
        <button v-on:click="checkout">Checkout</button>
    </div>
    <div v-else>
        No details
    </div>
  </div>
    
</template>

<script>
export default {
    methods:{
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        checkout(){
            console.log("Checking out...");
            this.$router.push('/checkout')
        }
    },
    computed:{
        cartdetails(){
          return this.$store.getters.cart;
        }
    }
}
</script>

<style>

</style>
