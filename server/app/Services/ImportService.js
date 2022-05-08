'use strict'
const Excel   = require('exceljs')

//declare models
const DisciplineArea = use('App/Models/DisciplineArea')
const Course = use('App/Models/Course')
const CourseDiscipline = use('App/Models/CourseDiscipline')
const Section = use('App/Models/Section')
const Instructor = use('App/Models/Instructor')
const InstructorDiscipline = use('App/Models/InstructorDiscipline')


class ImportService {
  static async ImportClassification(filelocation) {
    var workbook = new Excel.Workbook()

    workbook = await workbook.xlsx.readFile(filelocation)

    let explanation = workbook.getWorksheet('Discipline Areas') // get sheet name
    let explanation2 = workbook.getWorksheet('Courses') // get sheet name
    let explanation3 = workbook.getWorksheet('Sections') // get sheet name
    let explanation4 = workbook.getWorksheet('Instructors') // get sheet name

    let colComment = explanation.getColumn('A') //column name
    let colComment2 = explanation.getColumn('A') //column name
    let colComment3 = explanation.getColumn('A') //column name
    let colComment4 = explanation.getColumn('A') //column name

    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let disciplineName = explanation.getCell('A' + rowNumber).value //get cell and the row

        //custom field name in database to variable
        let inputDisciplineArea = {
          Discipline_Area: disciplineName,
        }

        let resDiscipline = await DisciplineArea.create(inputDisciplineArea)

        //inputNama.id_sekolah = resSekolah.id
        //let resNama = await Kepsek.create(inputNama)
        console.log('discipline', resDiscipline.toJSON())
      }

    //checking cells for second sheet  
    colComment2.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
          let courseRefNum = explanation2.getCell('A' + rowNumber).value //get cell and the row
          let departNum = explanation2.getCell('B' + rowNumber).value //get cell and the row
          let courseNum = explanation2.getCell('C' + rowNumber).value //get cell and the row
          let title = explanation2.getCell('D' + rowNumber).value //get cell and the row

          //custom field name in database to variable
          let inputCourses = {
            Course_Reference_Number: courseRefNum,
            Department_Number: departNum,
            Course_Number: courseNum,
            Course_Title: title
          }
          
          let resCourses = await Course.create(inputCourses)
          console.log('courses', resCourses.toJSON())
        }
    })

    //checking cells for second sheet  
    // colComment3.eachCell(async (cell, rowNumber) => {
    //     if (rowNumber >= 2) {

    //     }
    // })

    // //checking cells for second sheet  
    // colComment4.eachCell(async (cell, rowNumber) => {
    //     if (rowNumber >= 2) {

    //     }
    // })
           // let inputCourse = {
        //   nama_kepsek: nama,
        //   nip: nip,
        //   id_sekolah: kode
        // }

        // let inputCourseDiscipline = {

        // }

        // let inputInstructor = {
            
        // }

        // let inputInstructorDiscipline = {
            
        // }

        // let inputSection = {
            
        // }
    })
  }
}

module.exports = ImportService