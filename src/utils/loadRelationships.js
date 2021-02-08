const Course = require('../models/Course');
const User = require('../models/User');
const Session = require('../models/Session');
const CoursesUser = require('../models/CoursesUser');

Course.belongsToMany(User, { through: CoursesUser });
User.belongsToMany(Course, { through: CoursesUser });

User.hasMany(Session);
