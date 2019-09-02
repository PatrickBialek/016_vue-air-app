<template>
  <div class="loader">
    <div class="loader__ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p class="loader__text">Getting your position</p>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  &__text {
    color: white;
    margin-top: 20px;
  }
  &__ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 51px;
      height: 51px;
      margin: 6px;
      border: 6px solid white;
      border-radius: 50%;
      animation: ring-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: white transparent transparent transparent;
      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }
}
@keyframes ring-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>