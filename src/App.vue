<template>
  <div id="app">
    <router-link to="/station/:stationId"></router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>
