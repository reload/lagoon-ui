import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import RemoveUserConfirm from 'components/Organizations/RemoveUserConfirm';
import gql from 'graphql-tag';

import { StyledGroupMembers } from './Styles';

const REMOVE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($groupName: String!, $email: String!) {
    removeUserFromGroup(input: { group: { name: $groupName }, user: { email: $email } }) {
      name
    }
  }
`;

/**
 * The primary list of members.
 */
const GroupMembers = ({ members = [], groupName, projectDefaultGroup, onUserRemove }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredMembers = members.filter(key => {
    const sortByName = key.user.email.toLowerCase().includes(searchInput.toLowerCase());
    const sortByRole = key.role.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', 'role', '__typename'].includes(key) ? false : (true && sortByName) || sortByRole;
  });

  const duRegex = new RegExp('^default-user@' + groupName.replace('project-', '') + '$', 'g');

  return (
    <StyledGroupMembers>
      <div className="header">
        <label>Members</label>
        <label></label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={members.length === 0}
        />
      </div>
      <div className="deployments">
        <div className="data-table">
          {!members.length && <div className="data-none">No members</div>}
          {searchInput && !filteredMembers.length && (
            <div className="data-none">No members matching "{searchInput}"</div>
          )}
          {filteredMembers.map(member => (
            <div key={member.user.email} className="data-row" deployment={member.user.email}>
              <div className="name">
                {member.user.email}{' '}
                {member.user.comment && member.user.comment.includes('autogenerated user for project') && (
                  <label className="system-user-label">system account</label>
                )}
              </div>
              <div className="role">
                <label className={`${member.role}-label`}>{member.role}</label>
              </div>
              <div className="remove">
                {(member.user.comment &&
                  member.user.comment.includes('autogenerated user for project') &&
                  projectDefaultGroup.includes('project') &&
                  member.user.email.match(duRegex) != null) || (
                  <>
                    <Mutation mutation={REMOVE_USER_FROM_GROUP}>
                      {(removeUserFromGroup, { loading, called, error, data }) => {
                        if (error) {
                          return <div>{error.message}</div>;
                        }
                        if (data) {
                          onUserRemove();
                        }
                        return (
                          <RemoveUserConfirm
                            removeName={member.user.email}
                            onRemove={() => {
                              removeUserFromGroup({
                                variables: {
                                  groupName: groupName,
                                  email: member.user.email,
                                },
                              });
                            }}
                          />
                        );
                      }}
                    </Mutation>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledGroupMembers>
  );
};

export default GroupMembers;
