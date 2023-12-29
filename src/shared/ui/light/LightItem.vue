<script setup>
defineProps({
    id: {
      type: Number,
      default: 0,
    }
});
</script>
<template>
    <div class="point" :class="{active: active}">
        <div class="top"></div>
        <div class="button" :style="{animationDelay: `${-id}s`}">
            <div class="button--before" :style="{animationDelay: `${-id}s`}"></div>
        </div>
        <div
            v-for="item in curentPlayers"
            :key="item.name"
            :style="{
                backgroundColor: `${item.color}`,
                boxShadow: `0px 0px 20px ${item.color}`,
            }"
            class="label">
        </div>
    </div>
</template>
<style lang="scss" scoped>
  .point {
    padding-top: 5px;
    border-top: 4px solid #011501;
    min-width: 150px;
    text-align: center;
    cursor: pointer;

    .top {
      width: 20px;
      height: 30px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      background-color: #011501;
      margin: 0 auto;
    }

    .button {
      position: relative;
      width: 18px;
      height: 22px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: #ff0101;
      box-shadow: 0px 0px 20px #e1c5c5;
      border: 1px solid #b77e7e;
      margin: 0 auto;
      animation: color-body 10s infinite;

      &--before {
        position: absolute;
        min-width: 50px;
        min-height: 50px;
        border-radius: 50px;
        background-color: rgba($color: #ff0000, $alpha: 0.1);
        box-shadow: 0px 0px 100px #ff0000;
        right: -16px;
        top: -6px;
        animation: color-before 10s infinite;
      }
    }
  }
  .text {
    margin-top: 20px;
    color: #f2e996;
  }
  .label {
    margin: 20px auto;
    padding: 10px 0;
    width: 80%;
    border-radius: 20px;
  }
  .active {
    border: 1px solid rgb(0, 250, 75);
    box-shadow: 0px 0px 100px rgb(0, 250, 75);
    border-radius: 20px; 
  }

  @keyframes color-body {
    0%   {background-color:#ff0101; border-color:#b77e7e; box-shadow: 0px 0px 20px #b77e7e;}
    17%  {background-color:rgb(250, 233, 0); border-color: #f2e996; box-shadow: 0px 0px 20px #f2e996;}
    34%  {background-color:rgb(2, 162, 231); border-color: #8fd6ff; box-shadow: 0px 0px 20px #8fd6ff;}
    51%  {background-color:rgb(0, 250, 75); border-color: #96f2ab; box-shadow: 0px 0px 20px #96f2ab;}
    68% {background-color:rgb(167, 0, 250); border-color: #f296e9; box-shadow: 0px 0px 20px #f296e9;}
    85% {background-color:rgb(250, 0, 117); border-color: #f296c4; box-shadow: 0px 0px 20px #f296be;}
    100%   {background-color:#ff0101; border-color:#b77e7e; box-shadow: 0px 0px 20px #b77e7e;}
  }

  @keyframes color-before {
    0%   { background-color: rgba($color: #ff0000, $alpha: 0.1); box-shadow: 0px 0px 100px #ff0000;}
    17%  {background-color: rgba($color: rgb(250, 233, 0), $alpha: 0.1); box-shadow: 0px 0px 100px rgb(250, 233, 0);}
    34%  {background-color: rgba($color: rgb(2, 162, 231), $alpha: 0.1); box-shadow: 0px 0px 100px rgb(2, 162, 231);}
    51%  {background-color: rgba($color: rgb(0, 250, 75), $alpha: 0.1); box-shadow: 0px 0px 100px rgb(0, 250, 75);}
    68% {background-color: rgba($color: rgb(167, 0, 250), $alpha: 0.1); box-shadow: 0px 0px 100px rgb(167, 0, 250);}
    85% {background-color: rgba($color: rgb(250, 0, 117), $alpha: 0.1); box-shadow: 0px 0px 100px rgb(250, 0, 117);}
    100%   { background-color: rgba($color: #ff0000, $alpha: 0.1); box-shadow: 0px 0px 100px #ff0000;}
  }
</style>