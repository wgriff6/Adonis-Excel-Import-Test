'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorDisciplineSchema extends Schema {
  up () {
    this.create('instructor_disciplines', (table) => {
      table.increments()
      table.int('Instructor ID', 60)
      table.int('Discipline ID', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('instructor_disciplines')
  }
}

module.exports = InstructorDisciplineSchema
