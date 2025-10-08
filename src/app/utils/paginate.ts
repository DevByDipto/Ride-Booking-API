interface PaginateOptions {
  page?: number;
  limit?: number;
  sort?: object;
}

export const paginate = async(
  model: any,
  filter: object = {},
  options: PaginateOptions = {}
) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const data = await model.find(filter).skip(skip).limit(limit).sort(options.sort || {});
  const total : number = await model.countDocuments(filter);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
