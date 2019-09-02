<template>
  <div class="home__weather-box">
    <div class="home__temp-box">
      <span class="home__temp">{{ currentWeather.temp }}</span>
    </div>
    <div class="home__info-box">
      <p>
        <span class="home__info-name">Date:</span>
        <span class="home__info-value">{{ today }}</span>
      </p>
      <p>
        <span class="home__info-name">Location:</span>
        <span class="home__info-value">{{ currentWeather.location }}</span>
      </p>
      <p>
        <span class="home__info-name">Description:</span>
        <span class="home__info-value">{{ currentWeather.weather }}</span>
      </p>
      <router-link class="home__more" to="/details">More</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeWeatherInfo",
  data() {
    return {};
  },
  computed: {
    currentWeather() {
      return this.$store.getters.getCurrentWeather;
    },
    today() {
      const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        today = day + "." + month + "." + year;

      return today;
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700|Varela+Round&display=swap");
</style>