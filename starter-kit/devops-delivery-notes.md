# KijaniKiosk DevOps Delivery Notes

## 1. Project Overview

KijaniKiosk is an online platform intended to help customers
discover and purchase products from a digital kiosk. The project
uses DevOps practices to support reliable delivery, collaboration,
automation, and continuous improvement.

## 2. Flow

Flow means moving changes from development to delivery in small,
manageable increments.

KijaniKiosk uses Git and GitHub to organize development work.
The main branch contains the primary version of the project.
The develop branch integrates completed changes, while feature
branches isolate individual tasks.

Developers create changes on feature branches, commit them with
clear messages, and submit pull requests to develop. Reviewing
changes before merging helps maintain code quality and reduces
integration problems.

## 3. Feedback

Feedback helps the team identify problems early and improve the
quality of each change.

KijaniKiosk uses Git reviews and testing to provide feedback.
Pull requests allow other contributors to inspect changes before
they are merged. Tests and application health checks can identify
defects before changes reach production.

Errors and failed checks should be investigated and corrected
before the affected changes are accepted.

## 4. Learning

Learning means using experience, test results, incidents, and
feedback to improve future work.

The KijaniKiosk team can document defects, investigate their
causes, and update development and deployment procedures.
After a problem, the team should identify its root cause and
record preventive actions.

Regular reviews help the team improve its workflow, testing,
documentation, security, and reliability over time.

## 5. Git Workflow

The project uses the following branches:

- main: the primary stable branch.
- develop: the integration branch.
- feature/starter-kit-files: the branch for creating the
  Week 2 starter-kit deliverables.

The feature branch is pushed to GitHub and submitted as a pull
request targeting develop. The pull request description explains
the changes and provides evidence of testing. After review and
approval, the changes are merged into develop.

## 6. Expected Benefits

These practices help KijaniKiosk deliver changes in smaller
increments, detect defects earlier, improve collaboration, and
use lessons from previous work to strengthen future releases.
