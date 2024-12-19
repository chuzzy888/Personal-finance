<template>
  <div>
    <h2 class="text-3xl font-bold mb-4">Transaction Details</h2>
    <div v-if="transaction">
      <p><strong>Amount:</strong> {{ transaction.amount }}</p>
      <p><strong>Category:</strong> {{ transaction.category }}</p>
      <p><strong>Narration:</strong> {{ transaction.narration }}</p>
      <p><strong>Date:</strong> {{ transaction.date }}</p>
    </div>
    <div v-else>
      <p>Transaction not found.</p>
    </div>
    <router-link to="/transactions" class="text-blue-500"
      >Back to Transactions</router-link
    >
  </div>
</template>

<script>
export default {
  name: "TransactionDetails",
  data() {
    return {
      transaction: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    const transactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    this.transaction = transactions.find((t, index) => index == id);
  },
};
</script>
