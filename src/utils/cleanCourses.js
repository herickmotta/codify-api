/* eslint-disable prefer-destructuring */
const cleanCourses = (dirtyCourses) => {
  const cleanedCourses = dirtyCourses.map(({ dataValues }) => {
    const data = dataValues;
    delete data.users;
    delete data.createdAt;
    delete data.updatedAt;
    data.LastTaskSeensData = data.LastTaskSeens[0];
    delete data.LastTaskSeens;
    return data;
  });

  return cleanedCourses;
};

module.exports = cleanCourses;
