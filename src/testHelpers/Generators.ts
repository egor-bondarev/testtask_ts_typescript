// Class for genearating test data.
export class Generators {
  private readonly characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  /**
   * Generate first name.
   *
   * @returns generated string.
   */
  public generateFirstName(): string {
    return this.generateRandomString(3, 7);
  }

  /**
   * Generate last name.
   *
   * @returns generated string.
   */
  public generateLastName(): string {
    return this.generateRandomString(5, 14);
  }

  /**
   * Generate e-mail.
   *
   * @returns generated string.
   */
  public generateEmail(): string {
    let mailName = this.generateRandomString(2, 10);
    return mailName + "@google.com";
  }

  /**
   * Generate random string.
   *
   * @param minCount minimum symbols count.
   * @param maxCount maximum symbols count.
   * @returns generated string.
   */
  private generateRandomString(minCount: number, maxCount: number): string {
    let result = "";
    const min = Math.ceil(minCount);
    const max = Math.floor(maxCount);
    const count = Math.floor(Math.random() * (max - min) + min);

    for (let i = 0; i < count; i++) {
      result += this.characters.charAt(
        Math.floor(Math.random() * this.characters.length)
      );
    }
    return result;
  }
}
