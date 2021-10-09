import React from 'react';
import PlanterList from './common/PlanterList';
import TokenGraph from './TokenGraph';

function ImpactTab() {
  return (
    <>
      <TokenGraph />
      <PlanterList isSocial />
      <PlanterList />
    </>
  );
}

export default ImpactTab;
