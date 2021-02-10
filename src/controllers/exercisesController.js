/* eslint-disable no-param-reassign */
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

class ExercisesController {
  async findExerciseById(exerciseId) {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) throw new NotFoundError('Exercise not found');

    return exercise;
  }

  getAllExercises(limit = null, offset = null, topicId = null) {
    if (topicId) {
      return Exercise.findAll({ where: { topicId }, limit, offset });
    } return Exercise.findAll({ limit, offset });
  }

  async createExercise(exerciseParams) {
    const { name } = exerciseParams;
    const exercise = await Exercise.findOne({ where: { name } });
    if (exercise) throw new ConflictError('Exercise already exists');

    const createdExercise = await Exercise.create(exerciseParams);
    return createdExercise;
  }

  async editExercise(exerciseParams) {
    const {
      id, name,
    } = exerciseParams;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) throw new NotFoundError('Exercise not found');

    if (name) exercise.name = name;

    await exercise.save();
    return exercise;
  }

  async destroyExercise(exerciseId) {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) throw new NotFoundError('Exercise not found');

    await Exercise.destroy({ where: { id: exerciseId } });
  }
}

module.exports = new ExercisesController();
