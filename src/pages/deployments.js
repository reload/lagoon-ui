import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/main';
import EnvironmentWithDeploymentsQuery from 'lib/query/EnvironmentWithDeployments';
import DeploymentsSubscription from 'lib/subscription/Deployments';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import NavTabs from 'components/NavTabs';
import DeployLatest from 'components/DeployLatest';
import Deployments from 'components/Deployments';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withEnvironmentRequired } from 'lib/withDataRequired';
import { bp } from 'lib/variables';

/**
 * Displays the deployments page, given the openshift project name.
 */
export const PageDeployments = ({ router }) => {
  return (
    <>
      <Head>
        <title>{`${router.query.openshiftProjectName} | Deployments`}</title>
      </Head>
      <Query
        query={EnvironmentWithDeploymentsQuery}
        variables={{ openshiftProjectName: router.query.openshiftProjectName }}
      >
        {R.compose(
          withQueryLoading,
          withQueryError,
          withEnvironmentRequired
        )(({ data: { environment }, subscribeToMore }) => {
          subscribeToMore({
            document: DeploymentsSubscription,
            variables: { environment: environment.id },
            updateQuery: (prevStore, { subscriptionData }) => {
              if (!subscriptionData.data) return prevStore;
              const prevDeployments =
                prevStore.environment.deployments;
              const incomingDeployment =
                subscriptionData.data.deploymentChanged;
              const existingIndex = prevDeployments.findIndex(
                prevDeployment => prevDeployment.id === incomingDeployment.id
              );
              let newDeployments;

              // New deployment.
              if (existingIndex === -1) {
                newDeployments = [incomingDeployment, ...prevDeployments];
              }
              // Updated deployment
              else {
                newDeployments = Object.assign([...prevDeployments], {
                  [existingIndex]: incomingDeployment
                });
              }

              const newStore = {
                ...prevStore,
                environment: {
                  ...prevStore.environment,
                  deployments: newDeployments
                }
              };

              return newStore;
            }
          });

          return (
            <MainLayout>
              <Breadcrumbs>
                <ProjectBreadcrumb projectSlug={environment.project.name} />
                <EnvironmentBreadcrumb
                  environmentSlug={environment.openshiftProjectName}
                  projectSlug={environment.project.name}
                />
              </Breadcrumbs>
              <div className="content-wrapper">
                <NavTabs activeTab="deployments" environment={environment} />
                <div className="content">
                  <DeployLatest pageEnvironment={environment} />
                  <Deployments
                    deployments={environment.deployments}
                    projectName={environment.openshiftProjectName}
                  />
                </div>
              </div>
              <style jsx>{`
                .content-wrapper {
                  @media ${bp.tabletUp} {
                    display: flex;
                    padding: 0;
                  }
                }

                .content {
                  padding: 32px calc((100vw / 16) * 1);
                  width: 100%;
                }
              `}</style>
            </MainLayout>
          );
        })}
      </Query>
    </>
  );
};

export default withRouter(PageDeployments);
