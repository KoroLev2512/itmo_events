import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useFetch";

export interface IEvent {
  id: number;
  image: string;
  video: string | null;
  name: string;
  dateStart: string;
  dateEnd: string;
  regOpenDate: string;
  regCloseDate: string;
  addresses: {
    address: string;
    room: string;
    lng: number;
    lat: number;
  }[];
  description: string;
  persons?: {
    contacts?: {
      type: string;
      value: string;
    }[];
    fullName: string;
    role: string;
    userPic: string;
  }[];
  socialLinks: {
    type: string;
    label: string;
    link: string;
  }[];
  tags: {
    id: number;
    label: string;
  }[];
  isRegistrationLimited: boolean;
  canParticipantInvite: boolean;
}

interface EventState {
  event: IEvent | null;
  error: string | null;
  eventsList: IEvent[] | null;
  regStatus: {
    status: number;
    invitedParticipants:
      | {
          id: string | null;
          surname: string;
          name: string;
          patronymic: string | null;
          birthDate: string;
        }[]
      | null;
  } | null;
}

// TODO понять как реализовать индикатор загрузки

export const useEventStore = defineStore({
  id: "event",
  state: (): EventState => ({
    eventsList: null,
    event: null,
    error: null,
    regStatus: null,
  }),
  actions: {
    async getEvent(id: string) {
      try {
        this.regStatus = null;
        const { data: event } = await useApiFetch<IEvent>(`/events/${id}`);
        const data = toRaw(event.value);
        if (data?.error_code !== 0 && data?.error_message) {
          this.error = data.error_message;
        } else if (data?.result) {
          this.event = data.result;
        }
      } catch (err) {
        this.event = null;
        this.error = "unknown server error";
        return err;
      }
    },
    async getEventsList() {
      try {
        const { data: events } = await useApiFetch<IEvent[]>("/events");
        const data = toRaw(events.value);
        if (data?.error_code !== 0 && data?.error_message) {
          this.error = data.error_message;
        } else if (data?.result) {
          this.eventsList = data.result;
        }
      } catch (err) {
        this.eventsList = null;
        this.error = "unknown server error";
        return err;
      }
    },
    async register(id: string) {
      try {
        this.regStatus = null;
        const response = await $fetch<{
          error_code: number;
          error_message: string | null;
          result: {
            status: number;
            invitedParticipants: {
              id: string | null;
              surname: string;
              name: string;
              patronymic: string | null;
              birthDate: string;
            }[];
          };
        }>(`/api/v1/events/${id}/registration`, {
          method: "POST",
        });
        if (response?.error_code !== 0 && response?.error_message) {
          this.error = response.error_message;
        } else if (response?.result) {
          this.regStatus = response.result;
        }
      } catch (err) {
        this.regStatus = null;
        this.error = "unknown server error";
        return err;
      }
    },
    async cancelRegister(id: string) {
      try {
        this.regStatus = null;
        const response = await $fetch<{
          error_code: number;
          error_message: string | null;
          result: {
            status: number;
            invitedParticipants: {
              id: string | null;
              surname: string;
              name: string;
              patronymic: string | null;
              birthDate: string;
            }[];
          };
        }>(`/api/v1/events/${id}/registration`, {
          method: "DELETE",
          body: {
            test: new Date(),
          },
        });
        if (response?.error_code !== 0 && response?.error_message) {
          this.error = response.error_message;
        } else if (response?.result) {
          this.regStatus = response.result;
        }
      } catch (err) {
        this.regStatus = null;
        this.error = "unknown server error";
        return err;
      }
    },
    async getRegStatus(id: string) {
      try {
        this.regStatus = null;
        const response = await $fetch<{
          error_code: number;
          error_message: string | null;
          result: {
            status: number;
            invitedParticipants: {
              id: string | null;
              surname: string;
              name: string;
              patronymic: string | null;
              birthDate: string;
            }[];
          };
        }>(`/api/v1/events/${id}/registration`);
        if (response?.error_code !== 0 && response?.error_message) {
          this.error = response.error_message;
        } else if (response?.result) {
          this.regStatus = response.result;
        }
      } catch (err) {
        this.regStatus = null;
        this.error = "unknown server error";
        return err;
      }
    },
    async saveInvitedPeople(
      id: string,
      people: {
        id: string | null;
        surname: string;
        name: string;
        patronymic: string | null;
        birthDate: string;
      }[],
    ) {
      try {
        this.regStatus!.invitedParticipants = null;
        const response = await $fetch<{
          error_code: number;
          error_message: string | null;
          result: {
            id: string | null;
            surname: string;
            name: string;
            patronymic: string | null;
            birthDate: string;
          }[];
        }>(`/api/v1/events/${id}/registration/invite`, {
          method: "POST",
          body: people,
          ignoreResponseError: true,
        });

        if (response.error_code === 0) {
          this.regStatus!.invitedParticipants = response?.result;
        } else {
          return response.result;
        }
      } catch (err) {
        return err;
      }
    },
  },
});
