import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import BookView from "@/views/BookView";
import BookListView from "@/components/book/BookListView";
import BookRegistView from "@/components/book/BookRegistView";
import BookDetailView from "@/components/book/BookDetailView";
import BookModifyView from "@/components/book/BookModifyView";
import QnaView from "@/views/QnaView";
import QnaListView from "@/components/qna/QnaListView";
import QnaRegistView from "@/components/qna/QnaRegistView";
import QnaDetailView from "@/components/qna/QnaDetailView";
import QuestionModifyView from "@/components/qna/QuestionModifyView";
import OnSaleView from"@/views/OnSaleView";
import OnSaleRegistView from "@/components/onsale/OnSaleRegistView";
import HouseView from "@/views/HouseView";
import HouseRegistView from "@/components/house/HouseRegistView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/question",
    name: "question",
    component: QnaView,
    redirect: "/question/list",
    children: [
      {
        path: "list",
        name: "QnaListView",
        component: QnaListView,
      },
      {
        path: "qnaregist",
        name: "QnaRegistView",
        component: QnaRegistView,
      },
      {
        path: "questiondetail",
        name: "QnaDetailView",
        component: QnaDetailView,
      },
      {
        path: "questionmodify",
        name: "QuestionModifyView",
        component: QuestionModifyView,
      },
    ],
  },
  {
    path: "/book",
    name: "BookView",
    component: BookView,
    redirect: "/book/booklist",
    children: [
      {
        path: "booklist",
        name: "BookListView",
        component: BookListView,
      },
      {
        path: "bookregist",
        name: "BookRegistView",
        component: BookRegistView,
      },
      {
        path: "bookdetail",
        name: "BookDetailView",
        component: BookDetailView,
      },
      {
        path: "bookmodify",
        name: "BookModifyView",
        component: BookModifyView,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  {
    path: "/onsale",
    name: "onsale",
    component: OnSaleView,
    redirect: "/onsale/registform",
    children: [
      {
        path: "registform",
        name: "OnSaleRegistView",
        component: OnSaleRegistView,
      },
    ],
  },
  {
    path: "/house",
    name: "house",
    component: HouseView,
    redirect: "/house/list",
    children: [
      {
        path: "regist",
        name: "HouseRegistView",
        component: HouseRegistView,
      },
    ],
  },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
