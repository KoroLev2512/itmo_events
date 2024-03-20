<script setup lang="ts">
import parsePhoneNumber from "libphonenumber-js";
import emailIcon from "~/public/icons/email.svg";
import phoneIcon from "~/public/icons/phone.svg";
import personIcon from "~/public/icons/person.svg";

const props = defineProps(["person"]);
const iconsHash: Record<string, any> = {
  email: emailIcon,
  phone: phoneIcon,
};

function numberClear(num: string) {
  const newNum = parsePhoneNumber(num);
  return newNum?.getURI();
}
function numberValidation(num: string) {
  const newNum = parsePhoneNumber(num);
  return newNum?.formatNational().replace("8 ", "+7 ");
}

const preparedContacts = props.person?.contacts
  ?.filter((item: { type: string }) =>
    Object.keys(iconsHash).includes(item.type),
  )
  .sort((a: { type: string }, b: { type: string }) => {
    if (a.type === "email" && b.type !== "email") {
      return -1;
    }
    if (a.type === "email" && b.type === "email") {
      return 0;
    }
    return 1;
  });
</script>

<template>
  <div class="person">
    <div class="person__image-wrapper">
      <img
        class="person__image"
        :src="person?.userPic ? person.userPic : personIcon"
        alt="person"
      />
    </div>
    <div class="person__info">
      <div class="person__info-main">
        <div class="person__name">{{ person.fullName }}</div>
        <div class="person__role">{{ person.role }}</div>
      </div>
      <div v-if="person?.contacts?.length" class="person__contacts-wrapper">
        <div
          v-for="contact in preparedContacts"
          :key="contact.fullName"
          class="person__contact"
        >
          <img :src="iconsHash[contact.type]" alt="contact.type" />
          <a v-if="contact.type === 'email'" :href="'mailto: ' + contact.value">
            {{ contact.value }}
          </a>
          <a
            v-else-if="contact.type === 'phone'"
            :href="numberClear(contact.value)"
          >
            {{ numberValidation(contact.value) }}
          </a>
          <div v-else class="person__extra">{{ contact.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.person {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex: 1;
}

.person__image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 144px;
  width: 144px;
  min-width: 96px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08));
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #f6f6f6;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
}

.person__image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
}

.person__info {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  margin-top: var(--margin-l);
}

.person__info-main {
  display: flex;
  flex-direction: column;
}

.person__name {
  font-family: "ALS Gorizont Variable", sans-serif;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  max-width: 80%;
}

.person__role {
  color: rgba(27, 31, 59, 0.6);
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  max-width: 80%;
}

.person__contacts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.person__contact {
  display: flex;
  gap: 8px;
}

.person__contact a {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-decoration: none;
  color: var(--black-color);
}

.person__extra {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .person {
    gap: 24px;
  }

  .person__info {
    margin-top: 0;
  }

  .person__image-wrapper {
    height: 48px;
    width: 48px;
    min-width: 48px;
  }

  .person__image {
    height: 40px;
    width: 40px;
  }
}
</style>
