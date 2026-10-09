(function () {
  'use strict';

  /* ---------- CONFIG: edit these ---------- */
  var WHATSAPP_NUMBER = '919876543210'; // country code + number, no + or spaces
  var GYM_NAME = 'IRONCORE FITNESS';

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-solid', window.scrollY > 30); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Hide broken images so gradient placeholder shows ---------- */
  document.querySelectorAll('.ph img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  /* ---------- Hero counters ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1400;
        (function tick(t) {
          var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e).toLocaleString('en-IN') + (p === 1 ? suf : '');
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: .6 });
    document.querySelectorAll('[data-count]').forEach(function (el) { io.observe(el); });
  }

  /* ---------- Pricing toggle ---------- */
  var perLabel = { monthly: '/month', quarterly: '/3 months', annual: '/year' };
  var key = { monthly: 'm', quarterly: 'q', annual: 'a' };
  document.querySelectorAll('.toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var term = btn.dataset.term;
      document.querySelectorAll('.toggle button').forEach(function (b) {
        var on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on));
      });
      document.querySelectorAll('.price b').forEach(function (b) { b.textContent = b.dataset[key[term]]; });
      document.querySelectorAll('.price .per').forEach(function (s) { s.textContent = perLabel[term]; });
    });
  });

  /* ---------- Plan buttons preselect enquiry form ---------- */
  var planSel = document.getElementById('plan');
  document.querySelectorAll('[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () { planSel.value = a.dataset.plan; });
  });

  /* ---------- Weekly schedule ---------- */
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var S = {
    wk: [
      ['6:00 am', 'Cross Training', 'Karan Iyer', '60 min', 1],
      ['7:30 am', 'Functional Fitness', 'Nisha Verma', '45 min', 0],
      ['12:30 pm', 'Express Fat Burn', 'Priya Raman', '30 min', 0],
      ['5:30 pm', 'Strength Foundations', 'Arjun Mehta', '60 min', 1],
      ['7:00 pm', 'Weight Loss Circuit', 'Priya Raman', '45 min', 0],
      ['8:00 pm', 'Open Barbell Club', 'Arjun Mehta', '75 min', 0]
    ],
    sat: [
      ['7:00 am', 'Cross Training Team WOD', 'Karan Iyer', '75 min', 1],
      ['9:00 am', 'Mobility and Recovery', 'Nisha Verma', '45 min', 0],
      ['11:00 am', 'Powerlifting Workshop', 'Arjun Mehta', '90 min', 1],
      ['5:00 pm', 'Weight Loss Circuit', 'Priya Raman', '45 min', 0]
    ],
    sun: [
      ['8:00 am', 'Functional Fitness', 'Nisha Verma', '60 min', 0],
      ['10:00 am', 'Open Gym and Coaching Floor', 'All coaches', '2 hrs', 0],
      ['5:00 pm', 'Stretch and Reset', 'Nisha Verma', '45 min', 0]
    ]
  };
  var tabs = document.getElementById('dayTabs');
  var panel = document.getElementById('sched');
  function render(d) {
    var list = d === 'Sat' ? S.sat : d === 'Sun' ? S.sun : S.wk;
    panel.innerHTML = list.map(function (r) {
      return '<div class="row"><time>' + r[0] + '</time><div><h3>' + r[1] + '</h3><small>' + r[3] + '</small></div>' +
        '<span class="coachn">' + r[2] + '</span>' +
        '<span class="tag' + (r[4] ? ' tag--hi' : '') + '">' + (r[4] ? 'High intensity' : 'All levels') + '</span></div>';
    }).join('');
  }
  days.forEach(function (d, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.role = 'tab'; b.textContent = d;
    var today = (new Date().getDay() + 6) % 7;
    b.setAttribute('aria-selected', String(i === today));
    b.addEventListener('click', function () {
      tabs.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      b.setAttribute('aria-selected', 'true'); render(d);
    });
    tabs.appendChild(b);
    if (i === today) render(d);
  });

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById('enqForm');
  var ok = document.getElementById('formOk');
  function setErr(id, msg) {
    var f = document.getElementById(id).closest('.f');
    f.classList.toggle('is-bad', !!msg);
    form.querySelector('[data-for="' + id + '"]').textContent = msg || '';
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var phone = form.phone.value.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
    var email = form.email.value.trim();
    var bad = false;
    setErr('name', ''); setErr('phone', ''); setErr('email', '');
    if (name.length < 2) { setErr('name', 'Enter your full name.'); bad = true; }
    if (!/^[6-9]\d{9}$/.test(phone)) { setErr('phone', 'Enter a valid 10-digit mobile number.'); bad = true; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('email', 'Enter a valid email address.'); bad = true; }
    if (bad) { var first = form.querySelector('.is-bad input'); if (first) first.focus(); return; }

    var text = 'Hi ' + GYM_NAME + ', I\'d like to book a free trial session.\n' +
      'Name: ' + name + '\nPhone: ' + phone + (email ? '\nEmail: ' + email : '') +
      '\nPlan: ' + form.plan.value + '\nGoal: ' + form.goal.value +
      (form.msg.value.trim() ? '\nNotes: ' + form.msg.value.trim() : '');
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

    /* TODO (optional): also POST the data to your backend, Formspree, Google Sheets, etc. */
    ok.hidden = false;
    ok.innerHTML = 'Thanks, ' + name.split(' ')[0] + '. Your enquiry is noted and a coach will call you within one working day. ' +
      'Want a faster reply? <a href="' + url + '" target="_blank" rel="noopener">Send it on WhatsApp</a>.';
    form.reset();
    ok.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
  });

  /* ---------- Footer year + WhatsApp link ---------- */
  document.getElementById('yr').textContent = new Date().getFullYear();
  document.getElementById('wa').href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' +
    encodeURIComponent('Hi ' + GYM_NAME + ', I\'d like to know more about memberships.');
})();
