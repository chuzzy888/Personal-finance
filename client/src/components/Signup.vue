<template>
  <div class="flex min-h-screen bg-gray-50 josefin-font">
    <div
      class="image-section w-full md:w-1/2 bg-blue-600 md:flex items-center justify-center hidden"
    >
      <img
        src="../assets/images/lgs.png"
        alt="Sign Up Illustration"
        class="w-[300] h-auto"
      />
    </div>

    <div
      class="form-section w-full md:w-1/2 flex items-center justify-center px-6 sm:px-8"
    >
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-5 md:p-8">
        <h1 class="text-3xl font-bold text-center mb-4 text-gray-800">
          <i class="fa-solid fa-coins"></i> Pay Crest
        </h1>
        <h2 class="text-2xl font-semibold text-center mb-4 text-gray-700">
          Create an Account
        </h2>
        <p class="text-center text-gray-500 mb-8">Sign up to get started</p>

        <form @submit.prevent="signup">
          <div class="mb-6">
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div class="mb-6">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition"
          >
            Sign Up
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
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
</style>
