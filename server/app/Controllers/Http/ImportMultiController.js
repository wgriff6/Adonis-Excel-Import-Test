'use strict'

const ImportMultiService = use('App/Services/ImportMultiService')
const Helpers       = use('Helpers')

class ImportMultiController {
    async importMulti({request, response})
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

        let send = await ImportMultiService.ImportClassification('tmp/' + dir + fname)
        console.log(send)
    }
}


module.exports = ImportMultiController
