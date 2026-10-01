# Cloud Service Models for KijaniKiosk

## Introduction

Cloud computing allows KijaniKiosk to use computing resources over
the internet without having to own and maintain all the underlying
physical infrastructure.

The three main cloud service models are Infrastructure as a Service
(IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).

## 1. Infrastructure as a Service (IaaS)

IaaS provides virtual computing resources such as servers, storage,
and networking. The cloud provider manages the physical infrastructure,
while the customer manages the operating system, applications, and
most software configurations.

KijaniKiosk use case:
The team could use virtual machines to host its web application and
configure the operating system, web server, and security settings.

Benefits:
- Flexible control over servers and networking.
- Ability to customize the operating system and software.
- Resources can be scaled as demand changes.

Considerations:
- The team must maintain operating systems and apply security patches.
- Incorrect configurations can create security risks.

## 2. Platform as a Service (PaaS)

PaaS provides a managed platform for building, testing, and deploying
applications. The provider manages much of the underlying infrastructure
and runtime, allowing developers to focus on application code.

KijaniKiosk use case:
The team could deploy its application to a managed application
platform instead of maintaining the underlying servers.

Benefits:
- Less server administration.
- Simplified application deployment.
- Easier integration with managed development and monitoring tools.

Considerations:
- There may be restrictions on supported runtimes and configurations.
- The application may depend on a particular provider's services.

## 3. Software as a Service (SaaS)

SaaS provides ready-to-use software over the internet. The provider
operates and maintains the application, while users access it through
a browser or another client.

KijaniKiosk use case:
The team could use a SaaS service for source-code collaboration,
project communication, or issue tracking. GitHub is an example of a
service that provides hosted collaboration features.

Benefits:
- Little or no infrastructure maintenance for the customer.
- Access through a web browser.
- Provider-managed updates and service maintenance.

Considerations:
- Customization may be limited.
- Access depends on the provider, connectivity, and account permissions.

## Comparison

| Model | What the provider manages | What KijaniKiosk manages |
|---|---|---|
| IaaS | Physical infrastructure and virtualization | Operating system, applications, and configurations |
| PaaS | Infrastructure and managed application platform | Application code and application-level settings |
| SaaS | The hosted application and underlying infrastructure | Users, access permissions, and service configuration |

## Conclusion

KijaniKiosk can choose a cloud service model according to its need
for control, available technical skills, maintenance effort, and
deployment requirements. IaaS offers more infrastructure control,
PaaS reduces platform maintenance, and SaaS provides ready-to-use
software.
