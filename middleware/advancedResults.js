const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  //copy req.query
  const reqQuery = { ...req.query };

  //fields to remove
  const removeFields = ["select", "sort", "limit", "page"];

  //loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  //create query string
  let queryStr = JSON.stringify(reqQuery);

  //make string from req.query in order to change it
  //put $ in front of req.query if there is gt... put $ in front
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //create JSON object from query string and pass it to query
  query = model.find(JSON.parse(queryStr));

  //SELECT fields
  //https://mongoosejs.com/docs/queries.html
  // selecting the `name` and `occupation` fields
  // query.select('name occupation');
  if (req.query.select) {
    ///api/v1/bootcamps?select=name,description
    //need to transform name,description to name description
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //SORT
  //sort({ occupation: -1 }).
  //name sort  is ascending if desc pass in query -
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    //descended createdAt
    query = query.sort("-createdAt");
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  //executing query
  const results = await query;

  //Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = advancedResults;
