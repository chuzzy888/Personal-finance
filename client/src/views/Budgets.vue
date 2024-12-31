<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6 flex-wrap">
      <h1
        class="text-4xl font-bold text-gray-800 w-full md:w-auto mb-4 md:mb-0"
      >
        Budgets
      </h1>
      <button
        @click="openAddBudgetModal"
        class="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
      >
        + New Budget
      </button>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 josefin-font"
    >
      <div
        v-for="(budget, index) in budgets || []"
        :key="budget._id"
        class="flex justify-between items-center mb-4 border rounded-lg shadow-lg hover:shadow-xl p-6 bg-white transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {{ budget.title }}
          </h2>
          <p class="text-gray-600">
            <i class="fa-solid fa-naira-sign"></i>:
            <span class="text-blue-600 font-bold mr-2">{{
              budget.totalAmount
            }}</span>
          </p>
          <p class="text-gray-600 mt-2">
            Duration: <span class="capitalize">{{ budget.duration }}</span>
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="editBudget(index)"
            class="text-blue-600 hover:text-blue-700 px-3 py-1 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-200"
          >
            Edit
          </button>
          <button
            @click="deleteBudget(budget._id)"
            class="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg border border-red-600 hover:bg-red-50 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="budgets.length === 0" class="text-center text-gray-500 mt-10">
      No budgets created yet. Click "New Budget" to get started!
    </div>
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center fade-enter-active"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative mx-5 md:mx-0 josefin-font"
        >
          <h2
            class="text-2xl font-bold text-gray-800 mb-4 flex items-center flex-col"
          >
            <img src="../assets/images/lgv.png" alt="" class="h-10" />
            {{ isEditing ? "Edit Budget" : "Create New Budget" }}
          </h2>

          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <form @submit.prevent="isEditing ? updateBudget() : addBudget()">
            <div class="space-y-4">
              <div class="mb-4">
                <label class="block text-md font-semibold mb-2" for="title"
                  >Budget Title</label
                >
                <input
                  type="text"
                  v-model="currentBudget.title"
                  id="title"
                  class="w-full border p-2 rounded-lg"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-md font-semibold mb-2"
                  for="totalAmount"
                  >Total Amount</label
                >
                <input
                  type="number"
                  v-model="currentBudget.totalAmount"
                  id="totalAmount"
                  class="w-full border p-2 rounded-lg"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block text-md font-semibold mb-2" for="duration"
                  >Duration (e.g., "30 days")</label
                >
                <input
                  type="text"
                  v-model="currentBudget.duration"
                  id="duration"
                  class="w-full border p-2 rounded-lg"
                  required
                />
              </div>
              <div class="flex space-x-4">
                <button
                  type="submit"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {{ isEditing ? "Update Budget" : "Save Budget" }}
                </button>
                <button
                  @click="closeModal"
                  type="button"
                  class="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
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
  name: "Budgets",
  data() {
    return {
      budgets: [],
      isModalOpen: false,
      isEditing: false,
      currentBudget: {
        title: "",
        totalAmount: "",
        duration: "",
      },
    };
  },
  methods: {
    openAddBudgetModal() {
      this.isEditing = false;
      this.currentBudget = { title: "", totalAmount: "", duration: "" };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    fetchBudgets() {
      axiosInstance
        .get("/budgets")
        .then(response => {
          console.log("Response from API:", response);

          if (response.data && Array.isArray(response.data)) {
            console.log("Budgets data:", response.data);
            this.budgets = response.data;
          } else {
            console.log("No budgets found in response.");
            this.budgets = [];
          }
        })
        .catch(error => {
          console.error("Error fetching budgets:", error);
          this.budgets = [];
        });
    },

    addBudget() {
      axiosInstance
        .post("/budgets", this.currentBudget)
        .then(response => {
          // this.budgets.push(response.data);
          this.currentBudget = { title: "", totalAmount: "", duration: "" };
          this.closeModal();
          this.fetchBudgets();
        })
        .catch(error => {
          console.error("Error adding budget:", error);
        });
    },
    deleteBudget(id) {
      axiosInstance
        .delete(`/budgets/${id}`)
        .then(() => {
          this.budgets = this.budgets.filter(b => b._id !== id);
        })
        .catch(error => {
          console.error("Error deleting budget:", error);
        });
    },
    editBudget(index) {
      this.isEditing = true;
      this.currentBudget = { ...this.budgets[index] };
      this.isModalOpen = true;
    },
    updateBudget() {
      axiosInstance
        .put(`/budgets/${this.currentBudget._id}`, this.currentBudget)
        .then(() => {
          this.fetchBudgets();
          this.closeModal();
        })
        .catch(error => {
          console.error("Error updating budget:", error);
        });
    },
  },
  mounted() {
    this.fetchBudgets();
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
