'use strict'

const ImportService = use('App/Services/ImportService')
const Helpers       = use('Helpers')
// do I even need this model?

class ImportController {

    async import({request, response})
    {
        let upload  = request.file('upload')
        let fname   = `${new Date().getTime()}.${upload.extname}`
        let dir     = 'upload/'

        //move uploaded file into custom folder
        await upload.move(Helpers.tmpPath(dir), {
            name: fname
        })

        if (!upload.moved()) {
            console.log('error')
            return (upload.error(), 'Error moving files', 500)
        }

        let send = await ImportService.ImportClassification('tmp/' + dir + fname)
        console.log(send)
    }
}

module.exports = ImportController
