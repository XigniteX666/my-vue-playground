<template>
<div>
    <ul v-if="active" class="nav-menu">
            <li v-for = "topLevelCategory in categories.results" :key="topLevelCategory.id" 
                @mouseover="hoverOnCategory(topLevelCategory)"
                @mouseleave="hoverOffCategory()">
                    <router-link :to="{ name: 'category', params: { categoryId: topLevelCategory.id } }">
                        {{ topLevelCategory.name }}
                    </router-link>
                    <ul v-if="isMenuOpen(topLevelCategory)">
                        <li>
                            <div>
                                <div v-for="category2ndLevel in topLevelCategory.children" :key="category2ndLevel.id">
                                    
                                        <router-link :to="{ name: 'category', params: { categoryId: category2ndLevel.id } }"
                                            @click.native="clickOnCategory()"
                                            data-test="category-2nd-level-link">
                                                {{category2ndLevel.name}}
                                        </router-link>
                                    
                                </div>
                            </div>
                        </li>
                    </ul>
            </li>
    </ul>
</div>
</template>

<script>

import gql from 'graphql-tag';

export default {
    name: 'Categories',
    data() {
        return {
            categories: {},
            someCategoryWasClicked: false,
            openCategoryMenu: ''
        };
    },
    methods:{
      isMenuOpen({ id }) {
        return !this.someCategoryWasClicked && this.openCategoryMenu === id;
        },
        clickOnCategory() {
            this.someCategoryWasClicked = true;
        },
        hoverOnCategory({ id, children }) {
            //console.log("hover over");
            const hasChildren = Array.isArray(children) && children.length;
            if (hasChildren) {
                this.openCategoryMenu = id;
            }
            this.someCategoryWasClicked = false;
        },
        hoverOffCategory() {
           // console.log("hover off");
            this.openCategoryMenu = '';
        },
    },
    watch:{
         categories: function(newValue, oldValue){
             console.log("Changing from " + oldValue + " to " + newValue);
             this.$store.commit('setCategories', newValue)
         }
     },
    computed:{
     active() {
      return Array.isArray(this.categories.results) && this.categories.results.length > 0;
        }
    },
    apollo:{
         categories: {
      query: gql`
        
           query getCategories($locale: Locale!){
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
            name(locale: $locale)
            slug(locale: $locale)
            description(locale: $locale)
            ancestors {
                name(locale: $locale)
                slug(locale: $locale)
            }
        }

        fragment subCategory on Category{
            id
            name(locale: $locale)
            slug(locale: $locale)
            description(locale: $locale)
        }`,
      variables() {
        return {
          locale: this.$store.getters.language
        };
      }
    }
    }
  }




</script>

>

<style>

/* Reset */
.nav,
.nav a,
.nav ul,
.nav li,
.nav div,
.nav form,
.nav input {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
}
 
.nav a { text-decoration: none; }
 
.nav li { list-style: none; }

/* Menu Container */
.nav-menu {
    display: inline-block;
    position: relative;
    cursor: default;
    z-index: 500;
}
 
/* Menu List */
.nav-menu > li {
    display: block;
    float: left;
}
/* Menu Links */
.nav-menu > li > a {
    position: relative;
    display: block;
    z-index: 510;
    height: 54px;
    padding: 0 20px;
    line-height: 54px;
     
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 13px;
    color: #fcfcfc;
    text-shadow: 0 0 1px rgba(0,0,0,.35);
 
    background: #FFCC00;
    border-left: 1px solid #4b4441;
    border-right: 1px solid #312a27;
 
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}
.nav > li:hover > a { background: #4b4441; }
 
.nav > li:first-child > a {
    border-radius: 3px 0 0 3px;
    border-left: none;
}
</style>
