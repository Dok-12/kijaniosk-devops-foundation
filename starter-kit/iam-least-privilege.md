# IAM and Least Privilege for KijaniKiosk

## 1. Introduction

Identity and Access Management (IAM) controls who can access cloud
resources and what actions they can perform.

KijaniKiosk should use IAM to protect its application, customer data,
databases, storage, and deployment infrastructure.

## 2. Principle of Least Privilege

The principle of least privilege means granting each user, application,
and service account only the permissions needed to perform its assigned
tasks, and no more.

For example, a developer who only needs to read application logs
should not automatically receive permission to delete databases or
change production networking.

## 3. IAM Roles and Responsibilities

KijaniKiosk can separate access according to responsibilities:

- **Developers:** Access development resources and the code repositories
  needed for their tasks.
- **Deployment automation:** Permission to deploy the application and
  update only the resources required by the deployment process.
- **Operations team:** Access to monitoring, logs, and approved
  operational controls.
- **Security or administrators:** Elevated permissions for specific
  administrative tasks, protected by additional controls.
- **Application services:** Access only to the data and services needed
  for the application's operation.

These are example role categories. Actual permissions should reflect
the team's responsibilities and the selected cloud provider.

## 4. IAM Security Practices

KijaniKiosk should follow these practices:

1. Grant permissions through roles and groups where practical.
2. Avoid sharing individual user accounts.
3. Require multi-factor authentication (MFA), especially for
   privileged accounts.
4. Use temporary credentials or workload identities instead of
   long-lived access keys whenever supported.
5. Never commit passwords, access keys, or tokens to Git repositories.
6. Review permissions regularly and remove access that is no longer
   required.
7. Separate development and production access.
8. Protect privileged actions with approval and audit controls.
9. Log and monitor important access and configuration changes.
10. Remove access promptly when a team member leaves or changes roles.

## 5. Example Access Matrix

| Role | Example permissions | Permissions to avoid by default |
|---|---|---|
| Developer | Read and modify development resources | Unrestricted production administration |
| Deployment service | Deploy approved application versions | Managing unrelated users or resources |
| Operations team | View monitoring and application logs | Unrestricted access to customer data |
| Security administrator | Manage approved security policies | Unreviewed routine use of permanent administrator access |
| Application service | Access required application data | Creating users or changing account permissions |

Permissions should be scoped to the specific resources and actions
required. This table is illustrative and must be adapted to the chosen
cloud provider.

## 6. Access Reviews and Auditing

KijaniKiosk should review user accounts, service identities, and
permissions periodically. Audit logs should record important access
and administrative actions.

When excessive permissions are identified, the team should remove
them and verify that legitimate application tasks continue to work.

## Conclusion

Applying least privilege reduces unnecessary access and limits the
potential impact of compromised accounts or incorrect configuration.
Combining scoped permissions, MFA, secure credentials, access reviews,
and audit logging helps protect KijaniKiosk's cloud resources and data.
