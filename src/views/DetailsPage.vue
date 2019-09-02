<template>
  <div class="details">
    <details-tag></details-tag>
  </div>
</template>

<script>
import Details from "@/components/Details/Details";

export default {
  name: "DetailsPage",
  data() {
    return {};
  },
  components: {
    "details-tag": Details
  }
};
</script>

<style scoped lang="scss">
</style>
