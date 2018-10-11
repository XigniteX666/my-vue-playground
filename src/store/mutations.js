import Vue from 'vue'

export default {

    change(state, flavor) {
        state.flavor = flavor
      },

      increment(state){
          state.count++;
      },

      add: (state, n) => state.count += n,

      setToken(state, token) {
          state.token = token
      },

    setCategories(state, categories){
        state.categories = categories
    },

    setProduct(state, product){
        state.product = product
    }


}