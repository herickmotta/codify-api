/* eslint-disable no-param-reassign */
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');
const ExerciseDone = require('../models/ExerciseDone');

class ExercisesController {
  async findExerciseById(exerciseId) {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) throw new NotFoundError('Exercise not found');

    return exercise;
  }

  getAllExercises(queryConfig, topicId = null) {
    if (topicId) {
      return Exercise.findAll({ where: { topicId }, ...queryConfig });
    }
    return Exercise.findAll(queryConfig);
  }

  async createExercise(exerciseParams) {
    const createdExercise = await Exercise.create(exerciseParams);
    return createdExercise;
  }

  async editExercise(exerciseParams) {
    const {
      id, name, wording,
    } = exerciseParams;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) throw new NotFoundError('Exercise not found');

    if (name) exercise.name = name;
    if (wording) exercise.wording = wording;

    await exercise.save();
    return exercise;
  }

  async destroyExercise(exerciseId) {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) throw new NotFoundError('Exercise not found');

    await Exercise.destroy({ where: { id: exerciseId } });
  }

  async getExercisesDone(userId, exerciseIdList) {
    const allExercisesDone = await ExerciseDone.findAll({ where: { userId, exerciseId: exerciseIdList }, order: [['"updatedAt"', 'DESC']] });

    return allExercisesDone;
  }
}

module.exports = new ExercisesController();
