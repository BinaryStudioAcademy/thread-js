const { danger, fail } = require('danger');

const { ProjectPrefix } = require('./project.config.cjs');

const BranchPrefix = {
  TASK: 'task',
  FIX: 'fix'
};

const DangerConfig = {
  TITLE: {
    IS_REQUIRED: true,
    PATTERN: new RegExp(
      `^((${
        ProjectPrefix.APP
      })-[0-9]{1,6}): (.*\\S)$|(${ProjectPrefix.ENVIRONMENTS.join(
        '|'
      )}) to (${ProjectPrefix.ENVIRONMENTS.join('|')})$`
    )
  },
  ASSIGNEES: {
    IS_REQUIRED: true
  },
  LABELS: {
    IS_REQUIRED: true
  },
  BRANCH: {
    IS_REQUIRED: true,
    PATTERN: new RegExp(
      `^((${Object.values(BranchPrefix).join('|')})/(${
        ProjectPrefix.APP
      })-[0-9]{1,6})-[a-zA-Z0-9-]+$|(${ProjectPrefix.ENVIRONMENTS.join('|')})$`
    )
  }
};

const pr = danger.github.pr;

const checkAssignees = () => {
  const hasAssignees = Boolean(pr.assignee);

  if (!hasAssignees) {
    fail('This pull request should have at least one assignee.');
  }
};

const checkTitle = titlePattern => {
  const isTitleValid = titlePattern.test(pr.title);

  if (!isTitleValid) {
    fail(
      `The pull request title should match the following pattern: ${String(
        titlePattern
      )}.`
    );
  }
};

const checkLabels = () => {
  const hasLabels = pr.labels.length > 0;

  if (!hasLabels) {
    fail('This pull request should have at least one label.');
  }
};

const checkBranch = branchPattern => {
  const isBranchValid = branchPattern.test(pr.head.ref);

  if (!isBranchValid) {
    fail(
      `The pull request branch should match the following pattern: ${String(
        branchPattern
      )}.`
    );
  }
};

const applyDanger = () => {
  if (DangerConfig.TITLE.IS_REQUIRED) {
    checkTitle(DangerConfig.TITLE.PATTERN);
  }

  if (DangerConfig.ASSIGNEES.IS_REQUIRED) {
    checkAssignees();
  }

  if (DangerConfig.LABELS.IS_REQUIRED) {
    checkLabels();
  }

  if (DangerConfig.BRANCH.IS_REQUIRED) {
    checkBranch(DangerConfig.BRANCH.PATTERN);
  }
};

applyDanger();
