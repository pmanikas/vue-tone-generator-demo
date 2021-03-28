const Main = () => import("../components/Main.vue");

const routes = [
  {
    path: "/:frequency?",
    name: "Main",
    component: Main,
  },
];

export default routes;
