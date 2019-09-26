<template>
  <div class="home">
    <div class="home__brand-box">
      <img class="home__logo" src="../../assets/cloud.svg" alt="Weather logo app" />
      <h1 class="home__app-name">AirApp</h1>
    </div>
    <div class="home__description">
      <p>
        Check the weather! Enter the city name, or
        <span
          class="home__white-text"
        >leave empty for geolocation</span>
      </p>
    </div>
    <div class="home__search-box">
      <vue-google-autocomplete-tag
        id="from_address"
        class="home__city-name"
        types="(cities)"
        v-on:placechanged="getFromAddress"
        v-on:error="handleError"
      ></vue-google-autocomplete-tag>
      <button @click.prevent="searchWeather" class="home__submit">Check</button>
    </div>
    <component :is="currentWeatherComponent"></component>
  </div>
</template>

<script>
import axios from "axios";
import HomeWatherInfo from "./HomeWeatherInfo";
import Loader from "./Loader";
import ErrorInfo from "./ErrorInfo";
import { API_KEY } from "../../maps";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "Home",
  data() {
    return {
      currentWeatherComponent: "loader-tag",
      typedCity: ""
    };
  },
  created() {
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    const currentCity = this.$store.getters.getCurrentCity;

    if (currentCity == "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            };

            const link =
              `http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lon}&units=metric&APPID=` +
              API_KEY;

            axios
              .get(link)
              .then(res => {
                this.updateCity(res);
              })
              .catch(error => {
                this.errorHandler(error);
              });
          },
          error => {
            this.$store.commit("updateError", error.message);
            this.currentWeatherComponent = "error-tag";
          },
          options
        );
      } else {
        this.$store.commit("updateError", error.message);
        this.currentWeatherComponent = "error-tag";
      }
    } else {
      this.currentWeatherComponent = "home-weather-info-tag";
    }
  },
  components: {
    "home-weather-info-tag": HomeWatherInfo,
    "loader-tag": Loader,
    "error-tag": ErrorInfo,
    "vue-google-autocomplete-tag": VueGoogleAutocomplete
  },
  methods: {
    getFromAddress(res, placeResultData, id) {
      this.typedCity = res.locality;
    },
    handleError(error) {
      this.$store.commit("updateError", error.message);
      this.currentWeatherComponent = "error-tag";
    },
    updateCity(res) {
      const data = JSON.parse(JSON.stringify(res.data));
      const currentWeather = {
        temp: Math.floor(data.main.temp) + "‎°C",
        location: data.name,
        weather: data.weather[0].description
      };
      this.currentWeatherComponent = "home-weather-info-tag";
      this.$store.commit("updateCity", currentWeather.location);
      this.$store.commit("updateWeather", currentWeather);
    },
    searchWeather() {
      const link =
        `http://api.openweathermap.org/data/2.5/weather?q=${this.typedCity}&units=metric&APPID=` +
        API_KEY;

      axios
        .get(link)
        .then(res => {
          this.updateCity(res);
        })
        .catch(error => {
          this.$store.commit("updateError", error.message);
          this.currentWeatherComponent = "error-tag";
        });
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700|Varela+Round&display=swap");

.home {
  display: flex;
  flex-direction: column;
  &__brand-box {
    box-sizing: border-box;
    display: flex;
    padding: 0 0 0 60px;
    margin-bottom: 10px;
    align-items: center;
  }
  &__logo {
    height: 60px;
    margin-right: 15px;
  }
  &__app-name {
    font-size: 45px;
    font-family: "Varela Round", sans-serif;
  }
  &__description {
    color: #d2d2d2;
    margin-bottom: 20px;
  }
  &__white-text {
    color: white;
  }
  &__city-name {
    border: 1px solid #e0e0e0;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 9px;
    margin-right: 10px;
    color: white;
    width: 60%;
  }
  &__submit {
    width: calc(40% - 30px);
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 36px;
    border: none;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
      background-color: rgba(255, 255, 255, 0.75);
      color: #9e9e9e;
    }
  }
  &__weather-box {
    display: flex;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    position: relative;
    text-align: left;
  }
  &__temp-box {
    align-items: center;
    justify-content: center;
    display: flex;
  }
  &__temp {
    font-size: 40px;
    font-weight: bold;
    margin-right: 30px;
    font-family: "Varela Round", sans-serif;
  }
  &__info-box {
    & > p {
      line-height: 1.4;
    }
  }
  &__info-name {
    color: white;
    margin-right: 5px;
  }
  &__info-value {
    color: #e0e0e0;
    font-weight: 300;
  }
  &__more {
    position: absolute;
    right: 10px;
    bottom: 10px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #c5c5c5;
    }
  }
}

@media screen and (max-width: 450px) {
  .home {
    &__brand-box {
      flex-direction: column;
      padding: 10px;
    }
    &__logo {
      margin-right: 0;
    }
    &__search-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &__city-name {
      margin-right: 0;
      width: 100%;
      box-sizing: border-box;
      &::placeholder {
        color: white;
        opacity: 0.65;
      }
    }
    &__submit {
      margin-top: 10px;
      width: 100%;
      box-sizing: border-box;
    }
    &__weather-box {
      flex-direction: column;
    }
    &__temp-box {
      justify-content: flex-start;
      margin-bottom: 20px;
    }
    &__info-box {
      margin-bottom: 10px;
    }
  }
}
</style>