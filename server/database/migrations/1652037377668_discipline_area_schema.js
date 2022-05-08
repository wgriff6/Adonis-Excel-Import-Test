'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisciplineAreaSchema extends Schema {
  up () {
    this.create('discipline_areas', (table) => {
      table.increments()
      table.string('Discipline_Area', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('discipline_areas')
  }
}

module.exports = DisciplineAreaSchema
