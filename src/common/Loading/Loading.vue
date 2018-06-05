<template>
<div class="loading" :style="{width: size+'px', height: size+'px'}">
  <div class="bar1" :style="{background:color}"></div>
  <div class="bar2" :style="{background:color}"></div>
  <div class="bar3" :style="{background:color}"></div>
  <div class="bar4" :style="{background:color}"></div>
  <div class="bar5" :style="{background:color}"></div>
  <div class="bar6" :style="{background:color}"></div>
  <div class="bar7" :style="{background:color}"></div>
  <div class="bar8" :style="{background:color}"></div>
  <div class="bar9" :style="{background:color}"></div>
  <div class="bar10" :style="{background:color}"></div>
  <div class="bar11" :style="{background:color}"></div>
  <div class="bar12" :style="{background:color}"></div>
</div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    color: {
      type: String,
      default: '#666'
    },
    size: {
      type: [Number, String],
      default: 36
    }
  }
}
</script>

<style lang="less">
.loading{
  position: relative;
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
  padding: 5px;

  div{
    width: 8%;
    height: 20%;
    position: absolute;
    left: 45%;
    top: 40%;
    opacity: 0;
    border-radius: 50px;
    animation: fade 1s linear infinite;
  }

  @keyframes fade {
    from {opacity: 1;}
    to {opacity: 0.25;}
  }

  .bar1{
    transform:rotate(0deg) translate(0, -130%);
    animation-delay: 0s;
  }    

  .bar2{
    transform:rotate(30deg) translate(0, -130%); 
    animation-delay: -0.9167s;
  }

  .bar3{
    transform:rotate(60deg) translate(0, -130%); 
    animation-delay: -0.833s;
  }
  .bar4{
    transform:rotate(90deg) translate(0, -130%); 
    animation-delay: -0.7497s;
  }
  .bar5{
    transform:rotate(120deg) translate(0, -130%); 
    animation-delay: -0.667s;
  }
  .bar6{
    transform:rotate(150deg) translate(0, -130%); 
    animation-delay: -0.5837s;
  }
  .bar7{
    transform:rotate(180deg) translate(0, -130%); 
    animation-delay: -0.5s;
  }
  .bar8{
    transform:rotate(210deg) translate(0, -130%); 
    animation-delay: -0.4167s;
  }
  .bar9{
    transform:rotate(240deg) translate(0, -130%); 
    animation-delay: -0.333s;
  }
  .bar10{
    transform:rotate(270deg) translate(0, -130%); 
    animation-delay: -0.2497s;
  }
  .bar11{
    transform:rotate(300deg) translate(0, -130%); 
    animation-delay: -0.167s;
  }
  .bar12{
    transform:rotate(330deg) translate(0, -130%); 
    animation-delay: -0.0833s;
  }

}
</style>
