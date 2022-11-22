<template>
  <!-- <nav class="navbar navbar-expand-sm bg-light w-100">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/book">도서 관리</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">로그인</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/question">Q/A</router-link>
        </li>
      </ul>
    </div>
  </nav> -->


  <div>
  <b-navbar toggleable="lg" type="dark" style="background:#2bd586;" >
    <img src="../assets/img/logo.png" border="0" width="50">
    <b-navbar-brand tag ="h1" href="/">내집클로버</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="question/list">Q&A</b-nav-item>
        <b-nav-item href="onsale/registform" v-if="dealer">매물 등록</b-nav-item>
        <b-nav-item href="#" >Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </b-nav-item>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>

export default {
  data() {
    return {
      dealer : true,
    };
  },
};
</script>
