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

    let explanation = workbook.getWorksheet('Sheet 1') // get sheet name
    let explanation2 = workbook.getWorksheet('Sheet 2') // get sheet name
    let explanation3 = workbook.getWorksheet('Sheet 3') // get sheet name
    let explanation4 = workbook.getWorksheet('Sheet 4') // get sheet name

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

        //Todo: Change these to appropraite variables and test 'Sheet 1' (rename that btw), then test multiple sheet import
        let resSekolah = await Sekolah.create(inputSekolah)

        inputNama.id_sekolah = resSekolah.id
        let resNama = await Kepsek.create(inputNama)
        console.log('sekolah', resSekolah.toJSON())
      }

    //checking cells for second sheet  
    colComment2.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {

        }
    })

    //checking cells for second sheet  
    colComment3.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {

        }
    })

    //checking cells for second sheet  
    colComment4.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {

        }
    })
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