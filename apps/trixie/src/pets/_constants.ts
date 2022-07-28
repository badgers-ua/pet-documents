export const PET_CRUD_ERROR =
  'Pet not found, or you have not the permissions to complete this action.';
export const PET_LAST_OWNER_ERROR =
  'You are the only pets owner, you cannot remove yourself as an owner, you can delete pets instead.';
export const USER_CRUD_ERROR =
  'User not found, or you have not the permissions to complete this action.';
export const AVATAR_ERROR = 'Wrong image format or image is too large.';
// TODO: [CLEANUP] Subscription feature
export const PET_LIMIT_REACHED = `You can't have more then 2 pets, we know it's not ideal.`;
export const PET_LIMIT_REACHED_BY = (userName: string) =>
  `${userName} already have 2 pets, can't assign more then 2 pets per user, we know it's not ideal.`;
