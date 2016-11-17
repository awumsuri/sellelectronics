import { SellelectronicsPage } from './app.po';

describe('sellelectronics App', function() {
  let page: SellelectronicsPage;

  beforeEach(() => {
    page = new SellelectronicsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
