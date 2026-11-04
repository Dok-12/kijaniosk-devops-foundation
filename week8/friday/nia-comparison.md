# Week 8 Delivery Review: Board Briefing for Nia

## Executive summary

This review explains the improvements achieved during the delivery exercise, the evidence collected, and the work that remains before the service can be considered production-complete.

The Monday starting image was reported as 847 MB. By Tuesday, the production image had been reduced to approximately 56.6 MB. This represents a reduction of approximately 790.4 MB, or 93.3%. This is a substantial improvement in the amount of data distributed during delivery.

There is an important measurement distinction. The 56.6 MB figure is the compressed/content size recorded by the image tooling. The same production image occupies approximately 230 MB when measured in its uncompressed local form. These figures describe different things and should not be treated as directly interchangeable. Future reports should compare the same measurement type on both sides to maintain consistency.

Thursday's Phase 4 lab recorded a self-healing time of 10–25 seconds. This means the application recovered within that observed interval after a failure. Tuesday's separate deployment exercise also demonstrated recovery: when application instances were removed, replacements were created and the required two available instances were restored. However, Tuesday's recovery was not independently timed, so the Thursday measurement should not be presented as Tuesday's result.

## Comparison of delivery approaches

| Concern              | How previous weeks address it                                                                                                                                     | How Week 8 addresses it                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deployment mechanism | deployment script that fetches a versioned artifact, places it on the target servers, restarts the service, and verifies the deployment succeeded before exiting. | A versioned Docker image is published to Docker Hub and deployed through a Kubernetes Deployment configured for two replicas.                                                        |
| Rollback mechanism   | Define a rollback trigger condition as a combination of metric, threshold, and time window.                                                                       | A ReplicaSet-backed rolling update history provides a basis for rollout undo. A rollback was not executed or verified in this lab.                                                   |
| Failure recovery     | **Post-Incident Review Structure**                                                                                                                                | Kubernetes replaces deleted Pods to restore the desired replica count. Thursday Phase 4 recorded 10–25 seconds; Tuesday's test verified replacement and readiness without timing it. |
| Scaling              | Measuring what matters from the users perspective                                                                                                                  | The Deployment is configured for two replicas. This demonstrates a fixed replica count, not automatic scaling based on demand.                                                       |

## What the results mean

For the business, the smaller application package should reduce the amount of data transferred during delivery. This can make releases faster and more practical in environments where network bandwidth is limited. The application also operates with restricted privileges, while limits are placed on the computing resources it can consume. These measures improve consistency and reduce unnecessary exposure, although they do not independently prove that the service can safely handle real customer traffic.

The application successfully returned a healthy response when accessed from outside the deployment environment. A separate test from inside the environment also located the service using its internal address and received the expected response. Both application instances were registered to receive traffic. These checks demonstrate that the work progressed beyond simply producing an application package: the application started, could be located, and could respond through the intended access routes.

The recovery exercise demonstrated another important capability. When application instances were terminated, replacements were created automatically, restoring the required two available instances. This reduces the need for an operator to manually rebuild the service after every instance failure. The registry access credentials were also retained after the temporary deployment resources were removed, completing the requested laboratory cleanup.

## Remaining gaps and Week 9

Week 8 is a validated delivery and deployment foundation, not a production-complete service. It does not yet demonstrate measured capacity under realistic customer demand, automatic scaling, a successfully tested rollback, continuous monitoring and actionable alerts, a complete credential-rotation process, or secure public access with encrypted connections. Tuesday's recovery was not timed, and the historical Week 3 through week 8 comparison remains verifies rollback. Week 9 should introduce repeatable load and resilience testing, verify rollback through a controlled release, establish monitoring and alerts, formalize credential rotation and secure external access, and record comparable image-size and recovery-time measurements. Until these controls have been implemented and tested, the board should regard this work as a functioning deployment foundation with demonstrated health checks and recovery behavior, rather than a production-complete service.
