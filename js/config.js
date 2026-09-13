/* ==========================================================================
   North Carolina Veterans Outdoors — site settings.
   The only file that should need editing to go live. Public values only.
   ========================================================================== */
window.NCVO_CONFIG = {
  // Where the contact form POSTs JSON (Formspree, a Worker, etc.).
  // Leave empty and the form falls back to the visitor's own email app.
  contactEndpoint: '',

  // The group's inbox. Also printed on the contact page, in every footer and in
  // the structured data on index.html — change all of them together.
  // Empty = the form points people at the Facebook group instead.
  contactEmail: 'ncveteransoutdoors@yahoo.com',

  // Donation page (Zeffy, Givebutter, PayPal Giving Fund, etc.).
  // Leave empty and the Donate buttons stay pointed at the contact page.
  donateUrl: '',

  facebookUrl: 'https://www.facebook.com/groups/1114920179274547'
};
