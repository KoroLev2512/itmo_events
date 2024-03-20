<script setup lang="ts">
import dayjs from "dayjs";
import _ from "lodash";
import { useEventStore } from "~/stores/event";
import Button from "~/components/UI/Button/ButtonComponent.vue";
import { ButtonVariants } from "~/components/UI/Button/types";
import "@/assets/styles/tags.css";
import AddPeopleComponent from "~/components/Events/Detailed/AddPeopleComponent.vue";

const { status } = useAuth();
const { event, register, cancelRegister, getRegStatus } = useEventStore();
const route = useRoute();
const address =
  _.uniq(event?.addresses.map((address) => address.address)).join(", ") ||
  undefined;

const regStatus = computed(() => useEventStore().regStatus);

function registerRequest() {
  if (status.value !== "authenticated") {
    const { signIn } = useAuth();
    signIn("keycloak");
  }
  register(route.params.id as string);
}

function cancelRegisterRequest() {
  confirmationModalShow.value = false;
  cancelRegister(route.params.id as string);
}

if (status.value === "authenticated") {
  getRegStatus(route.params.id as string);
}

const colorsTagsHash: Record<number, string> = {
  109: "pink-tag",
  110: "blue-tag",
  111: "red-tag",
  112: "green-tag",
  113: "orange-tag",
  114: "lilac-tag",
};
const nowDate = dayjs();

const confirmationModalShow = ref(false);
const addPeopleModalShow = ref(false);
</script>

<template>
  <section class="hero-wrapper">
    <video
      v-if="event?.video != null"
      loop
      muted
      playsinline
      autoplay
      :poster="event?.image"
      class="hero__bg"
    >
      <source :src="event?.video" type="video/mp4" />
    </video>
    <img
      v-else-if="event?.image"
      class="hero__bg"
      :src="event.image"
      :alt="event.name"
    />
    <div class="hero">
      <div v-if="event?.tags" class="hero__tags">
        <span
          v-for="tag in event?.tags"
          :key="tag.id"
          :class="[colorsTagsHash[tag.id]]"
          class="hero__tag"
        >
          {{ tag.label }}
        </span>
      </div>
      <div class="hero__info">
        <h1 v-if="event?.name" class="hero__title">
          {{ event?.name }}
        </h1>
        <div v-if="address" class="hero__extra-info">
          <img src="/icons/place.svg" alt="" />
          <span>
            {{ address }}
          </span>
        </div>
        <div v-if="event?.dateStart" class="hero__extra-info">
          <img src="/icons/time_white.svg" alt="" />
          <span>
            {{ dayjs(event?.dateStart).format("DD.MM.YYYY в HH:mm") }}
          </span>
        </div>
      </div>
      <div class="flex gap-3">
        <div>
          <Button
            v-if="
              event?.regCloseDate
                ? dayjs(event?.regCloseDate).diff(nowDate) < 0
                : dayjs(event?.dateEnd).diff(nowDate) < 0
            "
            :variant="ButtonVariants.disabled"
            disabled
          >
            Регистрация завершена
          </Button>
          <Button
            v-else-if="
              event?.regOpenDate
                ? dayjs(event?.regOpenDate).diff(nowDate) > 0
                : dayjs(event?.dateEnd).diff(nowDate) < 0
            "
            :variant="ButtonVariants.disabled"
            disabled
          >
            Регистрация откроется
            {{ dayjs(event?.regOpenDate).format("DD.MM.YYYY в HH:mm") }}
          </Button>
          <Button
            v-else-if="
              regStatus != null &&
              event?.id &&
              status === 'authenticated' &&
              regStatus?.status === 1 &&
              event?.isRegistrationLimited
            "
            :variant="ButtonVariants.disabled"
            disabled
          >
            Ожидайте подтверждение
          </Button>
          <Button
            v-else-if="
              regStatus != null &&
              event?.id &&
              status === 'authenticated' &&
              regStatus?.status === 0
            "
            :variant="ButtonVariants.primary"
            @click="registerRequest"
          >
            Зарегистрироваться
          </Button>
          <Button
            v-else-if="
              regStatus != null &&
              event?.id &&
              status === 'authenticated' &&
              (regStatus?.status === 2 || regStatus?.status === 1)
            "
            :variant="ButtonVariants.primary"
            @click="confirmationModalShow = true"
          >
            Отменить регистрацию
          </Button>
          <Button
            v-else-if="event?.id && status === 'unauthenticated'"
            :variant="ButtonVariants.primary"
            @click="registerRequest"
          >
            Войти для регистрации
          </Button>
          <Button v-else variant="skeleton" disabled />
        </div>
        <Button
          v-if="
            event?.canParticipantInvite &&
            (regStatus?.status === 1 || regStatus?.status === 2)
          "
          variant="icon primary"
          @click="addPeopleModalShow = true"
        >
          <UIcon name="i-heroicons-user-plus-solid" />
        </Button>
        <div v-if="false && event?.canParticipantInvite && regStatus?.invitedParticipants != null && regStatus?.invitedParticipants?.length > 0" class="hero__extra-info"><span>+ {{regStatus?.invitedParticipants?.length}}</span></div>
      </div>
    </div>
  </section>
  <UModal v-model="confirmationModalShow">
    <UCard title="Подтвердите действие">
      <div>Вы действительно хотите отменить регистрацию на мероприятие?</div>
      <template v-if="event?.canParticipantInvite">
        <br />При отказе от участия в мероприятии все добавленные вами участники
        так же будут считаться отказавшимися от участия.
      </template>
      <template #footer>
        <div class="flex gap-3 justify-end">
          <UButton color="red" @click="cancelRegisterRequest"
            >Отменить регистрацию
          </UButton>
          <UButton color="white" @click="confirmationModalShow = false"
            >Отмена
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>

  <UModal v-model="addPeopleModalShow" :ui="{ width: 'w-full sm:max-w-5xl' }">
    <add-people-component
      :invited="regStatus?.invitedParticipants"
      @close="addPeopleModalShow = false"
    />
  </UModal>
</template>
<style scoped>
.hero-wrapper {
  height: 600px;
  background: rgba(0, 0, 0, 0.65);
  position: relative;
}

.hero {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  max-width: 1150px;
  padding: 0 16px 56px;
  gap: 16px;
}

.hero__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  object-fit: cover;
  object-position: center center;
}

.hero__info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero__title {
  color: var(--white-color);
}

.hero__extra-info {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
}

.hero__extra-info span {
  color: var(--white-color);
  font-size: 18px;
  line-height: 28px;
}

.hero__tags {
  display: flex;
  gap: 8px;
}

.hero__tag {
  padding: 4px 8px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: var(--white-color);
  border-radius: 16px;
  letter-spacing: 0.05em;
}

.hero > button {
  margin-top: 24px;
}

@media (max-width: 767px) {
  .hero-wrapper {
    min-height: 500px;
    height: auto;
  }

  .hero__extra-info span {
    color: var(--white-color);
    font-size: 14px;
    line-height: 20px;
  }

  .hero__tags {
    margin-top: 150px;
  }

  .hero > button {
    width: 100%;
  }
}
</style>
