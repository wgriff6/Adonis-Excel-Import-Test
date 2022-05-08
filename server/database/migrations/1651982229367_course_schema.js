'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.int('Course_Reference_Number', 60)
      table.string('Department_Code', 60)
      table.int('Course_Number', 60)
      table.string('Course_Title', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
