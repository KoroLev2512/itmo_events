<script setup lang="ts">
import _ from "lodash";
import type { PropType } from "vue";
import Section from "~/components/UI/Section/SectionComponent.vue";
import Map from "~/components/Events/Detailed/MapComponent.vue";

type addressType = {
  address: string;
  room: string;
  lng: number;
  lat: number;
};

const props = defineProps({
  addresses: {
    type: Array as PropType<
      {
        address: string;
        lng: number;
        lat: number;
        room: string;
      }[]
    >,
    required: true,
  },
});

function formatAddress(rooms: addressType[], address: string) {
  let finalAddress = address;
  if (rooms?.length > 1 || rooms[0]?.room !== "") {
    finalAddress = `${finalAddress}, ${rooms.map((item) => item.room).join(" / ")}`;
  }
  return finalAddress;
}

const preparedAddresses = _.groupBy(
  props.addresses,
  ({ address }: addressType) => address,
);

const uniqueAddresses = _.uniqBy(props.addresses, (address) => address.address);
</script>

<template>
  <Section title="Место проведения">
    <div class="addresses">
      <div
        v-for="(rooms, address) in preparedAddresses"
        :key="address"
        class="address"
      >
        <img src="/icons/geo.svg" alt="geo" />
        <p>{{ formatAddress(rooms, String(address)) }}</p>
      </div>
      <Map
        v-if="
          addresses?.length &&
          addresses[0].lng &&
          addresses[0].lng !== 0 &&
          addresses[0].lat &&
          addresses[0].lat !== 0
        "
        :points="uniqueAddresses"
      />
    </div>
  </Section>
</template>

<style scoped>
.addresses {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.address {
  display: flex;
  gap: 8px;
  align-items: center;
}

.address > div {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
}

@media (max-width: 991px) {
  .address > div {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
}

@media (max-width: 767px) {
  .addresses {
    margin-bottom: 0;
  }
}
</style>
