<template>
  <div class="md:bg-gray-50 p-6 md:p-10 josefin-font">
    <div class="flex justify-between items-center mb-6 flex-wrap">
      <h1
        class="text-4xl font-bold text-gray-800 w-full md:w-auto mb-4 md:mb-0"
      >
        Transactions
      </h1>
      <button
        @click="openAddTransactionModal"
        class="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
      >
        + New Transaction
      </button>
    </div>
    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <div class="flex space-x-4 mb-4">
        <div class="flex items-center space-x-2">
          <input
            type="date"
            v-model="filters.time"
            @input="resetPagination"
            class="border p-2 rounded-lg"
          />
          <select
            v-model="filters.category"
            @change="resetPagination"
            class="border p-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
      </div>
      <ul>
        <li
          v-for="(transaction, index) in paginatedTransactions"
          :key="transaction._id"
          class="flex justify-between items-center mb-2 border-b p-4 hover:bg-gray-100 transition duration-200"
        >
          <div class="">
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm  font-semibold',
                categoryBadgeClass(transaction.category),
              ]"
            >
              {{ transaction.category }}
            </span>
            <p class="px-3 mt-4 text-sm text-gray-500">
              {{ formatDate(transaction.time) }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <span
              :class="
                transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
              "
              class="flex items-center gap-1"
            >
              <p class="text-gray-500">$</p>
              {{ transaction.amount }}
            </span>
            <!-- <p class="text-sm text-gray-500 truncate w-32">
              {{ transaction.narration }}
            </p> -->
            <span
              v-if="transaction.amount < 0"
              class="material-icons text-red-500"
              ><i class="fa-solid fa-arrow-down"></i>
            </span>
            <span
              v-if="transaction.amount >= 0"
              class="material-icons text-green-500"
              ><i class="fa-solid fa-arrow-up"></i
            ></span>
            <div class="relative">
              <button
                @click="toggleDropdown(index)"
                class="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                ⋮
              </button>
              <div
                v-if="dropdownIndex === index"
                class="absolute right-0 bg-white border rounded shadow-lg py-2 z-10"
              >
                <button
                  @click="editTransaction(index)"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  @click="deleteTransaction(transaction._id)"
                  class="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="filteredTransactions.length === 0" class="text-center py-4">
        <p class="text-lg text-gray-500">No transactions found. Create one!</p>
      </div>
      <div
        v-if="filteredTransactions.length > 0"
        class="flex justify-center items-center gap-5 mt-4"
      >
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Previous
        </button>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center fade-enter-active josefin-font"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-5 md:mx-0"
        >
          <h3
            class="font-semibold text-2xl mb-4 text-center flex items-center flex-col"
          >
            <img src="../assets/images/lgv.png" alt="" class="h-10" />
            {{ isEditing ? "Edit" : " New" }} Transaction
          </h3>
          <form
            @submit.prevent="isEditing ? updateTransaction() : addTransaction()"
          >
            <div class="mb-4">
              <label class="block text-md font-semibold mb-2" for="amount"
                >Amount</label
              >
              <input
                type="number"
                v-model="currentTransaction.amount"
                id="amount"
                class="w-full border p-2 rounded-lg"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-md font-semibold mb-2" for="category"
                >Category</label
              >
              <select
                v-model="currentTransaction.category"
                id="category"
                class="w-full border p-2 rounded-lg"
                required
              >
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-md font-semibold mb-2" for="narration"
                >Narration</label
              >
              <input
                type="text"
                v-model="currentTransaction.narration"
                id="narration"
                class="w-full border p-2 rounded-lg"
                required
              />
            </div>
            <div class="flex space-x-4">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {{ isEditing ? "Save Changes" : "Confirm" }}
              </button>
              <button
                @click="closeModal"
                type="button"
                class="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axiosInstance from "../views/axiosInstance";

export default {
  name: "Transactions",
  data() {
    return {
      transactions: [],
      filters: { date: "", category: "" },
      isModalOpen: false,
      isEditing: false,
      dropdownIndex: null,
      currentTransaction: { amount: "", category: "", narration: "" },
      currentPage: 1,
      transactionsPerPage: 4,
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(t => {
        const matchesDate =
          !this.filters.time ||
          new Date(t.time).toISOString().split("T")[0] === this.filters.time;
        const matchesCategory =
          !this.filters.category || t.category === this.filters.category;
        return matchesDate && matchesCategory;
      });
    },
    paginatedTransactions() {
      const startIndex = (this.currentPage - 1) * this.transactionsPerPage;
      return this.filteredTransactions.slice(
        startIndex,
        startIndex + this.transactionsPerPage
      );
    },
    totalPages() {
      return Math.ceil(
        this.filteredTransactions.length / this.transactionsPerPage
      );
    },
  },

  // computed: {
  //   filteredTransactions() {
  //     return this.transactions.filter(t => {
  //       const matchesDate = !this.filters.time || t.time === this.filters.time;
  //       const matchesCategory =
  //         !this.filters.category || t.category === this.filters.category;
  //       return matchesDate && matchesCategory;
  //     });
  //   },
  //   paginatedTransactions() {
  //     const startIndex = (this.currentPage - 1) * this.transactionsPerPage;
  //     return this.filteredTransactions.slice(
  //       startIndex,
  //       startIndex + this.transactionsPerPage
  //     );
  //   },
  //   totalPages() {
  //     return Math.ceil(
  //       this.filteredTransactions.length / this.transactionsPerPage
  //     );
  //   },
  // },
  methods: {
    categoryBadgeClass(category) {
      const categoryColors = {
        Food: "bg-yellow-200 text-yellow-800",
        Transportation: "bg-green-200 text-green-800",
        Entertainment: "bg-purple-200 text-purple-800",
        Utilities: "bg-blue-200 text-blue-800",
      };
      return categoryColors[category] || "bg-gray-200 text-gray-800";
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    openAddTransactionModal() {
      this.isEditing = false;
      this.currentTransaction = { amount: "", category: "", narration: "" };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    fetchTransactions() {
      axiosInstance
        .get("/transactions")
        .then(response => {
          this.transactions = response.data.transactions;
        })
        .catch(error => {
          console.error("Error fetching transactions:", error);
        });
    },
    addTransaction() {
      axiosInstance
        .post("/transactions", this.currentTransaction)
        .then(() => {
          this.fetchTransactions();
          this.closeModal();
        })
        .catch(error => {
          console.error("Error saving transaction:", error);
        });
    },
    deleteTransaction(id) {
      axiosInstance
        .delete(`/transactions/${id}`)
        .then(() => {
          this.transactions = this.transactions.filter(t => t._id !== id);
        })
        .catch(error => {
          console.error("Error deleting transaction:", error);
        });
    },
    editTransaction(index) {
      this.isEditing = true;
      this.currentTransaction = { ...this.transactions[index] };
      this.isModalOpen = true;
    },
    updateTransaction() {
      axiosInstance
        .put(
          `/transactions/${this.currentTransaction._id}`,
          this.currentTransaction
        )
        .then(() => {
          this.fetchTransactions();
          this.closeModal();
        })
        .catch(error => {
          console.error("Error updating transaction:", error);
        });
    },
    resetPagination() {
      this.currentPage = 1;
    },
    goToPage(page) {
      this.currentPage = page;
    },
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index;
    },
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
