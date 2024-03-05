import React from 'react';

import { StoryObj } from '@storybook/react';

import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';
import { MockAllDeployments } from '../../../.storybook/mocks/api';
import DeploymentsByFilterSkeleton from './DeploymentsByFilterSkeleton';
import DeploymentsByFilter from './index';

export default {
  component: DeploymentsByFilter,
  title: 'Components/Deployments by filter',
  decorators: [withButtonOverrides('button', 'click', 'cancel deployment action')],
};

type Story = StoryObj<typeof DeploymentsByFilter>;

export const Default: Story = {
  args: {
    deployments: MockAllDeployments(123),
  },
};

export const Loading: Story = {
  render: () => <DeploymentsByFilterSkeleton />,
};
export const NoDeployments = () => <DeploymentsByFilter deployments={[]} />;
