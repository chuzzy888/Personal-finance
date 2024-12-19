<template>
  <div class="p-6 min-h-screen josefin-font">
    <h2 class="text-3xl font-bold mb-4">Dashboard</h2>

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
        <PieChart :data="categoryData" class="w-full h-96"></PieChart>
      </div>

      <div
        class="bg-gray-800 p-6 shadow-xl transition-shadow duration-300 rounded-lg"
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

export default {
  name: "Dashboard",
  components: {
    PieChart,
  },
  data() {
    return {
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
};
</script>

<style scoped>
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style>
