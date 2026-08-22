/** Illustrative verification order. Use the released AIFP-3 SDK in production. */
type Passport = {
  protocol: "AIFP-3";
  version: "0.1";
  agent_id: string;
  passport_number: string;
  issuer_key_id: string;
  status: "PENDING_VERIFICATION" | "ACTIVE" | "RECOVERY" | "SUSPENDED_SECURITY" | "REVOKED";
  protected_claims_digest: string;
  issuer_signature: string;
};

export async function verifyPassport(passport: Passport): Promise<void> {
  validateStrictSchema(passport);
  const issuerKey = await resolveTrustedIssuerKey(passport.issuer_key_id);
  const canonical = canonicalizeProtectedClaims(passport);
  await verifyEd25519(issuerKey, canonical, passport.issuer_signature);
  const current = await fetchCurrentPassportState(passport.agent_id);

  if (current.status !== "ACTIVE") throw new Error(`passport is ${current.status}`);
  if (current.protected_claims_digest !== passport.protected_claims_digest) {
    throw new Error("passport is stale or protected claims were modified");
  }
}

declare function validateStrictSchema(value: unknown): void;
declare function resolveTrustedIssuerKey(keyId: string): Promise<Uint8Array>;
declare function canonicalizeProtectedClaims(passport: Passport): Uint8Array;
declare function verifyEd25519(key: Uint8Array, message: Uint8Array, signature: string): Promise<void>;
declare function fetchCurrentPassportState(agentId: string): Promise<{ status: Passport["status"]; protected_claims_digest: string }>;

