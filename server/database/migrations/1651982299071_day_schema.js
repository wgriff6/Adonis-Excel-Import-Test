'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')
class DaySchema extends Schema {
  up () {
    this.create('days', (table) => {
      table.string('Day', 16).notNullable().unsigned().primary()
      table.int('Value', 16).notNullable()
      table.timestamps()
    })
    this.schedule(async (trx) => {
      const days = ['F', 'R', 'W', 'T', 'M']
      await Promise.all(days.map((Day, i) => {
        return Database
          .table('days')
          .transacting(trx)
          .insert({ Day, Value: 2**i })
      }))
    })
  }

  down () {
    this.drop('days')
  }
}

module.exports = DaySchema
