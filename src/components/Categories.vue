<template>
    <div class=navbar navbar-fixed-top>
            <span v-for = "topLevelCategory in categories.results" :key="topLevelCategory.id" class="dropdown menu-large">
                <router-link :to="{ name: 'category', params: { categoryId: topLevelCategory.id } }"
                   class="dropdown-toggle">
                    {{ topLevelCategory.name }} | 
                </router-link>
            </span>
    </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag';

export default {
    name: 'Categories',
    data() {
        return {
            categories: {},
        };
    },
    methods:{
        getCategories: function() {
           
            let config = {
                headers: {
                    'Authorization':'Bearer ' + this.$store.getters.token
                    }
            }
            axios
                .get("https://api.sphere.io/myplayground-68/categories?where=parent%20is%20not%20defined&sort=orderHint%20asc", config)
                .then(response => this.categories = response.data.results)

        }
    },
    watch:{
         categories: function(newValue, oldValue){
             this.$store.commit('setCategories', newValue)
         }
     },
    apollo:{
         categories: {
      query: gql`
        {
            categories(limit: 100, where: "parent is not defined", sort: "orderHint asc") {
                results {
                    ...mainCategory
                    children {
                        ...subCategory
                        children {
                            ...subCategory
                        }
                    }
                }
            }
        }

        fragment mainCategory on Category {
            id
            name(locale: "EN")
            slug(locale: "EN")
            description(locale: "EN")
            ancestors {
                name(locale: "EN")
                slug(locale: "EN")
            }
        }

        fragment subCategory on Category{
            id
            name(locale: "EN")
            slug(locale: "EN")
            description(locale: "EN")
        }`,
      variables() {
        return {
          locale: "NL"//this.$i18n.locale,
        };
      }
    }
    }
  }




</script>

<style>
.navbar {
    min-height: 0;
}

.navbar-fixed-top {
    top: 0;
    border-width: 0 0 1px;
}
.navbar-fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
}
.navbar > li{
	position: relative;
	display: block
}
.menu-large{
	position: static !important;
}
</style>
