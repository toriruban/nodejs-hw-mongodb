import createHttpError from 'http-errors';
const CONTACT_TYPES = ['work', 'home', 'personal'];

export const parseFilterParams = (query = {}) => {
  const { isFavourite, type } = query;
  const filter = {};

  let parsedIsFavourite;
  if (typeof isFavourite === 'boolean') {
    parsedIsFavourite = isFavourite;
  } else if (isFavourite === 'true') {
    parsedIsFavourite = true;
  } else if (isFavourite === 'false') {
    parsedIsFavourite = false;
  } else if (isFavourite !== undefined) {

    throw createHttpError(400, `Invalid value for isFavourite: ${isFavourite}`);
  }

  const parsedType = CONTACT_TYPES.includes(type) ? type : undefined;
  if (type && !parsedType) {
    throw createHttpError(400, `Invalid value for type: ${type}`);
  }
  if (parsedIsFavourite !== undefined) filter.isFavourite = parsedIsFavourite;
  if (parsedType) filter.contactType = parsedType;

  return { filter };
};
