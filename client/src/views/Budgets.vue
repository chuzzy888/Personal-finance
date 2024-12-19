<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6 flex-wrap">
      <h1
        class="text-4xl font-bold text-gray-800 w-full md:w-auto mb-4 md:mb-0"
      >
        Budgets
      </h1>
      <button
        @click="openModal()"
        class="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
      >
        + New Budget
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="budget in budgets"
        :key="budget.id"
        class="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold text-gray-800">
            {{ budget.title }}
          </h2>
          <p class="text-gray-600 mt-2">
            <i class="fa-solid fa-naira-sign"></i>:
            <span class="text-blue-600 font-bold mr-2">{{
              budget.total_amount
            }}</span>
          </p>
          <p class="text-gray-600">
            Duration: <span class="capitalize">{{ budget.duration }}</span>
          </p>
        </div>

        <div class="flex justify-end mt-4 space-x-4">
          <button
            @click="openModal(budget)"
            class="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Edit
          </button>
          <button
            @click="deleteBudget(budget.id)"
            class="text-red-600 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="budgets.length === 0" class="text-center text-gray-500 mt-10">
      No budgets created yet. Click "New Budget" to get started!
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative mx-5 md:mx-0 josefin-font"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          {{ isEditing ? "Edit Budget" : "Create New Budget" }}
        </h2>

        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <form @submit.prevent="saveBudget">
          <div class="space-y-4">
            <div>
              <label class="text-gray-700 font-medium">Title</label>
              <input
                v-model="form.title"
                placeholder="e.g. Food Budget"
                required
                class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-700 font-medium">Total Amount</label>
              <input
                v-model.number="form.total_amount"
                placeholder="e.g. 5000"
                type="number"
                required
                class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-700 font-medium">Duration</label>
              <select
                v-model="form.duration"
                required
                class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {{ isEditing ? "Update Budget" : "Save Budget" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Budgets",
  data() {
    return {
      budgets: [],
      isModalOpen: false,
      isEditing: false,
      currentEditId: null,
      form: {
        title: "",
        total_amount: null,
        duration: "monthly",
      },
    };
  },
  methods: {
    openModal(budget = null) {
      this.isModalOpen = true;
      if (budget) {
        this.isEditing = true;
        this.currentEditId = budget.id;
        this.form = { ...budget };
      } else {
        this.isEditing = false;
        this.currentEditId = null;
        this.form = { title: "", total_amount: null, duration: "monthly" };
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.form = { title: "", total_amount: null, duration: "monthly" };
    },
    saveBudget() {
      if (this.isEditing) {
        const index = this.budgets.findIndex(b => b.id === this.currentEditId);
        if (index !== -1)
          this.budgets.splice(index, 1, {
            ...this.form,
            id: this.currentEditId,
          });
      } else {
        this.budgets.push({ ...this.form, id: Date.now() });
      }
      this.closeModal();
    },
    deleteBudget(id) {
      this.budgets = this.budgets.filter(b => b.id !== id);
    },
  },
};
</script>

<style scoped>
.bg-black {
  backdrop-filter: blur(4px);
}
.recent-transactions {
  font-family: "Lato", sans-serif;
}
.josefin-font {
  font-family: "Josefin Sans", sans-serif;
}
</style>
