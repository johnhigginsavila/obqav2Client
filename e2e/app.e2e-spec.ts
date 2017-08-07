import { Obqav2clientPage } from './app.po';

describe('obqav2client App', () => {
  let page: Obqav2clientPage;

  beforeEach(() => {
    page = new Obqav2clientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
