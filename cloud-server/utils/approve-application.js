const APPROVED_APPLICATIONS = {
  'Calculator': true,
  'WhatsApp': true,
}

module.exports = function approveApplication(applicationName) {
  return APPROVED_APPLICATIONS[applicationName];
}

