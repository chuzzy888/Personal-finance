<template>
  <div>
    <div v-if="!isAuthRoute" class="flex">
      <aside
        class="bg-gray-800 text-white h-screen md:w-64 p-4 transition-transform duration-300 md:relative"
        :class="{
          'w-64 fixed z-50': isMobile,
          '-translate-x-full': isMobile && !isSidebarOpen,
        }"
      >
        <h1
          class="text-2xl font-bold mb-4 josefin-font flex items-center gap-1"
        >
          <i class="fa-solid fa-coins"></i> Pay Crest
        </h1>
        <ul>
          <li class="hover:bg-white hover:text-gray-800 px-3 rounded-xl">
            <router-link
              to="/dashboard"
              class="block py-2 flex gap-2 items-center"
              ><i class="fas fa-columns text-pink-500"></i>
              Dashboard</router-link
            >
          </li>
          <li class="hover:bg-white hover:text-gray-800 px-3 rounded-xl">
            <router-link
              to="/transactions"
              class="block py-2 flex gap-2 items-center"
              ><i class="fa-solid fa-credit-card text-yellow-500"></i>
              Transactions</router-link
            >
          </li>
          <li class="hover:bg-white hover:text-gray-800 px-3 rounded-xl">
            <router-link to="/budget" class="block py-2 flex gap-2 items-center"
              ><i class="fas fa-calculator text-green-500"></i>
              Budget</router-link
            >
          </li>
          <li class="hover:bg-white hover:text-gray-800 px-3 rounded-xl">
            <router-link
              to="/dashboard"
              class="block py-2 flex gap-2 items-center"
              ><i class="fa-solid fa-chart-line text-blue-500"></i>
              Insights</router-link
            >
          </li>
          <li class="bottom-4 absolute hidden md:block">
            <router-link to="/login" class="block py-2 flex gap-2 items-center"
              ><i class="fa-solid fa-arrow-right-from-bracket"></i>
              <p class="hover:text-red-300">Log out</p></router-link
            >
          </li>
        </ul>
      </aside>

      <div
        v-if="isMobile && isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      <main class="flex-1 p-6">
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="md:hidden fixed top-4 right-4 z-50 text-gray-800 rounded text-3xl"
        >
          <i
            :class="isSidebarOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'"
          ></i>
        </button>

        <router-view />
      </main>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  computed: {
    isAuthRoute() {
      const authRoutes = ["/login", "/signup"];
      return authRoutes.includes(this.$route.path);
    },
    isMobile() {
      return window.innerWidth < 768;
    },
  },
  watch: {
    isMobile(newVal) {
      if (!newVal) {
        this.isSidebarOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateMobileStatus);
    this.updateMobileStatus();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMobileStatus);
  },
  methods: {
    updateMobileStatus() {
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style>
