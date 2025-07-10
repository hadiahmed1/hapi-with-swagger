import { object, string, number, any } from 'joi';
import { addDetails, showDetails, viewDetails, update, fileUpload } from '../../controllers/Test';

const router = [
    {
        path:'/add',
		method:'POST',
		options:{
			handler: addDetails,
            description:"Add some details",
        	notes:'Add and see the result',
            tags:['api'],
            validate: {
                payload: object({
                    name:  string().required(),
                    email:  string().email().required(),
                    password: string().required()
                })
            },
		}
    },{
        path: '/show-all-details',
        method: 'GET',
        options: {
            handler: showDetails,
            description:"Show all details",
        	notes:'Show details',
            tags:['api'],
        }
    },{
        path: '/view/{id}',
        method: 'GET',
        options: {
            handler: viewDetails,
            description:"View all details",
        	notes:'View',
            tags:['api'],
            validate: {
                params: object({
                    id: number().required()
                })
            }
        }
    },{
        path:'/update',
		method:'POST',
		options:{
			handler: update,
            description:"Add some details",
        	notes:'Add and see the result',
            tags:['api'],
            validate: {
                payload: object({
                    id: number().required(),
                    name:  string().required(),
                    email:  string().email().required()
                })
            },
		}
    },{
        path:'/file-upload',
		method:'post',
		options:{
			payload: {
                output: 'file',
                multipart: true
            },
			handler: fileUpload,
            description:"File upload",
        	notes:'file-upload',
        	tags:['api'],
			plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: object({
                    file: any()
                        .meta({ swaggerType: 'file' })
                        .description('file')
                })
            },
		}
    }
]

export default router;