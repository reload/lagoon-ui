import React from "react";
import { StyledEnvironmentDetails } from "./StyledEnvironment";
import Skeleton from "react-loading-skeleton";

const EnvironmentSkeleton = () => {
  return (
    <StyledEnvironmentDetails className="details">
      <div className="field-wrapper environmentType">
        <div>
          <label>Environment Type</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="field-wrapper deployType">
        <div>
          <label>Deployment Type</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="field-wrapper created">
        <div>
          <label>Created</label>
          <div className="field">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
      <div className="field-wrapper updated">
        <div>
          <label>Last Deploy</label>
          <div className="field">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
      <div className="field-wrapper source">
        <div>
          <label>Source</label>
          <div className="field">
            <Skeleton width={"50%"} />
          </div>
        </div>
      </div>
      <div className="field-wrapper routes">
        <div>
          <label>Routes</label>
          <div className="field">
            <Skeleton width={"50%"} />
          </div>
        </div>
      </div>
    </StyledEnvironmentDetails>
  );
};

export default EnvironmentSkeleton;
