const successMarkup = `
<div class="consult-success" data-success hidden>
 <h2 tabindex="-1">I received your consultation request.</h2>
 <p>I'll contact you by your preferred method to arrange a time for our free 15-minute call. Your appointment is not booked yet.</p>
 <a class="text-link chapter-action" href="Home.html">Return to Home<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></a>
</div>
`;

const shortFormMarkup = `
<form class="consult-form" id="consultation-form" novalidate>
 <div class="error-summary" data-summary hidden tabindex="-1">Please check the highlighted fields.</div>
 <div>
  <label class="field-name" for="first-name">First name</label>
  <input id="first-name" name="firstName" type="text" autocomplete="given-name" required>
  <p class="field-error" data-error="firstName" hidden>Enter your first name.</p>
 </div>
 <fieldset>
  <legend>How would you like me to contact you?</legend>
  <div class="choices">
   <label><input type="radio" name="contactBy" value="email" required> Email</label>
   <label><input type="radio" name="contactBy" value="phone"> Phone</label>
  </div>
  <p class="field-error" data-error="contactBy" hidden>Choose email or phone.</p>
 </fieldset>
 <div data-email-wrap hidden>
  <label class="field-name" for="email">Email address</label>
  <input id="email" name="email" type="email" autocomplete="email">
  <p class="field-error" data-error="email" hidden>Enter a valid email address so I can contact you.</p>
 </div>
 <div data-phone-wrap hidden>
  <label class="field-name" for="phone">Phone number</label>
  <input id="phone" name="phone" type="tel" autocomplete="tel">
  <p class="field-error" data-error="phone" hidden>Enter a phone number so I can contact you.</p>
 </div>
 <fieldset class="support-field">
  <legend>Who is the support for?</legend>
  <div class="choices">
   <label><input type="radio" name="supportFor" value="myself" required> Myself</label>
   <label><input type="radio" name="supportFor" value="teenager"> My teenager</label>
   <label><input type="radio" name="supportFor" value="parent"> Me as a parent</label>
   <label><input type="radio" name="supportFor" value="unsure"> I'm not sure yet</label>
  </div>
  <p class="field-error" data-error="supportFor" hidden>Choose who you're seeking support for. You can select “I'm not sure yet.”</p>
 </fieldset>
 <div class="check-wrap">
  <label class="check">
   <input type="checkbox" name="understand" value="yes" required>
   <span>I understand that this form is for consultation requests and should not be used for emergencies.<br>Sending it does not establish a therapist-client relationship.</span>
  </label>
  <p class="field-error" data-error="understand" hidden>Please confirm that you've read this statement.</p>
 </div>
 <div class="actions-row">
  <button class="button" type="submit" data-submit>Request my consultation</button>
  <a class="text-link privacy-link" href="#privacy-note">Read the privacy notice<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></a>
 </div>
</form>
${successMarkup}
`;

const fullFormMarkup = `
<form class="consult-form" id="consultation-form" novalidate>
 <div class="error-summary" data-summary hidden tabindex="-1">Please check the highlighted fields.</div>
 <div class="form-band">
  <h2 class="form-title">About you</h2>
  <div class="form-grid">
   <div>
    <label class="field-name" for="first-name">First name</label>
    <input id="first-name" name="firstName" type="text" autocomplete="given-name" required>
    <p class="field-error" data-error="firstName" hidden>Enter your first name.</p>
   </div>
   <div>
    <fieldset>
     <legend>How would you like me to contact you?</legend>
     <div class="choices">
      <label><input type="radio" name="contactBy" value="email" required> Email</label>
      <label><input type="radio" name="contactBy" value="phone"> Phone</label>
     </div>
     <p class="field-error" data-error="contactBy" hidden>Choose email or phone.</p>
    </fieldset>
   </div>
   <div>
    <label class="field-name" for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email">
    <p class="field-error" data-error="email" hidden>Enter a valid email address so I can contact you.</p>
   </div>
   <div>
    <label class="field-name" for="phone">Phone number</label>
    <input id="phone" name="phone" type="tel" autocomplete="tel">
    <p class="field-error" data-error="phone" hidden>Enter a phone number so I can contact you.</p>
   </div>
  </div>
 </div>
 <div class="form-band">
  <h2 class="form-title">The session</h2>
  <div class="form-grid">
   <div>
    <fieldset>
     <legend>Who is the support for?</legend>
     <div class="choices">
      <label><input type="radio" name="supportFor" value="myself" required> Myself</label>
      <label><input type="radio" name="supportFor" value="teenager"> My teenager</label>
      <label><input type="radio" name="supportFor" value="parent"> Me as a parent</label>
      <label><input type="radio" name="supportFor" value="unsure"> I'm not sure yet</label>
     </div>
     <p class="field-error" data-error="supportFor" hidden>Choose who you're seeking support for. You can select “I'm not sure yet.”</p>
    </fieldset>
   </div>
   <div>
    <fieldset>
     <legend>How would you prefer to meet? <span class="hint">(optional)</span></legend>
     <div class="choices">
      <label><input type="radio" name="meet" value="in-person"> In person</label>
      <label><input type="radio" name="meet" value="online"> Online</label>
      <label><input type="radio" name="meet" value="either"> Either</label>
     </div>
    </fieldset>
   </div>
   <div>
    <fieldset>
     <legend>Preferred language <span class="hint">(optional)</span></legend>
     <div class="choices">
      <label><input type="radio" name="language" value="english"> English</label>
      <label><input type="radio" name="language" value="spanish"> Spanish</label>
      <label><input type="radio" name="language" value="either"> Either</label>
     </div>
    </fieldset>
   </div>
   <div>
    <label class="field-name" for="availability">When are you usually available for a call? <span class="hint">(optional)</span></label>
    <input id="availability" name="availability" type="text">
    <p class="hint">Include your time zone if you're outside New York.</p>
   </div>
  </div>
 </div>
 <div class="form-band">
  <h2 class="form-title">Before we speak <span>(optional)</span></h2>
  <div class="form-grid">
   <div>
    <label class="field-name" for="message">Anything you'd like me to know before we speak?</label>
    <textarea id="message" name="message"></textarea>
    <p class="hint">A sentence or two is enough. Please leave out medical records and sensitive personal details.</p>
   </div>
  </div>
 </div>
 <div class="form-foot">
  <div class="check-wrap">
   <label class="check">
    <input type="checkbox" name="understand" value="yes" required>
    <span>I understand that this form is for consultation requests and should not be used for emergencies.<br>Sending it does not establish a therapist-client relationship.</span>
   </label>
   <p class="field-error" data-error="understand" hidden>Please confirm that you've read this statement.</p>
  </div>
  <div class="actions-row">
   <button class="button" type="submit" data-submit>Request my consultation</button>
   <a class="text-link privacy-link" href="#privacy-note">Read the privacy notice<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></a>
  </div>
 </div>
</form>
${successMarkup}
`;

