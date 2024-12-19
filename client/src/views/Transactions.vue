<template>
  <div class="md:bg-gray-50 p-6 md:p-10">
    <h2 class="text-3xl font-bold mb-4 josefin-font text-yellow-500">
      Transactions
    </h2>

    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <h3 class="font-semibold mb-4 text-2xl josefin-font">
        Add New Transaction
      </h3>
      <form @submit.prevent="addTransaction">
        <div class="mb-4">
          <label
            class="block text-sm font-semibold mb-2 josefin-font"
            for="amount"
            >Amount</label
          >
          <input
            type="number"
            v-model="newTransaction.amount"
            id="amount"
            class="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-sm font-semibold mb-2 josefin-font"
            for="category"
            >Category</label
          >
          <select
            v-model="newTransaction.category"
            id="category"
            class="w-full border p-2 rounded-lg josefin-font"
            required
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
        <div class="mb-4 josefin-font">
          <label class="block text-sm font-semibold mb-2" for="narration"
            >Narration</label
          >
          <input
            type="text"
            v-model="newTransaction.narration"
            id="narration"
            class="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div class="mb-4 josefin-font">
          <label class="block text-sm font-semibold mb-2" for="date"
            >Date</label
          >
          <input
            type="date"
            v-model="newTransaction.date"
            id="date"
            class="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg josefin-font flex gap-1 items-center"
        >
          <i class="fa-solid fa-plus"></i>

          Add Transaction
        </button>
      </form>
    </div>

    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="font-semibold mb-4">Transactions</h3>

      <div class="mb-4 flex flex-col sm:flex-row sm:space-x-4">
        <input
          type="date"
          v-model="filters.date"
          class="border p-2 rounded-lg mb-4 sm:mb-0"
          placeholder="Filter by Date"
        />
        <select
          v-model="filters.category"
          class="border p-2 rounded-lg mb-4 sm:mb-0"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>
        <button @click="resetFilters" class="bg-gray-300 px-4 py-2 rounded-lg">
          Reset Filters
        </button>
      </div>

      <ul>
        <li
          v-for="(transaction, index) in filteredTransactions"
          :key="index"
          class="flex justify-between items-center mb-2 border-b"
        >
          <div>
            <p>{{ transaction.narration }}</p>
            <p class="text-sm text-gray-500">{{ transaction.date }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <span
              :class="
                transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
              "
            >
              {{ transaction.amount }}
            </span>
            <router-link
              :to="{ name: 'TransactionDetails', params: { id: index } }"
              class="text-blue-500"
            >
              View
            </router-link>
            <button @click="editTransaction(index)" class="text-blue-500">
              Edit
            </button>
            <button @click="deleteTransaction(index)" class="text-red-500">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="isEditing"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-5 md:mx-0 josefin-font"
      >
        <h3 class="font-semibold mb-4">Edit Transaction</h3>
        <form @submit.prevent="updateTransaction">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-2" for="editAmount"
              >Amount</label
            >
            <input
              type="number"
              v-model="editableTransaction.amount"
              id="editAmount"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-2" for="editCategory"
              >Category</label
            >
            <select
              v-model="editableTransaction.category"
              id="editCategory"
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
            <label class="block text-sm font-semibold mb-2" for="editNarration"
              >Narration</label
            >
            <input
              type="text"
              v-model="editableTransaction.narration"
              id="editNarration"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-2" for="editDate"
              >Date</label
            >
            <input
              type="date"
              v-model="editableTransaction.date"
              id="editDate"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="flex space-x-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
            <button
              @click="isEditing = false"
              type="button"
              class="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Transactions",
  data() {
    return {
      newTransaction: {
        amount: "",
        category: "",
        narration: "",
        date: "",
      },
      transactions: [
        {
          amount: -120.5,
          category: "Food",
          narration: "Grocery Shopping",
          date: "2024-02-20",
        },
        {
          amount: 3000.0,
          category: "Income",
          narration: "Salary Deposit",
          date: "2024-02-19",
        },
      ],
      filters: {
        date: "",
        category: "",
      },
      isEditing: false,
      editableTransaction: null,
      editableIndex: null,
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(transaction => {
        const matchesDate =
          !this.filters.date || transaction.date === this.filters.date;
        const matchesCategory =
          !this.filters.category ||
          transaction.category === this.filters.category;
        return matchesDate && matchesCategory;
      });
    },
  },
  methods: {
    addTransaction() {
      this.transactions.push({ ...this.newTransaction });
      this.newTransaction = {
        amount: "",
        category: "",
        narration: "",
        date: "",
      }; // Reset form
    },
    deleteTransaction(index) {
      this.transactions.splice(index, 1);
    },
    editTransaction(index) {
      this.editableTransaction = { ...this.transactions[index] };
      this.editableIndex = index;
      this.isEditing = true;
    },
    updateTransaction() {
      if (this.editableIndex !== null) {
        this.transactions.splice(this.editableIndex, 1, {
          ...this.editableTransaction,
        });
        this.isEditing = false;
        this.editableTransaction = null;
        this.editableIndex = null;
      }
    },
    resetFilters() {
      this.filters = {
        date: "",
        category: "",
      };
    },
  },
};
</script>

<style scoped>
.recent-transactions {
  font-family: "Lato", sans-serif;
}
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style>
