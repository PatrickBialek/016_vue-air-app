<template>
  <div class="home">
    <app-home />
  </div>
</template>

<script>
import Home from "@/components/Home/Home";

export default {
  name: "HomePage",
  components: {
    "app-home": Home
  }
};
</script>
