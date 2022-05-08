'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionSchema extends Schema {
  up () {
    this.create('sections', (table) => {
      table.increments()
      table.int('Course Reference Number', 60)
      table.int('Secton Number', 60)

      table.int('Meeting Period 1 Days', 60)
      table.int('Meeting Period 1 Start', 60)
      table.int('Meeting Period 1 End', 60)

      table.int('Meeting Period 2 Days', 60)
      table.int('Meeting Period 2 Start', 60)
      table.int('Meeting Period 2 End', 60)

      table.int('Meeting Period 3 Days', 60)
      table.int('Meeting Period 3 Start', 60)
      table.int('Meeting Period 3 End', 60)

      table.timestamps()
    })
  }

  down () {
    this.drop('sections')
  }
}

module.exports = SectionSchema
