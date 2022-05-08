'use strict'
const Excel   = require('exceljs')

//declare models
const DisciplineArea = use('App/Models/DisciplineArea')
const Course = use('App/Models/Course')
const CourseDiscipline = use('App/Models/CourseDiscipline')
const Section = use('App/Models/Section')
const Instructor = use('App/Models/Instructor')
const InstructorDiscipline = use('App/Models/InstructorDiscipline')


class ImportMultiService {
  static async ImportClassification(filelocation) {
    var workbook = new Excel.Workbook()

    workbook = await workbook.xlsx.readFile(filelocation)

    let explanation = workbook.getWorksheet('Discipline Areas') // get sheet name
    let explanation2 = workbook.getWorksheet('Courses') // get sheet name
    let explanation3 = workbook.getWorksheet('Sections') // get sheet name
    let explanation4 = workbook.getWorksheet('Instructors') // get sheet name

    let colComment = explanation.getColumn('A') //column name
    let colComment2 = explanation2.getColumn('A') //column name
    let colComment3 = explanation3.getColumn('A') //column name
    let colComment4 = explanation4.getColumn('A') //column name


    //checking cells for second sheet  
    colComment2.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
          let courseRefNum = explanation2.getCell('A' + rowNumber).value //get cell and the row
          let areaString = explanation2.getCell('E' + rowNumber).value //get cell and the row

          let inputCourseRefNum = {
            Course_Reference_Number: courseRefNum,
          }

          areaString.split(',')
          let inputDisciplines = {
            Table_Tile: areaString,
          }
          
          let resCourseDiscipline = await CourseDiscipline.create(inputCourseRefNum)
          console.log('course-ref-num', resCourseRefNum.toJSON())
        }
    })       
  }
}

module.exports = ImportMultiService