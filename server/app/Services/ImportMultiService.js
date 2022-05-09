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

    //Query discipline_areas table to map disciplines
    const Database = use('Database')
    const disciplines = await Database
        .query()
        .from('discipline_areas')
        .select('Discipline_Area', 'id')
    const mapping = {}    
    for (let i=0; i < disciplines.length; i++){
        mapping[disciplines[i].Discipline_Area] = disciplines[i].id
    }

    //checking cells for second sheet  
    colComment2.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
          let courseRefNum = explanation2.getCell('A' + rowNumber).value //get cell and the row
          let areaString = explanation2.getCell('E' + rowNumber).value //get cell and the row

        //    let inputCourseRefNum = {
        //      Course_Reference_Number: courseRefNum,
        //    }

        //    let resRefNum = await CourseDiscipline.create(inputCourseRefNum)
        //    console.log('course-ref-num', resRefNum.toJSON())

        //Parsing the Discipline Area column for each component
         const areaArray = areaString.split(',')
        //console.log(mapping)
          for (let i=0; i < areaArray.length; i++) {
            console.log('in for loop')
            let discipline = areaArray[i].trim() //trim() trims excess whitespace
            console.log('"' + discipline + '"')
            const discipline_id = mapping[discipline]
           console.log(discipline_id)
    
            let inputDisciplines = {
                Course_Reference_Number: courseRefNum,
                Discipline_ID: discipline_id
            }
            console.log('creating')
            let resCourseDiscipline = await CourseDiscipline.create(inputDisciplines)
            console.log('created')

            console.log('course-discipline', resCourseDiscipline.toJSON())
          } 
          
          
        }
    })       
  }
}

module.exports = ImportMultiService