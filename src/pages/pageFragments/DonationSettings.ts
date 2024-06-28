// Class describes frame with donation settings.
import { Frame, Locator } from "playwright";
import { PaymentMethod } from "./PaymentMethod";

export class DonationSettings {
  private frame: Frame;

  private readonly screen_selector: string = '[data-qa="fiat-donate-form"]';
  private readonly monthlyPlan_selector: string =
    '[data-tracking-element-name="monthlyPlan"]';
  private readonly chooseCurrency_selector: string =
    '[data-qa="currency-selector"]';
  private readonly currencySymbol_selector: string =
    '[data-qa="currency-symbol"]';
  private readonly inputAmount_selector: string = '[data-qa="amount"]';
  private readonly donateButton_selector: string = '[data-qa="donate-button"]';

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
   * Get donate button locator.
   *
   * @returns donate button locator.
   */
  public getDonateButton(): Locator {
    return this.frame.locator(this.donateButton_selector);
  }

  /**
   * Get currency symbol locator.
   *
   * @returns currency symbol locator.
   */
  public getCurrencySymbol(): Locator {
    return this.frame.locator(this.currencySymbol_selector);
  }

  /**
   * Get donate amount locator.
   *
   * @returns donate amount locator.
   */
  public getDonateAmount(): Locator {
    return this.frame.locator(this.inputAmount_selector);
  }

  /**
   * Waiting screen loading.
   *
   * @returns current screen frame.
   */
  public async initDialog() {
    return await this.frame.waitForSelector(this.screen_selector);
  }

  /**
   * Choose monthly donation plan.
   */
  public async clickMonthlyPlan() {
    await this.frame.locator(this.monthlyPlan_selector).click();
  }

  /**
   * Set currency.
   *
   * @param currency - target currency.
   */
  public async chooseCurrency(currency: string) {
    await this.frame.locator(this.chooseCurrency_selector).click();
    await this.frame.selectOption(this.chooseCurrency_selector, currency);
  }

  /**
   * Input amount of donate.
   *
   * @param value - donation amount.
   */
  public async inputAmount(value: number) {
    await this.frame.fill(this.inputAmount_selector, value.toString());
  }

  /**
   * Click button to confirm input data.
   *
   * @returns next screen PaymentMethod.
   */
  public async clickDonateButton() {
    await this.frame.locator(this.donateButton_selector).click();

    const nextScreen = new PaymentMethod(this.frame);
    nextScreen.initScreen();
    return nextScreen;
  }
}
