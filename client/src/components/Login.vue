<template>
  <div class="flex min-h-screen bg-gray-50 josefin-font">
    <div
      class="w-full md:w-2/3 flex flex-col justify-center items-center px-6 sm:px-8 py-8 md:py-0"
    >
      <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-center mb-8">
          <h1
            class="text-3xl font-bold text-gray-800 flex items-center gap-1 josefin-font"
          >
            <i class="fa-solid fa-coins"></i> Pay Crest
          </h1>
        </div>

        <h2
          class="text-3xl font-semibold mb-4 text-center text-gray-700 josefin-font"
        >
          Welcome back!
        </h2>
        <p class="text-gray-500 text-center mb-6">
          Don't have an account yet?
          <router-link to="/signup" class="text-blue-600 hover:underline">
            Sign up now
          </router-link>
        </p>

        <form @submit.prevent="login">
          <div class="mb-6">
            <label class="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div class="mb-6 relative">
            <label class="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <span class="absolute right-3 top-3 text-gray-400 cursor-pointer">
              <i class="fas fa-eye"></i>
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
            class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>

    <div
      class="w-0 md:w-1/3 bg-blue-600 relative md:flex justify-center items-center hidden"
      style="
        background-image: url('@/assets/pattern-background.png');
        background-size: cover;
      "
    >
      <img
        src="../assets/images/lgs.png"
        alt="Financial Illustration"
        class="h-96 object-cover"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      console.log("Login logic goes here");
    },
  },
};
</script>

<style scoped>
input:focus,
button:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}

.fas.fa-eye {
  cursor: pointer;
}
</style>
