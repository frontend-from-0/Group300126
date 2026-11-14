// Add this code to auth0 as a new action (Actions > Library), then set up post-login trigger and add the action to it.
// Make sure ROLES_CLAIM in src/lib/auth0.ts is exactly `${namespace}/roles`, i.e. 'https://ecom-300126/roles'.

exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://ecom-300126';
  const roles = event.authorization?.roles || [];

  api.idToken.setCustomClaim(`${namespace}/roles`, roles);
  api.idToken.setCustomClaim(`${namespace}/is_admin`, roles.includes('admin'));
  
  api.accessToken.setCustomClaim(`${namespace}/roles`, roles);
  api.accessToken.setCustomClaim(`${namespace}/is_admin`, roles.includes('admin'));
};
