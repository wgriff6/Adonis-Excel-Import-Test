'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')
//lol I done fucked up somewhere in here >_>
class DaySchema extends Schema {
  up () {
    this.create('days', (table) => {
      //table.increments()
      // table.string('Day', 60)
      // table.int('Value', 32)
      table.string('Day', 16).notNullable().unsigned().primary()
      table.int('Value', 16).notNullable()
      table.timestamps()
    })
    this.schedule(async (trx) => {
      const days = ['M', 'T', 'W', 'R', 'F']
      await Promise.all(days.map((Day, i) => {
        return Database
          .table('days')
          .transacting(trx)
          .insert({ Day, Value: (2^i) })
      }))
    })
  }

  down () {
    this.drop('days')
  }
}

module.exports = DaySchema
