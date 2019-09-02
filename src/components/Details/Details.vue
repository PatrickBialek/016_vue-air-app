<template>
  <div>
    <div class="details__nav">
      <div class="details__logo-box">
        <img class="details__logo" src="../../assets/cloud.svg" alt="Weather logo app" />
        <h1 class="details__app-name">AirApp</h1>
      </div>
      <div>
        <router-link class="details__home-page-link" exact to="/">Back do homepage</router-link>
      </div>
    </div>
    <div class="details__info-box">
      <p>
        Date:
        <span>{{ today }}</span>
      </p>
      <p>
        Location:
        <span>{{ currentCity }}, {{ currentCountry }}</span>
      </p>
    </div>
    <div class="details__forecast">
      <div class="details__legend-container">
        <div>
          <span>Hour</span>
        </div>
        <div>Tempature</div>
        <div>Description</div>
      </div>
      <ul class="details__forecasts-container">
        <li class="details__single-forecast" v-for="(forecast, key) in forecasts" :key="key">
          <div>
            <span>{{ forecast.dt_txt.split(" ")[1].slice(0, -3)}}</span>
          </div>
          <div>
            <span>{{ Math.floor(forecast.main.temp) }}°C</span>
          </div>
          <div>
            <span>{{ forecast.weather[0].description }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { API_KEY } from "../../maps";
import axios from "axios";

export default {
  name: "Details",
  data() {
    return {
      currentCity: "",
      currentCountry: "",
      forecasts: []
    };
  },
  computed: {
    city() {
      return this.$store.getters.getCurrentCity;
    },
    today() {
      const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        today = day + "." + month + "." + year;

      return today;
    }
  },
  mounted() {
    const city = this.$store.getters.getCurrentCity;
    const link =
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=` +
      API_KEY;

    axios
      .get(link)
      .then(res => {
        this.getForecast(res);
      })
      .catch(error => {
        this.errorHandler(error);
      });
  },
  methods: {
    getForecast(res) {
      this.currentCity = res.data.city.name;
      this.currentCountry = res.data.city.country;
      const forecasts = JSON.parse(JSON.stringify(res.data.list));
      this.forecasts = forecasts;
    },
    errorHandler(error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss">
.details {
  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  &__logo-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__logo {
    height: 40px;
    margin-right: 10px;
  }
  &__app-name {
    font-size: 28px;
    font-family: "Varela Round", sans-serif;
  }
  &__home-page-link {
    color: white;
    text-decoration: none;
  }
  &__info-box {
    display: flex;
    padding: 20px 40px;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.1);
    margin-bottom: 40px;
    & > p {
      & > span {
        color: #e0e0e0;
        font-weight: 300;
      }
    }
  }
  &__legend-container {
    display: flex;
    justify-content: space-around;
    & > div {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      font-size: 14px;
      width: 100%;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
  &__forecasts-container {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
  }
  &__single-forecast {
    display: flex;
    margin-bottom: 5px;
    & > div {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 18px 24px;
      display: flex;
      box-sizing: border-box;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      color: #e0e0e0;
      font-weight: 300;
      max-width: 33.333%;
      line-height: 1.6;
      &:not(:last-child) {
        margin-right: 5px;
      }
      & span {
        display: flex;
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 450px) {
    .details {
      &__nav {
        flex-direction: column;
        align-items: flex-start;
      }
      &__logo-box {
        margin-bottom: 10px;
      }
      &__info-box {
        flex-direction: column;
        align-items: flex-start;
        & > p:not(:last-child) {
          margin-bottom: 6px;
        }
      }
      &__single-forecast {
        & div {
          padding: 14px;
          &:not(:last-child) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>