<template>
  <div id="app" @click="showList = false">
    <header>
      <h1>Don't know which book to buy ?</h1>
      <h3>Choose a category below and we show you the best choice</h3>
    </header>
    <main>
      <div class="select-category">
        <div class="select-list-block" @click.stop @click="showList = !showList">
          {{ selectedCat ? selectedCat : 'Select a category' }}
          <div class="category-list" v-if="showList">
            <a v-for="(cat, i) in categories" :key="i" @click.stop @click="selectCategory(cat)">{{ cat }}</a>
          </div>
        </div>
        <div class="spinner" v-if="loader"></div>
      </div>
      <p v-if="selectedCat">You chose: {{ selectedCat }}</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      showList: false,
      loader: false,
      categories: null,
      selectedCat: null
    }
  },
  methods: {
    async getCategories () {
      this.loader = true
      const res = await fetch('http://localhost:5000/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      this.categories = data.categories
      console.log('Categories: ', this.categories);
      this.loader = false
    },
    selectCategory(category) {
      this.selectedCat = category
      this.showList = false
    }
  },
  created () {
    this.getCategories()
  }
}
</script>

<style>
.spinner {
   width: 24px;
   height: 24px;
   border-radius: 50%;
   background: radial-gradient(farthest-side,#000000 94%,#0000) top/4px 4px no-repeat,
          conic-gradient(#0000 30%,#000000);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 0);
   animation: spin-c7wet2 1s infinite linear;
}

@keyframes spin-c7wet2 {
   100% {
      transform: rotate(1turn);
   }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .select-category {
  display: flex;
  align-items: center;
  justify-content: center;
}

#app p {
  position: relative;
  z-index: 1;
}

#app .select-category .select-list-block {
  min-width: 180px;
  padding: 5px;
  border: 1px solid #CCC;
  border-radius: 4px;
  cursor: pointer;
}

#app .select-category .select-list-block .category-list {
  position: absolute;
  height: auto;
  width: max-content;
  min-width: 190px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 #CCC;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  z-index: 2;
}

#app .select-category .select-list-block .category-list a {
  cursor: pointer;
  padding: 2px 10px;
  transition: .2s;
}

#app .select-category .select-list-block .category-list a:hover {
  background-color: #ececec;
}

#app .select-category img {
  height: 25px;
  width: 25px;
}

</style>
