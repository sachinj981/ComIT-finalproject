<template>
  <div>
    <!-- Section -->
    <div class="row">
      <div class="col-12 px-5 pt-4">
        <p class="h3">Breakfast Places In Mumbai</p>
      </div>
      <!-- Food Item -->
      <div class="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
        <div className="food-shadow col-12 col-lg-3 col-md-4 me-5 p-3 mb-4">
          <div className="d-flex justify-content-between">
            <p className="fw-bold m-0">Filter</p>
            <button
              className="d-lg-none d-md-none btn"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFilter"
              aria-controls="collapseFilter"
            >
              <span className="fa fa-eye"></span>
            </button>
          </div>
          <div className="collapse show" id="collapseFilter">
            <div>
              <label htmlFor="" className="form-label"> Select Location </label>
              <select className="form-select form-select-sm" name="location">
                <option value="">Select Location</option>
              </select>
            </div>
            <p className="mt-4 mb-2 fw-bold">Cuisine</p>
            <div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cuisine"
                  value="1"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  North Indian
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cuisine"
                  value="2"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  South Indian
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cuisine"
                  value="4"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Fast food
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cuisine"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Continental
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cuisine"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Punjabi
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="cuisine"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Desserts
                </label>
              </div>
            </div>
            <p className="mt-4 mb-2 fw-bold">Cost For Two</p>
            <div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="pricesort"
                  value="1"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  less then 300
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="pricesort"
                  value="2"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  300 to 600
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="pricesort"
                  value="3"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  600 to 900
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="pricesort"
                  value="4"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  900 to 1200
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="pricesort"
                  value="5"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  2000+
                </label>
              </div>
            </div>
            <p className="mt-4 mb-2 fw-bold">Sort</p>
            <div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  checked="{isChecked}"
                  name="sort"
                  value="1"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Price low to high
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  className="form-check-input"
                  name="sort"
                  value="-1"
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Price high to low
                </label>
              </div>
            </div>
          </div>
          <!-- Filter section ends -->
        </div>
        <!-- Search result -->
        <div class="col-12 col-lg-8 col-md-7">
          <div class="col-12 food-shadow p-4 mb-4">
            <div  v-for="(restaurant, index) in restaurantList" :key="index">
              <div @click="()=>navigateToRestaurant(restaurant._id)" >
                <div class="d-flex align-items-center" >
                <img
                  :src="`${imageSource}${restaurant.image}`"
                  className="food-item"
                />
                <div class="ms-5">
                  <p className="h4 fw-bold">
                    {{ restaurant.name }} {{ restaurant.aggregate_rating }}
                  </p>
                  <span className="fw-bold text-muted">{{
                    restaurant.locality
                  }}</span>
                  <p className="m-0 text-muted">
                    <i
                      className="fa fa-map-marker fa-2x text-danger"
                      aria-hidden="true"
                    ></i>
                    {{ restaurant.locality }},{{ restaurant.city }}
                  </p>
                </div>
                </div>
                <div class="d-flex">
                  <div>
                    <p class="m-0 fw-bold">CUISINES</p>
                    <p class="m-0 fw-bold">COST FOR TWO</p>
                  </div>

                  <div class="ms-5">
                    <div class="d-flex flex-row">
                      <p
                        class="m-0 fw-bold"
                        v-for="(cuisine, index) in restaurant.cuisine"
                        :key="index"
                      >
                        {{ cuisine.name }}
                        <span v-if="index !== restaurant.cuisine.length - 1">, </span>
                      </p>
                    </div>
                    <p class="m-0 fw-bold">
                      <i class="fa fa-inr" aria-hidden></i>
                      {{ restaurant.min_price }}
                    </p>
                  </div>
                </div>
                
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchPage",
  data() {
    return {
      restaurantList: [],

      filter: {
        mealtype_id: null,
      },
      imageSource: "../images/",
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.filter.mealtype_id = id; // set the mealtype_id property
    console.log(id);
    

    this.getFilterData();
  },
  methods: {
    // Function to get restaurant data
    async getFilterData(data = this.filter) {
      const url = `http://localhost:3001/api/filter`;
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      const json = await response.json();

      this.restaurantList = json.restaurant;
      
    },
    navigateToRestaurant(id){
        
        this.$router.push(`/restaurant/${id}`)
    }
  },
};
</script>
<style scoped>
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
.restaurant-main-image {
  height: 70vh;
  overflow: hidden;
}
.restaurant-main-image img {
  height: 150%;
  width: 100%;
}
.btn-gallery {
  top: 85%;
  right: 5%;
  background-color: rgba(245, 222, 179, 0.411);
  color: black;
  font-weight: bold;
}
</style>