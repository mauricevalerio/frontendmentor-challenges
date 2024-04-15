<template>
  <main>
    <home></home>
  </main>
</template>

<script>
import Home from "./components/Home.vue"
import { store } from "./store.js"

export default {
  components: { Home },
  created() { store.getCategories() }
}

</script>

<style>
  main {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("./assets/images/background-mobile.svg");
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 0 .5em;
  }

  @media (min-width: 375px) {
    main {
      background-image: url("./assets/images/background-tablet.svg");
    }
  }

  @media (min-width: 770px) {
    main {
      background-position: center;
      background-image: url("./assets/images/background-desktop.svg");
    }
  }
</style>