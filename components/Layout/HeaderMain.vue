<script setup lang="ts">
const { data, signIn, signOut, status } = useAuth();

function performAuth() {
  signIn("keycloak");
}

function logOut() {
  signOut();
}
</script>

<template>
  <header class="header-wrapper">
    <div class="header">
      <div>
        <NuxtLink to="/">
          <img class="header__logo" src="/logo.svg" alt="ITMO/Events" />
        </NuxtLink>
      </div>
      <div class="login-wrapper">
        <div v-if="data" class="login__user">
          <span v-if="data" class="login__name">{{ data.user.name }}</span>
        </div>
        <button
          v-if="status === 'unauthenticated'"
          class="login__button"
          @click="performAuth"
        >
          Войти с ITMO.ID
        </button>
        <button v-else class="logout__button" @click="logOut">
          <img src="/icons/exit.svg" alt="Выход" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  background-color: #1d1d1b;
  left: 0;
  right: 0;
  display: flex;
  min-height: 60px;
  justify-content: center;
  z-index: 1;
}

.header {
  max-width: 1150px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px;
  color: var(--white-color);
}

.login-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.login__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login__button,
.logout__button {
  background: none;
  border: none;
  transition: all 0.3s;
  cursor: pointer;
}

.login__button:hover,
.logout__button:hover {
  text-decoration: underline;
}

.login__name,
.login__button,
.logout__button {
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 767px) {
  .header__logo {
    max-width: 168px;
  }

  .login__name,
  .login__button,
  .logout__button {
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .login__user {
    display: none;
  }
  .header {
    padding: 20px 16px;
  }
}
</style>
