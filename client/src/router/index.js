import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Transactions from "../views/Transactions.vue";
import Budgets from "../views/Budgets.vue";
import TransactionDetails from "../views/TransactionDetails.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

const routes = [
  { path: "/", redirect: "/login" },
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
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("authToken");
  if (!isAuthenticated && to.path !== "/login" && to.path !== "/signup") {
    next("/login");
  } else {
    next();
  }
});
export default router;
