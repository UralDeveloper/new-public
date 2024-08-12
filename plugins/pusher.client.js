import Pusher from 'pusher-js';

export default defineNuxtPlugin(nuxtApp => {
  const pusher = new Pusher('997675017eefcb4d215c', {
    cluster: 'eu',
    forceTLS: true
  });

  nuxtApp.provide('pusher', pusher);
});