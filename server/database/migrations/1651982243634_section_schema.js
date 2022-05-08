'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionSchema extends Schema {
  up () {
    this.create('sections', (table) => {
      table.increments()
      table.int('Course_Reference_Number', 60)
      table.int('Section_Number', 60)

      table.int('Meeting_Period_1_Days', 60)
      table.int('Meeting_Period_1_Start', 60)
      table.int('Meeting_Period_1_End', 60)

      table.int('Meeting_Period_2_Days', 60)
      table.int('Meeting_Period_2_Start', 60)
      table.int('Meeting_Period_2_End', 60)

      table.int('Meeting_Period_3_Days', 60)
      table.int('Meeting_Period_3_Start', 60)
      table.int('Meeting_Period_3_End', 60)

      table.timestamps()
    })
  }

  down () {
    this.drop('sections')
  }
}

module.exports = SectionSchema
