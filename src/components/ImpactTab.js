import React from 'react';
import PlanterList from './common/PlanterList';
import TokenGraph from './TokenGraph';

function ImpactTab(props) {
  const { organizationData, planterData } = props;

  return (
    <>
      <TokenGraph />
      <PlanterList {...organizationData} />
      <PlanterList {...planterData} />
    </>
  );
}

export default ImpactTab;
