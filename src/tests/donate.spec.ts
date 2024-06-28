import { test, expect } from "@playwright/test";
import { ClickMePage } from "../pages/clickMePage";
import { Locator } from "playwright";
import { ToolTipErrors } from "../pages/pageFragments/PaymentInformation";
import { Generators } from "../testHelpers/Generators";

let testDataGenerator = new Generators();

type TestCase = {
  donatefrequent: "monthly";
  currency: "USD";
  currencySymbol: "$";
  donateAmount: number;
  coverTransactionCost: boolean;
  cardnumber: string;
  expirationDate: string;
  cvc: string;
  firstName: string;
  lastName: string;
  email: string;
};

const testCase: TestCase = {
  donatefrequent: "monthly",
  currency: "USD",
  currencySymbol: "$",
  donateAmount: 100,
  coverTransactionCost: true,
  cardnumber: "4242 4242 4242 4242",
  expirationDate: "04 / 24",
  cvc: "000",
  firstName: testDataGenerator.generateFirstName(),
  lastName: testDataGenerator.generateLastName(),
  email: testDataGenerator.generateEmail(),
};

const testErrors: ToolTipErrors = {
  title: "Your card was declined",
  message:
    "Your card was declined. Your request was in live mode, but used a known test card.",
};

test("MakeDonation_WrongPaymentData_ShouldFail", async ({ page }) => {
  // Open page and check it title.
  let clickMePage = new ClickMePage(page);
  await clickMePage.openPage();
  await expect(page).toHaveTitle("QA Engineer Test");

  // Click button "Give Now" and check opened dialog.
  const donationSettings = await clickMePage.clickGiveNowButton();
  await expect(donationSettings.getFrame()).toBeVisible();

  // Choose "Monthly" and check button text for accepting.
  await donationSettings.clickMonthlyPlan();
  let buttonLocator: Locator = donationSettings.getDonateButton();
  await expect(buttonLocator).toContainText(testCase.donatefrequent);

  // Choose currency and check currency's symbol.
  await donationSettings.chooseCurrency(testCase.currency);
  let currentCurrencySymbol: Locator = donationSettings.getCurrencySymbol();
  await expect(currentCurrencySymbol).toContainText(testCase.currencySymbol);

  // Input donut amount and check it.
  await donationSettings.inputAmount(testCase.donateAmount);
  let currentAmount: Locator = donationSettings.getDonateAmount();
  await expect(currentAmount).toHaveValue(testCase.donateAmount.toString());

  // Click button "Donate" and check opened screen.
  const paymentMethod = await donationSettings.clickDonateButton();
  await expect(paymentMethod.getFrame()).toBeVisible();

  // Click checkbox and check it state.
  await paymentMethod.clickCoverTransactionCostCheckbox(
    testCase.coverTransactionCost
  );
  await expect(paymentMethod.getCheckbox()).toHaveAttribute(
    "aria-checked",
    testCase.coverTransactionCost.toString()
  );

  // Click credit card button and check opened screen.
  const paymentInformation = await paymentMethod.clickCreditCardPaymentButton();
  await expect(paymentInformation.getFrame()).toBeVisible();

  // Fill card number field and check it.
  await paymentInformation.fillPaymentInfo("card number", testCase.cardnumber);
  let currentCardNumber = paymentInformation.getCardNumber();
  await expect(currentCardNumber).toHaveValue(testCase.cardnumber);

  // Fill expiration date field and check it.
  await paymentInformation.fillPaymentInfo(
    "expiration date",
    testCase.expirationDate
  );
  let currentExpDate = paymentInformation.getExpirationDate();
  await expect(currentExpDate).toHaveValue(testCase.expirationDate);

  // Fill CVC filed and check it.
  await paymentInformation.fillPaymentInfo("CVC", testCase.cvc);
  let currentCvc = paymentInformation.getCvc();
  await expect(currentCvc).toHaveValue(testCase.cvc);

  // Click "Continue button" and check opened screen.
  const personalInformation = await paymentInformation.confirmPaymentInfo();
  await expect(personalInformation.getFrame()).toBeVisible();

  // Fill first name field and check it.
  await personalInformation.fillPersonalData("First Name", testCase.firstName);
  let currentFirstName = personalInformation.getFirstName();
  await expect(currentFirstName).toHaveValue(testCase.firstName);

  // Fill last name field and check it.
  await personalInformation.fillPersonalData("Last Name", testCase.lastName);
  let currentLastName = personalInformation.getLastName();
  await expect(currentLastName).toHaveValue(testCase.lastName);

  // Fill e-mail field and check it.
  await personalInformation.fillPersonalData("Email", testCase.email);
  let currentEmail = personalInformation.getEmail();
  await expect(currentEmail).toHaveValue(testCase.email);

  // Click button "Donate".
  await personalInformation.acceptPersonalData();

  // Waiting return to Payment information screen and error tooltip.
  let currentError = await paymentInformation.getError();
  await expect(paymentInformation.getFrame()).toBeVisible();
  expect(currentError.title).toEqual(testErrors.title);
  expect(currentError.message).toEqual(testErrors.message);
});
