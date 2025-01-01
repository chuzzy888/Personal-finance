<!-- <template>
  <div class="p-6 min-h-screen josefin-font">
    <div class="flex justify-between">
      <h2 class="text-3xl font-bold mb-4">Dashboard</h2>

      <div class="relative group">
        <div
          class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold cursor-pointer transform transition duration-300 ease-in-out group-hover:scale-110 pt-1"
        >
          {{ userInitials }}
        </div>

        <div
          class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          {{ userFullName }}
        </div>
      </div>
    </div>

    <div v-if="insightsSummary">
      <p>Total Income: {{ calculatedTotalIncome }}</p>
      <p>Total Expenses: {{ insightsSummary.totalExpenses }}</p>
      <p>Remaining Budget: {{ calculatedRemainingBudget }}</p>

      <ul v-if="insightsSummary.topCategories.length">
        <li
          v-for="category in insightsSummary.topCategories"
          :key="category.id"
        >
          {{ category.category }}: {{ category.total }}
        </li>
      </ul>
      <p v-else>No categories available.</p>
    </div>
    <p v-else>Loading insights...</p>
  </div>
</template>

<script>
import axiosInstance from "../views/axiosInstance";

export default {
  name: "Dashboard",
  data() {
    return {
      insightsSummary: null, // Start as null to show loading state
      userInitials: "",
      userFullName: "",
    };
  },
  computed: {
    // Calculate total income from topCategories
    calculatedTotalIncome() {
      if (!this.insightsSummary || !this.insightsSummary.topCategories)
        return 0;
      return this.insightsSummary.topCategories.reduce(
        (sum, category) => sum + (category.total || 0),
        0
      );
    },
    // Calculate remaining budget using calculated total income
    calculatedRemainingBudget() {
      return (
        this.calculatedTotalIncome + (this.insightsSummary?.totalExpenses || 0)
      );
    },
  },
  created() {
    this.setUserDetails();
    this.fetchInsightsSummary();
  },
  methods: {
    setUserDetails() {
      try {
        const username = localStorage.getItem("user") || "User";
        const email = localStorage.getItem("email") || "user@example.com";

        this.userFullName = email;

        const nameParts = username.split(/[\s._-]+/).filter(part => part);
        const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastNameInitial =
          nameParts.length > 1
            ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
            : "";

        this.userInitials = firstNameInitial + lastNameInitial;
      } catch (error) {
        console.error("Error decoding user details:", error);
        this.$router.push("/login");
      }
    },
    async fetchInsightsSummary() {
      try {
        const response = await axiosInstance.get("/insights/summary");
        console.log("API Response:", response.data);

        // Ensure the response structure matches expected data
        this.insightsSummary = {
          totalExpenses: response.data.totalExpenses || 0,
          topCategories: response.data.topCategories || [],
        };
      } catch (error) {
        console.error("Error fetching insights:", error);

        // Optional: Set default fallback data for UI continuity
        this.insightsSummary = {
          totalExpenses: 0,
          topCategories: [],
        };
      }
    },
  },
};
</script>

<style scoped>
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style> -->

<!-- 

