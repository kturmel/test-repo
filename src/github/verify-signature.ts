import crypto from "crypto";

/**
 * Verify the signature of a webhook payload.
 *
 * @param secret
 * @param payload
 */
export function verifySignature(secret: string, payload: string) {
  /**
   * @param signature - the signature to verify
   */
  return (signature: string) => {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      `sha256=${hmac.update(payload).digest("hex")}`,
      "utf8"
    );
    const checksum = Buffer.from(signature, "utf8");

    return (
      checksum.length === digest.length &&
      crypto.timingSafeEqual(digest, checksum)
    );
  };
}
