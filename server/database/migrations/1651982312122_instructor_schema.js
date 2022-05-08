'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorSchema extends Schema {
  up () {
    this.create('instructors', (table) => {
      table.increments()
      table.string('Last Name', 80)
      table.int('Max Course Load', 40)
      table.timestamps()
    })
  }

  down () {
    this.drop('instructors')
  }
}

module.exports = InstructorSchema
