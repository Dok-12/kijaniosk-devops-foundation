# KijaniKiosk Payments — CI Pipeline Briefing

## Executive Summary

The KijaniKiosk payments continuous integration (CI) pipeline provides a repeatable way to check, package, verify, and publish payment software. Instead of relying on a developer to remember every check and release step, Jenkins runs the same defined process whenever the selected branch is built. This improves consistency, makes failures visible, and reduces the chance that an unverified package reaches the package repository.

The pipeline uses a pinned Node.js Docker image, versioned packages, automated tests, a security audit, artifact fingerprinting, and authenticated publication to Nexus. It has a ten-minute timeout to prevent a build from running indefinitely.

## How the Pipeline Works

The pipeline runs five stages in order, with two verification activities running in parallel:

```text
Developer change
      |
      v
1. Lint — check JavaScript syntax
      |
      v
2. Build — create a versioned package
      |
      v
3. Parallel verification
      |----------------------|
      v                      v
   Unit tests            Security audit
      |______________________|
                 |
                 v
4. Archive and fingerprint
                 |
                 v
5. Publish authenticated package to Nexus
                 |
                 v
          Release available
```

**1. Lint:** Jenkins uses Node.js and npm from the pinned container image and checks JavaScript syntax. A lint failure stops the pipeline early, saving time and preventing invalid code from progressing.

**2. Build:** Jenkins creates a package named `kijanikiosk-payments`. The package version combines the base semantic version with the Git commit's short identifier, for example `1.0.0-487e2e3`. This connects a published package to the source revision used to create it.

**3. Parallel verification:** Unit tests check payment-total behavior, including fees, rounding, and invalid inputs. At the same time, `npm audit --audit-level=high` checks dependency vulnerabilities at the configured severity threshold. Both checks must pass before the pipeline continues.

**4. Archive and fingerprint:** Jenkins confirms the expected tarball exists, inspects its contents, archives it, and records a fingerprint. This provides a traceable build artifact for later review.

**5. Publish:** Jenkins publishes the tarball to the hosted Nexus npm repository using a Jenkins-managed credential. The pipeline creates a temporary `.npmrc` for the publish command and removes it afterward. The workspace cleanup action also runs at the end of the pipeline.

## What Happens When Something Goes Wrong

The pipeline is designed to fail visibly rather than continue to release after a required stage fails. Five controlled fault injections tested this behavior.

A syntax error in the Lint stage stopped the run before Build. A deliberate non-zero exit in Build stopped verification and release stages. A deliberately incorrect test expectation caused Unit Tests to fail while the independent Security Audit still ran; publication remained blocked. A check for a nonexistent tarball failed Archive and Fingerprint and prevented publication. Finally, changing the publish command to use an invalid Nexus repository path caused the Publish stage to fail, while earlier stages passed.

In each recorded fault run, Jenkins reported a failed pipeline and ran its post-build actions. The final restoration run passed all five stages and published `kijanikiosk-payments@1.0.0-487e2e3`. These experiments demonstrate that failures are visible and downstream release work is blocked when required checks do not pass. The publish fault returned an authentication error, so it should not be described as a confirmed repository-not-found response.

## Security and Operational Controls

The Node.js image is pinned to a specific version, reducing variation between runs. Unit tests and dependency auditing are automated. Jenkins stores the Nexus publishing credential rather than placing the password in the repository. The pipeline disables shell tracing before creating authentication data, and Jenkins masks the password variable in console output. The temporary npm configuration is removed by a shell exit trap and on normal completion. Jenkins also runs workspace cleanup in its post actions, including after failed builds.

The pipeline's timeout limits how long a build can consume resources. Artifact versioning and fingerprints support traceability. These controls reduce risk, but they do not replace routine credential review, access management, or review of dependency-audit results.

## Recommendation

Use the green pipeline as the release baseline and require a successful run before accepting a package as ready for use. Review failed stages before retrying, investigate security-audit findings, and retain the fault-injection log and build evidence with the project. Before merging, reviewers should verify that the feature branch contains the healthy Jenkinsfile, the required evidence files, and no committed credentials. This process provides a practical, auditable foundation for more reliable payments delivery.
