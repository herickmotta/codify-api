const Course = require('../models/Course');
const User = require('../models/User');
const Session = require('../models/Session');
const CoursesUsers = require('../models/CoursesUsers');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const TheoryDone = require('../models/TheoryDone');
const ExerciseDone = require('../models/ExerciseDone');

Course.belongsToMany(User, { through: CoursesUsers });
User.belongsToMany(Course, { through: CoursesUsers });

User.hasMany(Session);

Course.hasMany(Chapter);
Chapter.hasMany(Topic);
Topic.hasMany(Theory);
Topic.hasMany(Exercise);
Theory.hasMany(TheoryDone);
Exercise.hasMany(ExerciseDone);
