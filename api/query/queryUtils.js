// queryUtils.js

const generateQuery = (baseQuery, conditions = [], limit, page) => {
  let query = baseQuery;

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (limit) {
    query += ` LIMIT ${limit}`;
  }

  if (page && limit) {
    query += ` OFFSET ${(page - 1) * limit}`;
  }

  return query;
};

export default generateQuery;

//TODO Protection against SQL injection