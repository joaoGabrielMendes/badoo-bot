const selector = {
  btn_like: '[data-qa="profile-card-action-vote-yes"]',
  btn_nope: '[data-qa="profile-card-action-vote-no"]',
  btn_say_hi: '[data-qa="mutual-attraction-cta"]',
  chat_messages: '[data-qa="chat-messages"]', // div contain messages
  messages: '[data-qa="chat-message"]',
  chat_label: '[data-qa="chat-input-textarea"]',
  send_message: '[data-qa="messenger-chat-send-circle"]',
};

const xPath = {
  badoo_btn_login: '//*[@id="signin-submit"]/button',
  badoo_confirm_cookies_btn:
    "/html/body/div/div[2]/div[2]/div[2]/div[4]/div/button[2]",
  badoo_swipe_like:
    "/html/body/div[1]/div/div[1]/div/div/div[2]/div[2]/div/div/div[3]/div/div/div[3]/div/button",
  badoo_swipe_x:
    "/html/body/div[1]/div/div[1]/div/div/div[2]/div[2]/div/div/div[3]/div/div/div[2]/div/button",
};

export { selector, xPath };
