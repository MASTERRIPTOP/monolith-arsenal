// api.js — слой данных MONOLITH: ARSENAL
// Сейчас отдаёт заглушки. Когда сервер запустится — переключи USE_REAL_API на true.

(function(){
  const USE_REAL_API = false; // ← когда будет реальный API, поставь true
  const API_BASE = 'https://api.monolith-arsenal.com';

  // Дата открытия (поменяй когда объявишь)
  const OPENING_DATE = new Date('2026-03-01T12:00:00+03:00');

  window.MONOLITH_API = {
    async getOnline() {
      if (USE_REAL_API) {
        try {
          const r = await fetch(API_BASE + '/online');
          return await r.json();
        } catch(e) { return { online: 0, max: 100, serverReady: false }; }
      }
      return { online: 0, max: 100, serverReady: false };
    },

    async getTopPlayers() {
      if (USE_REAL_API) {
        try {
          const r = await fetch(API_BASE + '/top');
          return await r.json();
        } catch(e) { return []; }
      }
      return [];
    },

    async getFeed() {
      if (USE_REAL_API) {
        try {
          const r = await fetch(API_BASE + '/feed');
          return await r.json();
        } catch(e) { return []; }
      }
      return [
        { date: 'Скоро', text: 'Лента из Telegram-канала появится здесь автоматически.' },
        { date: 'В разработке', text: 'Ядро мода Fabric/NeoForge 1.21.11 в работе.' },
        { date: 'Набор', text: 'Ищем 3D-моделлера и модераторов. Подробности в канале.' }
      ];
    },

    getOpeningDate() { return OPENING_DATE; },

    getCountdown() {
      const diff = OPENING_DATE.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isOpen: true };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        isOpen: false
      };
    }
  };
})();
