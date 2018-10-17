<template>
    <ul v-if="active" class="nav navbar"> 
        <li v-for = "topLevelCategory in categories.results" :key="topLevelCategory.id" class="dropdown menu-large" 
            @mouseover="hoverOnCategory(topLevelCategory)"
            @mouseleave="hoverOffCategory()">
                <router-link :to="{ name: 'category', params: { categoryId: topLevelCategory.id } }"
                   class="dropdown-toggle">
                    {{ topLevelCategory.name }} | 
                </router-link>
                <ul v-if="isMenuOpen(topLevelCategory)" class="dropdown-menu megamenu row dropdown-submenu">
                    <li class="col-sm-8">
                        <div class="nav-accordion">
                            <div v-for="category2ndLevel in topLevelCategory.children" :key="category2ndLevel.id">
                                <h3>
                                      <router-link :to="{ name: 'category', params: { categoryId: category2ndLevel.id } }"
                                        @click.native="clickOnCategory()"
                                        data-test="category-2nd-level-link">
                                            {{category2ndLevel.name}}
                                    </router-link>
                                </h3>
                            </div>
                        </div>
                      </li>
                </ul>
        </li> 
    </ul>
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
            console.log("hover over");
            const hasChildren = Array.isArray(children) && children.length;
            if (hasChildren) {
                this.openCategoryMenu = id;
            }
            this.someCategoryWasClicked = false;
        },
        hoverOffCategory() {
            console.log("hover off");
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
  margin-bottom: 0;
  border-bottom: 1px solid;
  background: #FFFFFF;
}

.navbar-default .navbar-nav>.open>a,
.navbar-default .navbar-nav>.open>a:focus,
.navbar-default .navbar-nav>.open>a:hover {
  background: none;
  border: none;
}

.navbar-default {
  background: none;
  border: none;
}

#navigation .megamenu.dropdown-menu {
  display: block !important;
}

.navbar-nav>li>.megamenu {
  width: 100%;
  border: solid 1px;
  border-top: none;
  box-shadow: none;
}

</style>
