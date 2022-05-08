'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorSchema extends Schema {
  up () {
    this.create('instructors', (table) => {
      table.increments()
      table.string('Last_Name', 80)
      table.int('Max_Course_Load', 40)
      table.timestamps()
    })
  }

  down () {
    this.drop('instructors')
  }
}

module.exports = InstructorSchema
