<template>
    <div v-if="cartdetails != null">
        
       Cart details <br/>
         <span v-for = "line in cartdetails.lineItems" :key="line.id">
           {{ line.quantity }} X {{ line.name }} <br/>
        </span><br/>
        {{ cartdetails.totalPrice.currencyCode }} - {{ cartdetails.totalPrice.centAmount }} 
    </div>
</template>

<script>
export default {

    computed:{
        cartdetails(){
          return this.$store.getters.cart;
        }
    }
}
</script>

<style>

</style>
