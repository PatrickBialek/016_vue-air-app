<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="footer__text">
        <span>{{ text }}</span>
        <span>{{ boldedText }}</span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      text: "photo from ",
      boldedText: "UNSPLASH"
    };
  }
};
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  &,
  &__container {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
  }
  &__container {
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    text-align: center;
  }
  &__text {
    font-size: 14px;
    & span:first-child {
      color: #d2d2d2;
    }
    & span:nth-child(2) {
      color: white;
    }
  }
}
</style>