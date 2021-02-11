const cleanCourses = (dirtyCourses) => {
  const cleanedCourses = dirtyCourses.map(({ dataValues }) => {
    const data = dataValues;
    delete data.courseUser;
    delete data.createdAt;
    delete data.updatedAt;
    return data;
  });

  return cleanedCourses;
};

module.exports = cleanCourses;
