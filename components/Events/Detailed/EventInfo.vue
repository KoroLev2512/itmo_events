<script lang="ts" setup>
import dayjs from "dayjs";
import { useEventStore } from "~/stores/event";
import Description from "~/components/Events/Detailed/Sections/DescriptionComponent.vue";
import Persons from "~/components/Events/Detailed/Sections/Persons/PersonsComponent.vue";
import Links from "~/components/Events/Detailed/Sections/LinksComponent.vue";
import Addresses from "~/components/Events/Detailed/Sections/AddressesComponent.vue";
import Alert from "~/components/UI/Alert/AlertComponent.vue";
import pending from "~/public/icons/time_yellow.svg";
import succeed from "~/public/icons/tick.svg";
import AddPeople from "~/components/Events/Detailed/AddPeopleComponent.vue";

const regStatus = computed(() => useEventStore().regStatus);

const { event } = useEventStore();
const { status } = useAuth();

const alertContent = {
  succeed: {
    title: "Ждём вас на мероприятии!",
    text: "На вашу почту, указанную в аккаунте ITMO.ID, было отправлено письмо-приглашение. Если ваши планы поменяются и вы не сможете принять участие в мероприятии, пожалуйста, отмените регистрацию, чтобы кто-то еще смог поучаствовать.",
    iconPath: succeed,
  },
  pending: {
    title: "Вы находитесь в листе ожидания",
    text: "Это мероприятие с ограниченным количеством участников. Пока ваше участие не подтверждено, вы находитесь в листе ожидания. В случае подтверждения регистрации, на почту, указанную в аккаунте ITMO.ID, придет письмо-приглашение.",
    iconPath: pending,
  },
};
const nowDate = dayjs();
</script>

<template>
  <div
    v-if="false && dayjs(event?.dateEnd).diff(nowDate) > 0"
    class="alert-section"
  >
    <Alert
      v-if="
        regStatus != null &&
        event?.id &&
        status === 'authenticated' &&
        regStatus?.status === 2 &&
        event?.isRegistrationLimited
      "
      alert-type="pending"
      :title="alertContent.pending.title"
      :text="alertContent.pending.text"
      :icon-path="alertContent.pending.iconPath"
    />
    <Alert
      v-if="
        regStatus != null &&
        event?.id &&
        status === 'authenticated' &&
        (regStatus?.status === 2 || regStatus?.status === 1) &&
        !event?.isRegistrationLimited
      "
      alert-type="succeed"
      :title="alertContent.succeed.title"
      :text="alertContent.succeed.text"
      :icon-path="alertContent.succeed.iconPath"
    />
  </div>
  <div
    :class="`wrapper ${
      dayjs(event?.dateEnd).diff(nowDate) > 0 &&
      regStatus != null &&
      event?.id &&
      status === 'authenticated' &&
      ((regStatus?.status === 2 && event?.isRegistrationLimited) ||
        ((regStatus?.status === 2 || regStatus?.status === 1) &&
          !event?.isRegistrationLimited))
        ? 'with-alert'
        : ''
    }`"
  >
    <Description v-if="event?.description" :description="event?.description" />
    <Persons v-if="event?.persons?.length" :persons="event?.persons" />
    <Links v-if="event?.socialLinks?.length" :links="event?.socialLinks" />
    <Addresses v-if="event?.addresses?.length" :addresses="event?.addresses" />
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1150px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 40px 16px 24px;
}

.alert-section {
  padding: 16px;
}

/*
.with-alert {
  //padding-top: 0;
}
*/
</style>
