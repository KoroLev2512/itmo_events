<script setup lang="ts">
import Section from "~/components/UI/Section/SectionComponent.vue";
import { useEventStore } from "~/stores/event";

const { event, saveInvitedPeople } = useEventStore();

const props = defineProps({
  invited: {
    type: [] as PropType<
      {
        id: string | null;
        surname: string;
        name: string;
        patronymic: string | null;
        birthDate: string;
      }[]
    >,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function addPerson() {
  dataEdited.value = true;
  invitedLocal.value.push({
    id: null,
    surname: "",
    name: "",
    patronymic: null,
    birthDate: "",
  });
}

function removePerson(index: number) {
  dataEdited.value = true;
  invitedLocal.value.splice(index, 1);
}

const invitedLocal = ref(props.invited);

const savingInProgress = ref(false);
const dataEdited = ref(false);
const validation = ref({});

function save() {
  savingInProgress.value = true;
  saveInvitedPeople(event.id, invitedLocal.value).then((res) => {
    if (res == null) {
      dataEdited.value = false;
      invitedLocal.value = props.invited;
      emit("close");
    } else {
      validation.value = res;
    }
    savingInProgress.value = false;
  });
}
</script>

<template>
  <UCard title="">
    <h4 class="mb-4">Приглашение гостей</h4>
    <div>
      На данное мероприятие вы можете дополнительно зарегистрировать близких,
      которые не могут зарегистрироваться самостоятельно, например, маленьких
      детей.
    </div>
    <div v-for="(person, index) in invitedLocal" :key="index" class="mt-3">
      <div class="flex justify-between items-baseline">
        <div class="mr-2">{{ index + 1 }}.</div>
        <UButton
          square
          color="white"
          size="xl"
          variant="link"
          @click="removePerson(index)"
        >
          <UIcon name="i-heroicons-x-mark" />
        </UButton>
      </div>
      <div class="flex gap-3 flex-col md:flex-row">
        <UFormGroup
          label="Фамилия"
          required
          class="xl:flex-grow"
          :error="validation[index]?.surname"
        >
          <UInput
            v-model="person.surname"
            size="xl"
            placeholder="Иванов"
            @input="dataEdited = true"
          />
        </UFormGroup>
        <UFormGroup
          label="Имя"
          required
          class="flex-grow"
          :error="validation[index]?.name"
        >
          <UInput
            v-model="person.name"
            size="xl"
            placeholder="Иван"
            @input="dataEdited = true"
          />
        </UFormGroup>
        <UFormGroup
          label="Отчество"
          class="flex-grow"
          :error="validation[index]?.patronymic"
          @input="dataEdited = true"
        >
          <UInput
            v-model="person.patronymic"
            size="xl"
            placeholder="Иванович"
            @input="dataEdited = true"
          />
        </UFormGroup>
        <UFormGroup
          label="Дата рождения"
          required
          :error="validation[index]?.birthdate"
        >
          <UInput
            v-model="person.birthDate"
            type="date"
            size="xl"
            @input="dataEdited = true"
          />
        </UFormGroup>
      </div>
      <hr class="mt-3" />
    </div>
    <div class="flex justify-center mt-3">
      <UButton
        color="gray"
        :ui="{ rounded: 'rounded-full' }"
        variant="outline"
        @click="addPerson"
        >Добавить
      </UButton>
    </div>
    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton color="emerald" :loading="savingInProgress" @click="save"
          >Сохранить
        </UButton>
        <UButton color="white" @click="emit('close')">Отмена</UButton>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
.description_full {
  display: block;
}

.description__button {
  display: none;
}

@media (max-width: 576px) {
  .description_part {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .description__button {
    display: block;
    color: #254ddd;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    border: none;
    background: none;
    cursor: pointer;
    margin-top: 16px;
  }
}
</style>
