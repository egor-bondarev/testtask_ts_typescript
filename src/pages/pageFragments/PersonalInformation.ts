// Class describes frame with personal information.
import { Frame, Locator } from "@playwright/test";

export class PersonalInformation {
  private frame: Frame;

  private readonly screen_selector: string =
    '[aria-label="Personal information"]';
  private readonly firstName_selector: string =
    '[data-qa="personal-first-name"]';
  private readonly lastName_selector: string = '[data-qa="personal-last-name"]';
  private readonly eMail_selector: string = '[data-qa="personal-email"]';
  private readonly donateButton_selector: string =
    '[data-qa="privacy-continue"]';

  constructor(frame: Frame) {
    this.frame = frame;
  }

  /**
   * Get frame locator.
   *
   * @returns current frame locator.
   */
  public getFrame(): Locator {
    return this.frame.locator(this.screen_selector);
  }
  /**
   * Get first name field locator.
   *
   * @returns first name field locator.
   */
  public getFirstName(): Locator {
    return this.frame.locator(this.firstName_selector);
  }
  /**
   * Get last name field locator.
   *
   * @returns last name field locator.
   */
  public getLastName(): Locator {
    return this.frame.locator(this.lastName_selector);
  }
  /**
   * Get email field locator.
   *
   * @returns email field locator.
   */
  public getEmail(): Locator {
    return this.frame.locator(this.eMail_selector);
  }

  /**
   * Waiting screen loading.
   *
   * @returns current screen frame.
   */
  public async initScreen() {
    return await this.frame.waitForSelector(this.screen_selector);
    //[data-qa="active-screen-payment-method"]
  }

  /**
   * Fill personal data to form.
   *
   * @param dataType - type of data. Possible values: 'First Name', 'Last Name', 'Email'.
   * @param dataValue - value of input data.
   */
  public async fillPersonalData(dataType: string, dataValue: string) {
    let selector;
    switch (dataType) {
      case "First Name": {
        selector = this.firstName_selector;
        break;
      }
      case "Last Name": {
        selector = this.lastName_selector;
        break;
      }
      case "Email": {
        selector = this.eMail_selector;
        break;
      }
    }

    await this.frame.fill(selector, dataValue);
  }

  /**
   * Click "Donate" button.
   */
  public async acceptPersonalData() {
    await this.frame.locator(this.donateButton_selector).click();
  }
}
