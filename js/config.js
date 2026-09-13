/* ==========================================================================
   North Carolina Veterans Outdoors — site settings.
   The only file that should need editing to go live. Public values only.
   ========================================================================== */
window.NCVO_CONFIG = {
  // Where the contact form POSTs JSON (Formspree, a Worker, etc.).
  // Leave empty and the form falls back to the visitor's own email app.
  contactEndpoint: '',

  // The group's inbox. Leave empty until they choose one — the form will then
  // point people at the Facebook group rather than open an empty mail draft.
  contactEmail: '',

  // Donation page (Zeffy, Givebutter, PayPal Giving Fund, etc.).
  // Leave empty and the Donate buttons stay pointed at the contact page.
  donateUrl: '',

  facebookUrl: 'https://www.facebook.com/groups/1114920179274547'
};
