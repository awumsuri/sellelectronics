import { SellElectronicPage } from './app.po';

describe('sell-electronic App', function() {
  let page: SellElectronicPage;

  beforeEach(() => {
    page = new SellElectronicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
