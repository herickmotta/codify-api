const Course = require('../models/Course');
const User = require('../models/User');
const Session = require('../models/Session');
const CoursesUsers = require('../models/CoursesUsers');

Course.belongsToMany(User, { through: CoursesUsers });
User.belongsToMany(Course, { through: CoursesUsers });

User.hasMany(Session);
