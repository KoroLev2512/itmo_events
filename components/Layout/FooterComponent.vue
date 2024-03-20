<script setup lang="ts"></script>

<template>
  <footer>
    <div class="top-footer-wrapper">
      <div class="top-footer">
        <div class="top-footer__logo-wrapper">
          <img src="/icons/ITMO-footer-logo.svg" alt="ITMO" />
        </div>
        <div class="links">
          <div class="links__line"></div>
          <div class="links__text">Будьте с нами</div>
          <a href="https://vk.com/itmoru" target="_blank" class="link">
            <img alt="VK" src="/icons/socialmedia/vk-icon-old.svg" />
          </a>
          <a
            href="https://www.youtube.com/spbifmo"
            target="_blank"
            class="link"
          >
            <img alt="YT" src="/icons/socialmedia/yt-icon.svg" />
          </a>
          <a href="https://t.me/itmoru" target="_blank" class="link">
            <img alt="TG" src="/icons/socialmedia/tg-icon.svg" />
          </a>
          <a href="https://ok.ru/itmo" target="_blank" class="link">
            <img alt="OK" src="/icons/socialmedia/ok-icon.svg" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 137px;
  overflow: hidden;
}

.top-footer-wrapper {
  background: #1d1d1b;
  display: flex;
  justify-content: center;
}

.top-footer {
  max-width: 1150px;
  width: 100%;
  display: flex;
  padding: 32px 8px 40px 8px;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  gap: 96px;
}

.top-footer__logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--white-color);
  gap: 32px;
}

.top-footer__logo-wrapper > img {
  height: 65px;
  width: auto;
}

.links {
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.links__line {
  border: 1px solid var(--white-color);
  height: 2px;
  width: 100%;
  background-color: var(--white-color);
}

.links__text {
  color: var(--white-color);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-transform: uppercase;
  white-space: nowrap;
}

.link > img {
  width: 24px;
}

@media (max-width: 1200px) {
  .top-footer {
    padding: 32px 24px 40px;
    gap: 48px;
  }
}

@media (max-width: 991px) {
  .top-footer {
    flex-direction: column;
    align-items: center;
  }
  .links {
    display: none;
  }
}

@media (max-width: 767px) {
  footer {
    height: 97px;
  }

  .top-footer {
    padding: 16px;
  }

  .top-footer > img {
    max-width: 160px;
  }
}

@media (max-width: 576px) {
  footer {
    height: 60px;
  }

  .top-footer {
    padding: 20px;
  }

  .top-footer__logo-wrapper > img {
    height: 21px;
  }
}
</style>
