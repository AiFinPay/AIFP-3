# Architecture

```mermaid
flowchart TB
  Issuer["AiFinPay issuer / KMS"] --> Credential["Signed passport credential"]
  Holder["Agent holder key"] --> Credential
  Credential --> Verifier["AIFP-3 verifier"]
  Wallets["Wallet ownership proofs"] --> Registry["Binding registry"]
  Registry --> Verifier
  Status["Lifecycle + revocation"] --> Verifier
  Verifier --> SDK["SDK / MCP / backend"]
  SDK --> P6["AIFP-6 policy"]
  P6 --> Execution["AIFP-1 / AIFP-2 / AIFP-4"]
  Anchor["Optional chain anchors"] -. digest/status .-> Registry
```

## Trust boundaries

| Component | Trusted for | Not trusted for |
|---|---|---|
| Issuer/KMS | issuer signatures and protected-claim updates | holder consent by itself |
| Holder key | holder-authorized commands | issuer-protected claim changes |
| Wallet proof verifier | address-control proof | agent identity by itself |
| Registry | current version, bindings and audit state | cryptographic proof without verification |
| Relying party | its own access decision | rewriting passport state |
| Chain anchor | immutable digest/status evidence | private credential storage |

## Storage separation

- **Public credential:** minimum portable claims and signatures.
- **Private profile:** recovery, private aliases and sensitive reputation evidence.
- **Registry:** lifecycle, versions, wallet bindings and audit references.
- **On-chain anchor:** digest/status only where useful.

The issuer private key belongs in a hardened KMS/HSM boundary with rotation and separation of duties. It must never appear in the credential, application logs or agent environment.

