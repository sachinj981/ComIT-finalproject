<template>
  <div>
    <main>
      <section class="row main-section align-content-start">
        <div>
          <Header />
        </div>
        <section
          class="col-12 d-flex flex-column align-items-center justify-content-center"
        >
          <p className="brand-name fw-bold my-lg-2 mb-0">e!</p>
          <p className="h1 text-white my-3 text-center">
            Find the best restaurants, cafés, and bars
          </p>
          <div className="search w-50 d-flex mt-3">
            <select className="form-select mb-3 mb-lg-0 w-50 me-lg-3 py-2 px-3">
              <option value="">Select Location</option>
              <option
                v-for="(location, index) in locationList"
                :key="index"
                :value="location.location_id"
              >
                {{ location.name }}, {{ location.city }}
              </option>
            </select>
            <div className="w-75 input-group">
              <span className="input-group-text bg-white">
                <i className="fa fa-search text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control py-2 px-3"
                placeholder="Search for restaurants"
              />
            </div>
          </div>
        </section>
      </section>

      <section class="row justify-content-center">
        <section class="col-10 mt-3">
          <h3 class="fw-bold text-navy">Quick Searches</h3>
          <p class="text-secondary">Discover restaurants by Searches</p>
        </section>

        <section class="col-10">
          <section class="row py-2">
            <section
              class="col-12 px-0 d-flex justify-content-between flex-wrap"
            >
              <section
                v-for="(mealType, index) in mealTypes"
                :key="index"
                class="px-0 d-flex border border-1 quick-search-item"
              >
                <router-link
                  :to="'/search/' + mealType.meal_type"
                  class="item-box d-flex justify-content-between"
                  exact
                >
                  <img
                    :src="`${imageSource}${mealType.image}`"
                    alt=""
                    class="image-item"
                  />

                  <div class="pt-3 px-2">
                    <h4 class="text-navy">{{ mealType.name }}</h4>
                    <p class="small text-muted">{{ mealType.content }}</p>
                  </div>
                </router-link>
              </section>
            </section>
          </section>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      locationList: [],
      mealTypes: [],
      imageSource: "../images/",
    };
  },
  methods: {
    // function to get the location list
    async getLocationList() {
      const URL = "http://localhost:3001/api/get-location-list";
      const data = await fetch(URL);
      const locationData = await data.json();

      if (locationData.status === true) {
        this.locationList = locationData.result;
      } else {
        this.locationList = [];
      }
    },
    async getMealTypes() {
      const URL = "http://localhost:3001/api/get-meal-type-list";
      const data = await fetch(URL);
      const response = await data.json();
      console.log(response);
      if (response.status === true) {
        this.mealTypes = response.result;
      } else {
        this.mealTypes = [];
      }
    },
  },
  mounted() {
    this.getLocationList(), this.getMealTypes();
  },
};
</script>
<style scoped>
.main-section {
  background-color: red;
  height: 70vh;
  background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.849)),
    url("../../public/images/assets/back-img.png");
  background-position: center;
  background-size: 100%;
}
.item-box {
  text-decoration: none;
}
.brand-name {
  width: 130px;
  height: 130px;
  background-color: white;
  color: red;
  border-radius: 75px;
  font-size: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-navy {
  color: #192f60 !important;
}
.rest-search-auto-complete img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.image-item {
  width: 45%;
  height: 20vh;
}
.quick-search-item {
  width: 32%;
  margin-bottom: 8px;
  cursor: pointer;
}

/* search page start */
.brand {
  background-color: white;
  height: 40px;
  width: 40px;
  border-radius: 25px;
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hand {
  cursor: pointer;
}
.food-shadow {
  box-shadow: 0 0 5px 0px gray;
  cursor: pointer;
}
.food-item {
  width: 120px;
  height: 120px;
  border-radius: 25px;
}

.pages {
  list-style: none;
  padding: 0;
  display: flex;
}
.pages li {
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  color: gray;
  font-weight: bold;
}
.pages .active {
  border: 1px solid white;
  color: white;
  background-color: gray;
}

/********** bootstrap-restaurant-page*/

.btn-gallery {
  top: 85%;
  right: 5%;
  background-color: rgba(245, 222, 179, 0.411);
  color: black;
  font-weight: bold;
}

/* menu item  */
.menu-food-item {
  width: 90px;
  height: 90px;
  background-color: #192f60;
  position: relative;
}
.menu-food-item .add {
  position: absolute;
  left: 25%;
  bottom: -20%;
}
.menu-food-item img {
  width: 100%;
  height: 100%;
}
.menu-food-item .order-item-count {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -20%;
}
.menu-food-item .order-item-count span {
  background-color: white;
  padding: 2px 5px;
  border: 2px solid gray;
  margin: 0 2px;
}
/* search page end */
/* iphone SE */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  /* physical 960x640 
     480x320
  */

  .brand-name {
    width: 100px;
    height: 100px;
    font-size: 3.5rem;
  }
  .search {
    width: 100% !important;
    flex-direction: column;
    align-items: center;
  }
  .form-control,
  .input-group {
    width: 80% !important;
  }

  .main-section {
    background-color: red;
    height: auto;
    padding-bottom: 2rem;
    background-size: cover;
  }
  .quick-search-item {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
