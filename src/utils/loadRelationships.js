const Course = require('../models/Course');
const User = require('../models/User');
const Session = require('../models/Session');
const CourseUser = require('../models/CourseUser');

Course.belongsToMany(User, { through: CourseUser });
User.belongsToMany(Course, { through: CourseUser });

User.hasMany(Session);
