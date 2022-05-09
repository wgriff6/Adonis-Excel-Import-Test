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
    let colComment2 = explanation2.getColumn('A') //column name
    let colComment3 = explanation3.getColumn('A') //column name
    let colComment4 = explanation4.getColumn('A') //column name

    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let disciplineName = explanation.getCell('A' + rowNumber).value //get cell and the row

        //custom field name in database to variable
        let inputDisciplineArea = {
          Discipline_Area: disciplineName.trim(),
        }

        let resDiscipline = await DisciplineArea.create(inputDisciplineArea)

        console.log('discipline', resDiscipline.toJSON())
      }
    })

    //checking cells for second sheet  
    colComment2.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
          let courseRefNum = explanation2.getCell('A' + rowNumber).value //get cell and the row
          let departCode = explanation2.getCell('B' + rowNumber).value //get cell and the row
          let courseNum = explanation2.getCell('C' + rowNumber).value //get cell and the row
          let title = explanation2.getCell('D' + rowNumber).value //get cell and the row

          //custom field name in database to variable
          let inputCourses = {
            Course_Reference_Number: courseRefNum,
            Department_Code: departCode,
            Course_Number: courseNum,
            Course_Title: title
          }
          
          let resCourses = await Course.create(inputCourses)
          console.log('courses', resCourses.toJSON())
        }
    })


    //Query days table to map Days to Values
    const Database = use('Database')
    const day = await Database
        .query()
        .from('days')
        .select('Day', 'Value')
    const dayMap = {}    
    for (let i=0; i < day.length; i++){
        dayMap[day[i].Day] = day[i].Value
    }

    //checking cells for second sheet  
    colComment3.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
          let courseRefNum = explanation3.getCell('A' + rowNumber).value //get cell and the row
          let sectionNum = explanation3.getCell('B' + rowNumber).value //get cell and the row
          let meetingPeriodDay1 = explanation3.getCell('C' + rowNumber).value //get cell and the row
          let meetingPeriodStart1 = explanation3.getCell('D' + rowNumber).value //get cell and the row
          let meetingPeriodEnd1 = explanation3.getCell('E' + rowNumber).value //get cell and the row

          let meetingPeriodDay2 = explanation3.getCell('F' + rowNumber).value //get cell and the row
          let meetingPeriodStart2 = explanation3.getCell('G' + rowNumber).value //get cell and the row
          let meetingPeriodEnd2 = explanation3.getCell('H' + rowNumber).value //get cell and the row

          let meetingPeriodDay3 = explanation3.getCell('I' + rowNumber).value //get cell and the row
          let meetingPeriodStart3 = explanation3.getCell('J' + rowNumber).value //get cell and the row
          let meetingPeriodEnd3 = explanation3.getCell('K' + rowNumber).value //get cell and the row
          
          //Loop to parse days column and add summation of values for later identification
          const dayArray = meetingPeriodDay1.split(',')
          // const dayArray2 = meetingPeriodDay2.split(',')
          // const dayArray3 = meetingPeriodDay3.split(',')
            let daySum = 0
            for (let i=0; i < dayArray.length; i++) {
              console.log("Entered the Loop")
              let parsedDays = dayArray[i].trim() //trim() trims excess whitespace
              console.log('This is parsedDays: ' + parsedDays)
              let dayValue = dayMap[parsedDays]
              console.log("The dayValue: " + dayValue)
              daySum += dayValue
              console.log("This is the daySum: " + daySum)
            
            }
            // let inputDayValues = {
            //   Meeting_Period_1_Days: daySum
            // }
            // let resDays = await Section.create(inputDayValues)
            // console.log('Sum of Day Values', resDays.toJSON()) 

          //custom field name in database to variable
          let inputSections = {
            Course_Reference_Number: courseRefNum,
            Section_Number: sectionNum,
            
            Meeting_Period_1_Days: daySum,
            Meeting_Period_1_Start: meetingPeriodStart1,
            Meeting_Period_1_End: meetingPeriodEnd1,

            Meeting_Period_2_Days: dayMap[meetingPeriodDay2],
            Meeting_Period_2_Start: meetingPeriodStart2,
            Meeting_Period_2_End: meetingPeriodEnd2,

            Meeting_Period_3_Days: dayMap[meetingPeriodDay3],
            Meeting_Period_3_Start: meetingPeriodStart3,
            Meeting_Period_3_End: meetingPeriodEnd3
          }

          let resSections = await Section.create(inputSections)
          console.log('sections', resSections.toJSON())
        }
    })

    //checking cells for second sheet  
    colComment4.eachCell(async (cell, rowNumber) => {
        if (rowNumber >= 2) {
          let name = explanation4.getCell('A' + rowNumber).value //get cell and the row
          let maxLoad = explanation4.getCell('B' + rowNumber).value //get cell and the row

          //custom field name in database to variable
          let inputInstructor = {
            Last_Name: name,
            Max_Course_Load: maxLoad
          }
  
          let resInstructor = await Instructor.create(inputInstructor)
  
          console.log('instructor', resInstructor.toJSON())
        }
    })
       
  }
}

module.exports = ImportService