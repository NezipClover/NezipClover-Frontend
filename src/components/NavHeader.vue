<template>
  <nav class="navbar navbar-expand-sm bg-light">
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
  </nav>
</template>
