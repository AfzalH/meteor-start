App.info({
  name: 'MyChannel',
  description: 'An App to show my liked videos',
  author: 'Md Afzal Hossain',
  email: 'afzal.csedu@gmail.com',
  website: 'https://www.srizon.com',
  version: '0.0.1',
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#ff9999');

App.accessRule('http://*', {type: 'navigation'});
App.accessRule('https://*', {type: 'navigation'});
