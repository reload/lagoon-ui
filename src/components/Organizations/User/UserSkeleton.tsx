import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledUser } from './Styles';

const UserSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupSkeleton = (index: number) => (
    <div key={`groupSkeleton-${index}`} className="data-row">
      <div className="user">
        <Skeleton />
      </div>
    </div>
  );
  
  return (
    <StyledUser>
      <div className="header">
        <label>User</label>
      </div>
      <div className="data-table">
        {[...Array<undefined>(numberOfFields)].map((_, index) => groupSkeleton(index))}
      </div>
    </StyledUser>
  );
};

export default UserSkeleton;
