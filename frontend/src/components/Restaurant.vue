<template>
  <div>
    <Header/>
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="row">
          <div class="col-12 mt-5">
            <div class="restaurant-main-image position-relative">
              <img :src="`${imageSource}${restaurantDetails.image}`" />
              <button
                class="btn btn-outline-light position-absolute btn-gallery"
                data-bs-toggle="modal"
                data-bs-target="#slideShow"
              >
                Click To Get Image Gallery
              </button>
            </div>
          </div>
          <h3 class="mt-4">{{ restaurantDetails.name }}</h3>
          <div class="d-flex justify-content-between">
            <ul class="list-unstyled d-flex gap-3">
              <li v-on:click="toggle = true" class="">Overview</li>
              <li v-on:click="toggle = !toggle" class="">Contact</li>
            </ul>
            <button
              class="btn btn-danger align-self-start"
              data-bs-toggle="modal"
              data-bs-target="#restMenuModal"
              role="button"
            >
              Place Online Order
            </button>
          </div>
          <hr class="mt-0" />

          <div v-if="toggle" class="over-view">
            <p class="h5 mb-4">About this place</p>

            <p class="mb-0 fw-bold">Cuisine</p>
            <p>
              {{
                restaurantDetails.cuisine
                  .map((cuisine_name) => cuisine_name.name)
                  .join(", ")
              }}
            </p>

            <p class="mb-0 fw-bold">Average Cost</p>
            <p>₹ {{ restaurantDetails.min_price }} for two people (approx.)</p>
          </div>

          <div v-else class="over-view">
            <p class="h5 mb-4">About this place</p>
            <p class="mb-0 fw-bold">Phone Number</p>
            <p>+{{ restaurantDetails.contact_number }}</p>

            <p class="mb-0 fw-bold">Address</p>
            <p>
              {{ restaurantDetails.locality }}, {{ restaurantDetails.city }}
            </p>
          </div>
        </div>
      </div>
      <!-- Modal 1 For restaurtant Menu  -->
       <div class="modal fade" id="restMenuModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">{{restaurantDetails.name}}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row p-2" v-for="(menuItem,index) in restaurantMenu" :key="index">
                <div class="row p-2" >
                    <div class="col-8">
                      <p class="mb-1 h6">{{menuItem.name}}</p>
                      <p class="mb-1"> ₹ {{menuItem.price}}Only</p>
                      <p class="small text-muted">{{menuItem.description}}</p>
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                      <div class="menu-food-item">
                         <img :src="`${imageSource}${menuItem.image}`" />

                        <button v-if="menuItem.qty <= 0" v-on:click="manageIncQty(index)"
                        class="btn btn-primary btn-sm add">
                          Add
                        </button>
                        <div v-else class="order-item-count section ">
                            <span
                              class="hand"
                              v-on:click="manageDecQty(index)"
                              v-if="menuItem.qty >= 1 "
                            >
                              -
                            </span>
                            <span>{{menuItem.qty}}</span>
                            <span
                              class="hand"
                              v-on:click ="manageIncQty(index)"
                            >
                              +
                            </span>
                          </div>
                      </div>
                    </div>
                    <hr class=" p-0 my-2" />
                  </div>
              </div>


            </div>
            <div class="modal-footer  d-flex justify-content-between p-3 pt-0">
              <h3>Total: {{totalPrice}}</h3>
              
                <button v-if="totalPrice > 0 " class="btn btn-success" data-bs-toggle="modal"
                  data-bs-target="#modalAccountId" >Process</button>
               
            </div>
          </div>
        </div>
      </div>

      <!-- Modal 2 for user info -->
      <div
        class="modal fade"
        id="modalAccountId"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-3">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                User Details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label htmlFor="user-name" class="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  v-model="username"
                  
                />
              </div>
              <div class="mb-3">
                <label htmlFor="" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  v-model="email"
                  
                />
              </div>
              <div class="mb-3">
                <label htmlFor="" class="form-label">
                  Address
                </label>
                <textarea
                  type="password"
                  class="form-control"
                  v-model="address"
                  
                ></textarea>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button
                class="btn btn-primary"
                data-bs-target="#restMenuModal"
                data-bs-toggle="modal"
              >
                Back To Menu
              </button>
              <button class="btn btn-success" v-on:click="makePayment()" >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./Header.vue"
export default {
  name: "Restaurant",
  components:{
    Header

  },
  data() {
    return {
      restaurantDetails: {
        _id: 0,
        name: "",
        city: "",
        location_id: 0,
        city_id: 0,
        locality: "",
        thumb: [],
        aggregate_rating: 0,
        rating_text: "",
        min_price: 0,
        contact_number: "",
        cuisine_id: [],
        cuisine: [],
        image: "",
        mealtype_id: 0,
      },
      id: this.$route.params.id,
      restaurantMneu: [],
      imageSource: "../images/",
      toggle: true,
      totalPrice : 0,
      username:"xyz",
      email:"xyz@gmail.com",
      address:"zxxssxs"
      

    };
  },
  mounted() {
    this.getMenuItemsList();

    this.getRestaurantDetails();
  },
  methods: {
    async getRestaurantDetails() {
      const Url = `http://localhost:3001/api/get-restaurant-details-by-id/${this.id}`;
      const response = await fetch(Url);
      const data = await response.json();

      this.restaurantDetails = data.result[0];
      //console.log(this.restaurantDetails);
    },
    async getMenuItemsList() {
      const Url = `http://localhost:3001/api/get-menu-items-by-restaurant-id/${this.id}`;
      const response = await fetch(Url);
      const data = await response.json();
      this.restaurantMenu = data.result;
      console.log(this.restaurantMenu)
    },
    manageIncQty(index){
      console.log("added")
     let _restaurantMenu = [...this.restaurantMenu]
     _restaurantMenu[index].qty += 1
     console.log(_restaurantMenu[index].qty)
     let newTotal = this.totalPrice + _restaurantMenu[index].price
     console.log(newTotal)
     this.totalPrice = newTotal
     this.restaurantMenu = _restaurantMenu 
    },
    async loadScript() {
    let script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    return true;
  },
    manageDecQty(index){
     let _restaurantMenu = [...this.restaurantMenu]
     _restaurantMenu[index].qty -= 1
     let newTotal = this.totalPrice - _restaurantMenu[index].price
     this.totalPrice = newTotal
     this.restaurantMenu = _restaurantMenu 
    },
    async makePayment(){
      console.log("payment")
      await this.loadScript()
      const response = await fetch('http://localhost:3001/api/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: this.totalPrice,
        
      }),
    });
    let data = await response.json()
    let { order } = data
    var options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Zomato clone",
      description: "Test Transaction",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature)
        let { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        let userOrders = restaurantMenu.filter((menu) => {
          return menu.qty > 0;
        });
        let sendData = {
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          signature: razorpay_signature,
          order_List: userOrders,
          total: totalPrice,
          user_email: this.email,
         // mobile: orderUser.mobile,
          username: this.username,
          address: this.address,
        };
        const verifyresponse = await fetch('http://localhost:3001/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
         console.log(verifyresponse)
        let data = await  verifyresponse.json()
        console.log(data);
        if (data.status === true) {
          
           alert("Payment done successfully");
        
         
         window.location.assign("/");
        } else {
          alert("Payment Fail, Try Again");
        }
      },
      prefill: {
        name:this.username,
        email: this.email,
       // contact: orderUser.mobile
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#3399cc"
      }
    };
    try {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert("Unable to load try again");
    }
  
    }
  },
};
</script>
<style scoped>
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
  .hand {
    cursor: pointer;
  }
</style>
