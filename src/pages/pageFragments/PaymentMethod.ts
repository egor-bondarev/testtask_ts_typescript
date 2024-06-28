// Class describes frame with payment methods.
import { Frame, Locator } from "@playwright/test";
import { PaymentInformation } from "./PaymentInformation";

export class PaymentMethod {
  private frame: Frame;

  private readonly screen_selector: string =
    '[data-qa="active-screen-payment-method"]';
  private readonly coverCostCheckBox_selector: string =
    '[data-qa="cover-fee-checkbox"]';
  private readonly creditCardButton_selector: string = '[data-qa="cc-button"]';

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
   * Get cover transaction costs checkbox locator.
   *
   * @returns checkbox locator.
   */
  public getCheckbox(): Locator {
    return this.frame.locator(this.coverCostCheckBox_selector);
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
   * Click on checkbox for choosing cover transaction cost.
   *
   * @param state - checkbox state: true -> on, false -> off.
   */
  public async clickCoverTransactionCostCheckbox(state: boolean) {
    let currentState = await this.frame
      .locator(this.coverCostCheckBox_selector)
      .isChecked();

    if (currentState != state) {
      await this.frame.locator(this.coverCostCheckBox_selector).click();
    }
  }

  /**
   * Click on button "credit card" and wait next screen.
   *
   * @returns next screen.
   */
  public async clickCreditCardPaymentButton() {
    await this.frame.locator(this.creditCardButton_selector).click();

    const nextScreen = new PaymentInformation(this.frame);
    nextScreen.initScreen();
    return nextScreen;
  }
}
