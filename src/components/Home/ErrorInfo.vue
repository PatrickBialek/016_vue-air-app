<template>
  <div class="error">
    <p>Error: {{ errorMessage }}. Type city manually :)</p>
  </div>
</template>

<script>
export default {
  name: "ErrorInfo",
  data() {
    return {};
  },
  computed: {
    errorMessage() {
      return this.$store.getters.getErrorMessage;
    }
  }
};
</script>

<style scoped lang="scss">
.error {
  display: flex;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  position: relative;
  text-align: left;
  & p {
    color: white;
  }
}
</style>