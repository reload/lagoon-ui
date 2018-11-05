import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const addTask = gql`
  mutation addTask($input: TaskInput!) {
    addTask(input: $input) {
      name,
      environment,
      service,
      command,
      created,
      status,
    }
  }
`;

export default graphql(addTask, {
  props: ({ mutate }) => ({
    addTask: (
      name,
      environment,
      service,
      command,
      created,
      status,
    ) =>
      mutate({
        variables: {
          input: {
            name,
            environment,
            service,
            command,
            created,
            status,
          },
        },
      }),
  }),
});
