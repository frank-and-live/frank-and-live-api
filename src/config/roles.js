const allRoles = {
  user: ['manageEvents'],
  admin: ['getUsers', 'manageUsers', 'manageEvents'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
