<template>
  <div class="flex min-h-screen bg-gray-50 josefin-font">
    <div
      class="image-section w-full md:w-1/2 bg-blue-600 md:flex items-center justify-center hidden p-5"
    >
      <img
        src="../assets/images/cv1.png"
        alt="Sign Up Illustration"
        class="w-[300] h-auto"
      />
    </div>

    <div
      class="form-section w-full md:w-1/2 flex items-center justify-center px-6 sm:px-8"
    >
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-5 md:p-8">
        <h1
          class="text-3xl font-bold flex items-center justify-center mb-4 text-gray-800"
        >
          <img src="../assets/images/lgv.png" alt="" class="h-12" />
        </h1>
        <h2 class="text-2xl font-semibold text-center mb-4 text-gray-700">
          Create an Account
        </h2>
        <p class="text-center text-gray-500 mb-8">Sign up to get started</p>

        <form @submit.prevent="signup">
          <div class="mb-6">
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div class="mb-6">
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div class="mb-6">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition"
          >
            <span v-if="loading">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else>Sign Up</span>
            <!-- {{ loading ? "Loading..." : "Sign Up" }} -->
          </button>
        </form>

        <p class="text-center mt-6 text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">
            Log in
          </router-link>
        </p>
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="errorMessage"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="modal-content bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-red-500 text-xl font-semibold mb-4">Error</h3>
        <p>{{ errorMessage }}</p>
        <button
          @click="closeModal"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="successMessage"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="modal-content bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-green-500 text-xl font-semibold mb-4">Success</h3>
        <p>{{ successMessage }}</p>
        <button
          @click="navigateToLogin"
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async signup() {
      this.errorMessage = "";
      this.successMessage = "";
      this.loading = true;

      try {
        const response = await axios.post(
          "https://personal-finance-management-done.onrender.com/api/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
          }
        );

        this.successMessage = "Account created successfully!";
        console.log("Sign up successful:", response.data);

        this.username = "";
        this.email = "";
        this.password = "";
      } catch (error) {
        console.error("Error during sign-up:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.errorMessage = "";
      this.successMessage = "";
    },
    navigateToLogin() {
      this.successMessage = "";
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.signup-container {
  height: 100vh;
}

.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}

@media (max-width: 768px) {
  .image-section {
    display: none;
  }

  .form-section {
    padding: 3rem 2rem;
  }
}

input,
button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #1d4ed8;
}

button:focus,
input:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  max-width: 400px;
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
