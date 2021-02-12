const Course = require('../models/Course');
const User = require('../models/User');
const Session = require('../models/Session');
const CourseUser = require('../models/CourseUser');
const Chapter = require('../models/Chapter');
const Exercise = require('../models/Exercise');
const ExerciseDone = require('../models/ExerciseDone');
const Theory = require('../models/Theory');
const TheoryDone = require('../models/TheoryDone');
const Topic = require('../models/Topic');

Course.belongsToMany(User, { through: CourseUser });
User.belongsToMany(Course, { through: CourseUser });

User.hasMany(Session);

Course.hasMany(Chapter);

Chapter.hasMany(Topic);

Topic.hasOne(Theory);

Topic.hasMany(Exercise);

Exercise.belongsToMany(User, { through: ExerciseDone });
User.belongsToMany(Exercise, { through: ExerciseDone });

Theory.belongsToMany(User, { through: TheoryDone });
User.belongsToMany(Theory, { through: TheoryDone });
