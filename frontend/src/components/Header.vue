<template>
  <div>
    <div class="col-10 d-flex justify-content-between py-2 align-items-center">
      <p class="m-0 brand">e!</p>
      <div>
   <!-- User is not authenticated, show login and signup buttons -->
          <button class="btn text-white btn-outline-light mx-2"
                  data-bs-target="#loginModal"
                  data-bs-toggle="modal"
                  >
            Login
          </button>
          <button class="btn btn-outline-light"
                  data-bs-target="#signupModal"
                  data-bs-toggle="modal"
                  >
            <i class="fa fa-search" aria-hidden="true"></i>Create an Account
          </button>
          
    

            
     <!--   <button
          class="btn text-white btn-outline-light mx-2"
          data-bs-target="#loginModal"
          data-bs-toggle="modal"
        >
          Login
        </button>
        <button
          class="btn btn-outline-light"
          data-bs-target="#signupModal"
          data-bs-toggle="modal"
        >
          <i class="fa fa-search" aria-hidden="true"></i>Create a Account
        </button> -->
      </div>
    </div>

    <!-- Modal 1 for login -->
    <div class="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" > 
                                <form >
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                                        <input type="email" class="form-control" id="email" name="email" v-model="loginEmail"  aria-describedby="emailHelp" />
                                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="Password" name="password" v-model="loginPassword" />
                                    </div>
                                    
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    <GoogleLogin :callback="callback"/>
                                </form>
                                <div class='my-3'>
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
  </div>
</template>
<script >
import GoogleLogin from "vue3-google-signin"
//import   GoogleSignInButton from "vue3-google-signin"
export default {
  name: "Header",
  components:{
GoogleLogin
  },
  data(){
    return {
        loginEmail:"",
        loginPassword:"",
        
            
    }
  },
  mounted(){
   
  },
  methods:{
     callback (response)  {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
     
  }
}
</script>








