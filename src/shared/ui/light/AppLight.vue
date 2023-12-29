<script setup>
import LightItem from './LightItem.vue';
</script>
<template>
    <div class="home">
        <LightItem 
            v-for="id in 52"
            :key="id"
            :id="id"/>
    </div>
</template>
<style lang="scss" scoped>
  .home {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
  }
</style>