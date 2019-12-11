<template>
  <transition name="move">
    <div class="container">
      <slot></slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.container{
  position: absolute;
  width: 100%;
  top:0;
  left:0;
  bottom: 0;
  background: #fff;
  &.move-enter-active{
    transition: all 0.2s ease;    
  }   
  &.move-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  &.move-enter, &.move-leave-active{
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
      
}

</style>
