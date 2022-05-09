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

        //Parsing the Discipline Area column for each component
         const areaArray = areaString.split(',')

          for (let i=0; i < areaArray.length; i++) {
            let discipline = areaArray[i].trim() //trim() trims excess whitespace
            const discipline_id = mapping[discipline]
           console.log(discipline_id)
    
            let inputDisciplines = {
                Course_Reference_Number: courseRefNum,
                Discipline_ID: discipline_id
            }
            let resCourseDiscipline = await CourseDiscipline.create(inputDisciplines)

            console.log('course-discipline', resCourseDiscipline.toJSON())
          } 
        }
    })

    //Query instructors table to map Last_Names to id numbers
    const instructors = await Database
        .query()
        .from('instructors')
        .select('Last_Name', 'id')
    const mapInstruct = {}    
    for (let i=0; i < instructors.length; i++){
        mapInstruct[instructors[i].Last_Name] = instructors[i].id
    }

    colComment4.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
            let name = explanation4.getCell('A' + rowNumber).value //get cell and the row
            let areaInstruct = explanation4.getCell('C' + rowNumber).value //get cell and the row
  
          //Parsing the Discipline Area column for each component
           const areaArray = areaInstruct.split(',')

  
            for (let i=0; i < areaArray.length; i++) {
              let discipline = areaArray[i].trim() //trim() trims excess whitespace
              const discipline_id = mapping[discipline]
              console.log(discipline_id)
              const instructor_id = mapInstruct[name]
            console.log('Instructor ID: ' + instructor_id)

              let inputInstructorDisciplines = {
                  Instructor_ID: instructor_id,
                  Discipline_ID: discipline_id
              }
              let resInstructorDiscipline = await InstructorDiscipline.create(inputInstructorDisciplines)
  
              console.log('instructor-discipline', resInstructorDiscipline.toJSON())
            } 
          }
    }) 
  }
}

module.exports = ImportMultiService