const bindForm = (mount) => {
  const form = mount.querySelector("form");
  const summary = mount.querySelector("[data-summary]");
  const success = mount.querySelector("[data-success]");
  const submit = mount.querySelector("[data-submit]");
  const emailWrap = mount.querySelector("[data-email-wrap]");
  const phoneWrap = mount.querySelector("[data-phone-wrap]");
  const email = form.email;
  const phone = form.phone;

  const showError = (name, on) => {
    const node = mount.querySelector(`[data-error="${name}"]`);
    if (node) node.hidden = !on;
  };

  const syncContactFields = () => {
    const choice = form.contactBy.value;
    if (emailWrap) emailWrap.hidden = choice !== "email";
    if (phoneWrap) phoneWrap.hidden = choice !== "phone";
    email.required = choice === "email";
    phone.required = choice === "phone";
    if (emailWrap && choice !== "email") {
      email.value = "";
      showError("email", false);
    }
    if (phoneWrap && choice !== "phone") {
      phone.value = "";
      showError("phone", false);
    }
  };

  form.querySelectorAll('[name="contactBy"]').forEach((input) => {
    input.addEventListener("change", syncContactFields);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    syncContactFields();
    const missing = [];
    if (!form.firstName.value.trim()) missing.push("firstName");
    if (!form.contactBy.value) missing.push("contactBy");
    if (form.contactBy.value === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) missing.push("email");
    if (form.contactBy.value === "phone" && !phone.value.trim()) missing.push("phone");
    if (!form.supportFor.value) missing.push("supportFor");
    if (!form.understand.checked) missing.push("understand");

    ["firstName", "contactBy", "email", "phone", "supportFor", "understand"].forEach((name) => {
      showError(name, missing.includes(name));
    });

    if (missing.length) {
      summary.hidden = false;
      summary.focus();
      return;
    }

    summary.hidden = true;
    submit.disabled = true;
    submit.textContent = "Sending your request…";
    window.setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
      success.querySelector("h2").focus();
    }, 700);
  });
};

const pinRequestToHeader = () => {
  if (window.location.hash !== "#request" && window.location.hash !== "#consultation") return;
  const band = document.getElementById("request");
  if (!band) return;
  const header = document.querySelector(".header-band");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const top = band.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
};

const mount = document.querySelector("[data-consult-form]");
if (mount) {
  const full = Boolean(document.querySelector(".wide-study"));
  mount.innerHTML = full ? fullFormMarkup : shortFormMarkup;
  bindForm(mount);
  pinRequestToHeader();
  window.requestAnimationFrame(pinRequestToHeader);
}

window.addEventListener("hashchange", pinRequestToHeader);

document.querySelectorAll('a[href="#privacy-note"]').forEach((link) => {
  link.addEventListener("click", () => {
    const note = document.getElementById("privacy-note");
    if (note) note.hidden = false;
  });
});
