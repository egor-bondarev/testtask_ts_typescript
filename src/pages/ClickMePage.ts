// Class describes base start screen.
import { Page } from "playwright";
import playwrightConfig from "../../playwright.config";
import { DonationSettings } from "./pageFragments/DonationSettings";

export class ClickMePage {
  readonly pageUrl: string = "/qa-test-7R58U3/";

  readonly donationWidget_selector: string = 'iframe[title="Donation Widget"]';
  readonly donationButton_title: string = "Donate Button";

  private frame: any;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Load start page.
   */
  public async openPage() {
    return await this.page.goto(playwrightConfig.use?.baseURL + this.pageUrl);
  }

  /**
   * Click button "Give Now".
   *
   * @returns modal donation dialog.
   */
  public async clickGiveNowButton() {
    let button = this.page.getByTitle(this.donationButton_title);
    await button.click();
    const iFramElement = await this.page
      .locator(this.donationWidget_selector)
      .elementHandle();
    this.frame = await iFramElement?.contentFrame();

    const modalDialog = new DonationSettings(this.frame);
    modalDialog.initDialog();
    return modalDialog;
  }
}