<template>
  <div class="p-6 min-h-screen josefin-font">
    <div class="flex justify-between">
      <h2 class="text-3xl font-bold mb-4">Dashboard</h2>

      <div class="relative group">
        <div
          class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold cursor-pointer transform transition duration-300 ease-in-out group-hover:scale-110 pt-1"
        >
          {{ userInitials }}
        </div>

        <div
          class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          {{ userFullName }}
        </div>
      </div>
    </div>

    <div
      v-if="insightsSummary"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
    >
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold">Total Income</h3>
        <p class="text-2xl text-green-500">
          ${{ calculatedTotalIncome.toFixed(2) }}
        </p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold">Total Expenses</h3>
        <p class="text-2xl text-red-500">
          -${{ insightsSummary.totalExpenses.toFixed(2) }}
        </p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold">Remaining Budget</h3>
        <p class="text-2xl">${{ calculatedRemainingBudget.toFixed(2) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="bg-white p-6 shadow-xl transition-shadow duration-300 rounded-lg"
      >
        <h3 class="font-semibold text-2xl text-gray-800 mb-4">
          Top Spending Categories
        </h3>
        <PieChart :data="topFourCategoryData" class="w-full h-96"></PieChart>
      </div>

      <div
        class="bg-gray-800 p-6 shadow-xl transition-shadow duration-300 rounded-lg"
      >
        <h3 class="font-semibold text-2xl text-white mb-4">
          Recent Transactions
        </h3>
        <ul>
          <li
            v-for="(category, index) in insightsSummary.topCategories"
            :key="index"
            class="flex justify-between items-center p-4 mb-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <i class="fas fa-dollar-sign text-gray-700"></i>
              </div>
              <span class="text-lg font-medium text-gray-800">{{
                category.category
              }}</span>
            </div>
            <span class="text-lg font-semibold text-gray-800">
              ${{ category.total.toFixed(2) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../views/PieChart.vue";
import axiosInstance from "../views/axiosInstance";

export default {
  name: "Dashboard",
  components: {
    PieChart,
  },
  data() {
    return {
      insightsSummary: null,
      userInitials: "",
      userFullName: "",
    };
  },
  computed: {
    calculatedTotalIncome() {
      if (!this.insightsSummary || !this.insightsSummary.topCategories)
        return 0;
      return this.insightsSummary.topCategories.reduce(
        (sum, category) => sum + (category.total || 0),
        0
      );
    },
    calculatedRemainingBudget() {
      return (
        this.calculatedTotalIncome - (this.insightsSummary?.totalExpenses || 0)
      );
    },
    topFourCategoryData() {
      return (
        this.insightsSummary?.topCategories.slice(0, 4).map(category => ({
          name: category.category,
          value: category.total,
        })) || []
      );
    },
  },
  created() {
    this.setUserDetails();
    this.fetchInsightsSummary();
  },
  methods: {
    setUserDetails() {
      try {
        const username = localStorage.getItem("user") || "User";
        const email = localStorage.getItem("email") || "user@example.com";

        this.userFullName = email;

        const nameParts = username.split(/[\s._-]+/).filter(part => part);
        const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastNameInitial =
          nameParts.length > 1
            ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
            : "";

        this.userInitials = firstNameInitial + lastNameInitial;
      } catch (error) {
        console.error("Error decoding user details:", error);
        this.$router.push("/login");
      }
    },
    async fetchInsightsSummary() {
      try {
        const response = await axiosInstance.get("/insights/summary");
        console.log("API Response:", response.data);

        this.insightsSummary = {
          totalExpenses: response.data.totalExpenses || 0,
          topCategories: response.data.topCategories || [],
        };
      } catch (error) {
        console.error("Error fetching insights:", error);

        this.insightsSummary = {
          totalExpenses: 0,
          topCategories: [],
        };
      }
    },
  },
};
</script>

<style scoped>
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style> -->

<template>
  <div class="md:p-6 min-h-screen josefin-font">
    <div class="flex justify-between">
      <h2 class="text-3xl font-bold mb-4">Dashboard</h2>

      <div class="relative group hidden md:block">
        <div
          class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold cursor-pointer transform transition duration-300 ease-in-out group-hover:scale-110 pt-1"
        >
          {{ userInitials }}
        </div>

        <div
          class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          {{ userFullName }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold">Total Income</h3>
        <p class="text-2xl text-green-500">${{ totalIncome.toFixed(2) }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold">Total Expenses</h3>
        <p class="text-2xl text-red-500">-${{ totalExpenses.toFixed(2) }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold">Remaining Budget</h3>
        <p class="text-2xl">${{ remainingBudget.toFixed(2) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="bg-white p-6 shadow-xl transition-shadow duration-300 rounded-lg"
      >
        <h3 class="font-semibold text-2xl text-gray-800 mb-4">
          Top Spending Categories
        </h3>
        <PieChart :data="categoryData" class="w-full md:h-96"></PieChart>
      </div>

      <div
        class="bg-gray-800 p-6 shadow-xl transition-shadow duration-300 rounded-lg hidden md:block"
      >
        <h3 class="font-semibold text-2xl text-white mb-4">
          Recent Transactions
        </h3>
        <ul>
          <li
            v-for="(transaction, index) in recentTransactions"
            :key="index"
            class="flex justify-between items-center p-4 mb-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <i class="fas fa-dollar-sign text-gray-700"></i>
              </div>
              <span class="text-lg font-medium text-gray-800">{{
                transaction.name
              }}</span>
            </div>
            <span
              :class="
                transaction.type === 'expense'
                  ? 'text-red-500'
                  : 'text-green-500'
              "
              class="text-lg font-semibold"
            >
              ${{ transaction.amount.toFixed(2) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../views/PieChart.vue";
import { jwtDecode } from "jwt-decode";

export default {
  name: "Dashboard",
  components: {
    PieChart,
  },

  data() {
    return {
      userFullName: "ola@gmail.com", // Simulated user email
      userInitials: "O", // Initial placeholder
      totalIncome: 3000.0,
      totalExpenses: 500.0,
      recentTransactions: [
        { name: "Grocery Shopping", amount: 120.5, type: "expense" },
        { name: "Salary Deposit", amount: 3000.0, type: "income" },
        { name: "Netflix Subscription", amount: 15.99, type: "expense" },
        { name: "Gas Station", amount: 45.0, type: "expense" },
      ],
      categories: {
        groceries: 120.5,
        entertainment: 15.99,
        gas: 45.0,
        bills: 200.0,
      },
    };
  },
  computed: {
    remainingBudget() {
      return this.totalIncome - this.totalExpenses;
    },
    categoryData() {
      return [
        { name: "Groceries", value: this.categories.groceries },
        { name: "Entertainment", value: this.categories.entertainment },
        { name: "Gas", value: this.categories.gas },
        { name: "Bills", value: this.categories.bills },
      ];
    },
  },
  created() {
    this.setUserDetails();
  },
  methods: {
    setUserDetails() {
      try {
        const user = localStorage.getItem("user");
        this.username = localStorage.getItem("user");
        console.log(user);
        const username = user;
        this.userFullName = localStorage.getItem("email");
        const nameParts = username.split(/[\s._-]+/).filter(part => part);
        const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastNameInitial =
          nameParts.length > 1
            ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
            : "";

        this.userInitials = firstNameInitial + lastNameInitial;
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style>
