import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as utils from './utils';

function PlanterPage() {
  const history = useHistory();
  const [planter, setPlanter] = React.useState(null);
  const [featuredTrees, setFeaturedTrees] = React.useState(undefined);
  const [associatedOrganizations, setAssociatedOrganizations] =
    React.useState(undefined);

  const params = useParams();

  function handleBackClick() {
    history.push('/wallets/stephanie');
  }

  async function load() {
    const planter = await utils.request(`/planters/${params.planterId}`);
    setPlanter(planter);
    const featuredTrees = await utils.request(planter.links.featured_trees);
    setFeaturedTrees(featuredTrees);
    const associatedOrganizations = await utils.request(
      planter.links.associated_organizations,
    );
    setAssociatedOrganizations(associatedOrganizations);
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 9999,
        background: 'white',
        opacity: 0.8,
        width: '100vw',
        height: '100vh',
      }}
    >
      <button onClick={handleBackClick}>back</button>
      <div
        style={{
          background: 'yellow',
          width: '100vw',
          height: '100%',
        }}
      >
        <h2>planter.page</h2>
        {planter && (
          <>
            <img src={planter.photo_url} with="100" height="100" />
            <h3>
              full name: {planter.first_name} {planter.last_name}
            </h3>
            <h3>joined: {planter.created_time}</h3>
            <h3>country: {planter.country}</h3>
            {featuredTrees && (
              <>
                <h3>tree planted: {featuredTrees.total}</h3>
                <ul>
                  {featuredTrees.trees.map((tree) => (
                    <li key={tree.id}>
                      <img src={tree.photo_url} height="100" width="100" />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {associatedOrganizations && (
              <>
                <h3>organizations: {associatedOrganizations.total}</h3>
                <ul>
                  {associatedOrganizations.organizations.map((org) => (
                    <div key={org.id}>
                      <h6>{org.name}</h6>
                      <li key={org.id}>
                        <img src={org.photo_url} height="100" width="100" />
                      </li>
                    </div>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PlanterPage;
