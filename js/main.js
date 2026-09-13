/* ==========================================================================
   North Carolina Veterans Outdoors — progressive enhancement only.
   Every page works with JavaScript disabled; this layer just improves it.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.NCVO_CONFIG || {};

  // CSS keeps the menu open for no-JS visitors; hand control to the toggle.
  document.documentElement.classList.remove('no-js');

  /* ---- Current year in the footer ---- */
  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = year;
  });

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on Escape, and return focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Donate links ------------------------------------------------------
     Every donate button ships pointing at the contact page. A configured
     donation URL replaces it; a missing one leaves the working fallback.
  ------------------------------------------------------------------------ */
  if (CFG.donateUrl) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-donate]'), function (el) {
      el.setAttribute('href', CFG.donateUrl);
      el.setAttribute('rel', 'noopener');
    });
    var pending = document.getElementById('donate-pending');
    if (pending) pending.hidden = true;
  }

  /* ---- Contact form ---- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(message, state) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.setAttribute('data-state', state);
    statusEl.hidden = false;
  }

  function fieldValues() {
    var data = new FormData(form);
    var out = {};
    data.forEach(function (value, key) { out[key] = String(value).trim(); });
    return out;
  }

  /* No endpoint yet: hand the message to the visitor's own mail app. With no
     inbox configured either, say so plainly — never open an empty draft. */
  function mailtoFallback(v) {
    if (!CFG.contactEmail) {
      setStatus('This form is not connected yet. For now, the quickest way to reach us is ' +
                'to join the Facebook group and send a message to an admin.', 'err');
      return;
    }

    var body = [
      'Name: ' + v.name,
      'Email: ' + v.email,
      'Phone: ' + (v.phone || '-'),
      'Branch / status: ' + (v.branch || '-'),
      'Reason: ' + (v.topic || '-'),
      '',
      v.message
    ].join('\n');

    window.location.href = 'mailto:' + CFG.contactEmail +
      '?subject=' + encodeURIComponent('Website message: ' + (v.topic || 'General')) +
      '&body=' + encodeURIComponent(body);

    setStatus('Opening your email app so you can send this to us.', 'ok');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.reportValidity()) return;

    var values = fieldValues();

    // Honeypot: a real person never fills this in.
    if (values.website) return;

    if (!CFG.contactEndpoint) {
      mailtoFallback(values);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    fetch(CFG.contactEndpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        setStatus('Thank you — your message is on its way. Someone from the group will get back to you.', 'ok');
      })
      .catch(function () {
        setStatus('Sorry, that did not go through. Please reach us through the Facebook group instead.', 'err');
      })
      .then(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        }
      });
  });
})();
