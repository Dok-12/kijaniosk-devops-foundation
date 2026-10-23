## This document explains the pipeline's business value
## How it works
## What happens when something goes wrong
## The security safeguards in plain language
Week 5 Friday — CI Pipeline Fault-Injection Log

Purpose

Five controlled faults were introduced independently to test whether the Jenkins CI pipeline detects failures, stops unsafe downstream work, reports the result, and runs its post-build actions. The healthy Jenkinsfile and application tests were restored after each fault.

Fault 1 — Lint

Injection: Added deliberately malformed JavaScript to src/index.js.

Observed result: The syntax check failed with SyntaxError: Unexpected end of input. Jenkins marked the Lint stage as failed and skipped Build, Parallel Verification, Archive and Fingerprint, and Publish to Nexus. Post actions ran, including workspace cleanup.

Reason: Invalid source code must be rejected early. Stopping before packaging or publishing prevents an invalid change from progressing through the delivery pipeline.

Recovery: Restored the original source file, verified it, committed and pushed the restoration, and confirmed a green Jenkins run.

Fault 2 — Build

Injection: Added a deliberate exit 42 to the Build stage.

Observed result: Lint passed. Build printed the fault-injection message and exited with status 42. Parallel Verification, Archive and Fingerprint, and Publish to Nexus were skipped. Post actions and workspace cleanup ran. Jenkins reported FAILURE.

Reason: A failed build must stop the pipeline because no trustworthy package should be promoted from a failed build stage.

Recovery: Restored the backed-up healthy Jenkinsfile, committed and pushed the restoration, and confirmed a successful Jenkins run.

Fault 3 — Parallel Verification

Injection: Changed the expected result in the payment-fee unit test so that a correct result failed the assertion.

Observed result: Lint and Build passed. Unit Tests reported four passing tests and one failing test. Security Audit ran independently and passed with zero reported vulnerabilities. Archive and Fingerprint and Publish to Nexus were skipped. Jenkins reported FAILURE, and post actions ran.

Reason: Tests and security checks provide independent evidence about release readiness. A passing security audit must not hide a failing functional test; publishing is blocked when either required verification fails.

Recovery: Restored the original test, confirmed all five tests passed locally, committed and pushed the restoration, and confirmed a green Jenkins run.

Fault 4 — Archive and Fingerprint

Injection: Added a check for a deliberately nonexistent tarball at the start of Archive and Fingerprint.

Observed result: Lint, Build, Unit Tests, and Security Audit passed. The archive stage failed when the missing artifact check ran. Publish to Nexus was skipped. Post actions and workspace cleanup ran, and Jenkins reported FAILURE.

Reason: A release must not be published unless the expected package exists and passes the archive-stage checks. This protects the release process from missing or incorrectly produced artifacts.

Recovery: Restored the healthy Jenkinsfile, committed and pushed it, and confirmed a green Jenkins run.

Fault 5 — Publish to Nexus

Injection: Temporarily changed the publish command to target a deliberately nonexistent Nexus repository path.

Observed result: Lint, Build, Unit Tests, Security Audit, and Archive and Fingerprint passed. Publish failed with npm error ENEEDAUTH for the deliberately invalid repository URL. The overall result was FAILURE. Jenkins masked the password variable, shell tracing was disabled before authentication data was created, and post actions ran cleanWs().

Reason: Publication is a release boundary. A failed publish must be visible as a failed pipeline, not reported as a successful release. The observed error was an authentication error; the run did not independently prove that Nexus returned a repository-not-found response.

Recovery: Restored the healthy Jenkinsfile and pushed commit 487e2e3 (Restore pipeline after publish fault injection). The final Jenkins run checked out that commit and finished with SUCCESS. It published kijanikiosk-payments@1.0.0-487e2e3, and workspace cleanup completed.

Overall conclusion

All five stages were fault-tested independently. In each recorded fault run, Jenkins failed the pipeline and prevented later release stages from running when an earlier required stage failed. The healthy configuration was restored after each fault, and the final run passed all five stages and published the package successfully.

The console output confirms workspace cleanup. The publish shell contains an exit trap to remove .npmrc; the console output alone does not independently prove that the trap executed during the failed publish run.
