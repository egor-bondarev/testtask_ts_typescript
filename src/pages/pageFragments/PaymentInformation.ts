// Class describes frame with payment information.
import { Frame, Locator } from "@playwright/test";
import { PersonalInformation } from "./PersonalInformation";

export class PaymentInformation {
  private frame: Frame;

  private readonly screen_selector: string =
    '[aria-label="Payment information"]';
  private readonly paymentCardNumber_iframeTitle: string =
    'iframe[title="Secure card number input frame"]';
  private readonly paymentCardNumber_selector: string =
    '[data-elements-stable-field-name="cardNumber"]';
  private readonly paymentExpDate_iframeTitle: string =
    'iframe[title="Secure expiration date input frame"]';
  private readonly paymentExpDate_selector: string =
    '[data-elements-stable-field-name="cardExpiry"]';
  private readonly paymentCVC_iframeTitle: string =
    'iframe[title="Secure CVC input frame"]';
  private readonly paymentCVC_selector: string =
    '[data-elements-stable-field-name="cardCvc"]';
  private readonly continueButton_selector: string =
    '[data-qa="card-continue"]';
  private readonly errorToolTip_title_selector: string =
    '[data-qa="card-continue-error-title"]';
  private readonly errorToolTip_message_selector: string =
    '[data-qa="card-continue-error-message"]';
  private readonly iframeTitle: string = '[title="Donation Widget"]';

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
   * Get card number field locator.
   *
   * @returns card number field locator.
   */
  public getCardNumber(): Locator {
    return this.frame
      .frameLocator(this.paymentCardNumber_iframeTitle)
      .locator(this.paymentCardNumber_selector);
  }

  /**
   * Get expiration date field locator.
   *
   * @returns expiration date field locator.
   */
  public getExpirationDate(): Locator {
    return this.frame
      .frameLocator(this.paymentExpDate_iframeTitle)
      .locator(this.paymentExpDate_selector);
  }

  /**
   * Get CVCr field locator.
   *
   * @returns CVC field locator.
   */
  public getCvc(): Locator {
    return this.frame
      .frameLocator(this.paymentCVC_iframeTitle)
      .locator(this.paymentCVC_selector);
  }

  /**
   * Get tooltip error on frame.
   *
   * @returns title and message from tooltip error.
   */
  public async getError(): Promise<ToolTipErrors> {
    await this.frame.waitForSelector(this.errorToolTip_title_selector);
    let errors: ToolTipErrors = {
      title: await this.frame
        .locator(this.errorToolTip_title_selector)
        .textContent(),
      message: await this.frame
        .locator(this.errorToolTip_message_selector)
        .textContent(),
    };

    return errors;
  }
  /**
   * Waiting screen loading.
   *
   * @returns current screen frame.
   */
  public async initScreen() {
    return await this.frame.waitForSelector(this.screen_selector);
  }

  /**
   * Input payment data on direction widget.
   *
   * @param infoType - type of payment information. Possible values: "card number", "expiration date", "CVC".
   * @param infoValue - value for input.
   */
  public async fillPaymentInfo(infoType: string, infoValue: string) {
    let iframeTitle: string = "";
    let selector: string = "";
    switch (infoType) {
      case "card number": {
        iframeTitle = this.paymentCardNumber_iframeTitle;
        selector = this.paymentCardNumber_selector;
        break;
      }
      case "expiration date": {
        iframeTitle = this.paymentExpDate_iframeTitle;
        selector = this.paymentExpDate_selector;
        break;
      }
      case "CVC": {
        iframeTitle = this.paymentCVC_iframeTitle;
        selector = this.paymentCVC_selector;
        break;
      }
    }

    await this.frame
      .frameLocator(iframeTitle)
      .locator(selector)
      .fill(infoValue);
  }

  /**
   * Click on button "Continue" and wait next screen.
   *
   * @returns next screen.
   */
  public async confirmPaymentInfo() {
    await this.frame.locator(this.continueButton_selector).click();

    let nextScreen = new PersonalInformation(this.frame);
    nextScreen.initScreen();
    return nextScreen;
  }
}

export type ToolTipErrors = {
  title: string | null;
  message: string | null;
};
