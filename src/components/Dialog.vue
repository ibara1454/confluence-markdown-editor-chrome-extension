<template>
  <div>
    <transition name="fade" appear>
      <div role="document" class="overlay" v-if="value">
      </div>
    </transition>
    <transition name="fade-and-zoom" appear>
      <div class="dialog-wrapper" v-if="value">
        <div class="dialog">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dialog',

  props: {
    value: { type: Boolean, required: true },
  },
});
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, .46);
}

.dialog-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 201;
}

.dialog {
  z-index: 201;
  background: #ffffff;
  border-radius: 4px;
  box-shadow:
    0 24px 38px 3px rgba(0, 0, 0, .14),
    0 9px 46px 8px rgba(0, 0, 0, .12);
}

/** Zoom out animation */
%zoom-enter-active {
  transition-duration: .15s;
  transition-timing-function: ease-in;
}

%zoom-enter {
  transform: scale(.75);
}

%zoom-enter-to {
  transform: scale(1);
}

/** Fade out animation */
.fade-enter-active, .fade-leave-active {
  transition-duration: .15s;
  transition-timing-function: ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}

/** Fade out and zoom out animation */
.fade-and-zoom-enter-active, .fade-and-zoom-leave-active {
  @extend .fade-enter-active;
  @extend %zoom-enter-active;
}

.fade-and-zoom-enter, .fade-and-zoom-leave-to {
  @extend .fade-enter;
  @extend %zoom-enter;
}

.fade-and-zoom-enter-to, .fade-and-zoom-leave {
  @extend .fade-enter-to;
  @extend %zoom-enter-to;
}
</style>
