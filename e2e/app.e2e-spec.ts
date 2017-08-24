import { RasaMessengerWebPage } from './app.po';

describe('rasa-messenger-web App', () => {
  let page: RasaMessengerWebPage;

  beforeEach(() => {
    page = new RasaMessengerWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
