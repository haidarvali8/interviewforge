/* InterviewForge — main.js
   Shared UI behavior: mobile nav toggle + FAQ accordions. */

(function () {
  'use strict';

  // Mobile navigation toggle
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navMobile.classList.toggle('open');
    });
  }

  // FAQ accordion — one open at a time
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function (other) { other.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });
})();
