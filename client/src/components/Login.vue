<template>
  <div class="flex min-h-screen bg-gray-50 josefin-font">
    <div
      class="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-8 py-8 md:py-0"
    >
      <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 flex items-center">
            <img src="../assets/images/lgv.png" alt="" class="h-12" />
          </h1>
        </div>

        <h2
          class="text-3xl font-semibold mb-4 text-center text-gray-700 josefin-font"
        >
          Welcome back!
        </h2>
        <p class="text-gray-500 text-center mb-6">
          Don't have an account yet?
          <router-link to="/signup" class="text-blue-600 hover:underline"
            >Sign up
          </router-link>
        </p>

        <form @submit.prevent="login">
          <div class="mb-6">
            <label class="block text-gray-700 mb-2">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div class="mb-6 relative">
            <label class="block text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <span
              class="absolute right-3 top-12 text-gray-400 cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>

          <div class="flex items-center justify-between mb-6">
            <label class="inline-flex items-center">
              <input type="checkbox" class="form-checkbox" />
              <span class="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" class="text-blue-600 hover:underline"
              >Forgot password?</a
            >
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <span v-if="loading">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else>Log In</span>
          </button>
        </form>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 px-10"
    >
      <div class="bg-white rounded-lg p-6 w-96 text-red-600">
        <div class="text-center">
          <h3 class="text-2xl font-semibold text-red-600 mb-4">
            {{ modalTitle }}
          </h3>
          <p class="text-gray-600 mb-4">{{ modalMessage }}</p>
          <button
            @click="closeModal"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <div
      class="w-0 md:w-1/2 bg-blue-600 relative md:flex flex-col space-y-8 justify-center p-5 items-center hidden"
      style="
        background-image: url('../assets/images/lgs.png');
        background-size: cover;
      "
    >
      <h1 class="text-white">The simplest way to manage your finance</h1>
      <img
        src="../assets/images/cv1.png"
        alt="Financial Illustration"
        class="h-86 object-cover"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
      showPassword: false,
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";
      this.loading = true;

      try {
        const response = await axios.post(
          "https://personal-finance-management-done.onrender.com/api/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        const token = response.data.token;
        console.log(response);

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);

        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          this.showModal("Error", error.response.data.error);
        } else {
          this.showModal("Error", "Something went wrong!. Please try again.");
        }
      } finally {
        this.loading = false;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    showModal(title, message) {
      this.modalTitle = title;
      this.modalMessage = message;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
</style>
