import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Transactions from "../views/Transactions.vue";
import Budgets from "../views/Budgets.vue";
import TransactionDetails from "../views/TransactionDetails.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/signup", component: Signup, name: "Signup" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard" },
  { path: "/transactions", component: Transactions, name: "Transactions" },
  {
    path: "/transactions/:id",
    component: TransactionDetails,
    name: "TransactionDetails",
  },
  { path: "/budget", component: Budgets, name: "Budgets" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
