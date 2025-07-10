'use strict';
import 'dotenv/config'
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import { route, register, events, start, info as _info } from './config/server';
import baseRouter from './routes';
import { version as _version } from './package';


const init = async () => {

    const swaggerOptions = {
        info:{
            title:'Test API Documentation',
            version:_version,
        },
        schemes: ['http','https']
    }

    route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });


    // Adding plugins for swagger docs;
    await register([
        Inert,
        Vision,
        {
            plugin:HapiSwagger,
            options:swaggerOptions
        }
    ])

    await register(baseRouter,{
		routes:{
			prefix:'/api'
		}
	});

    events.on('response', function (request) {
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
    });
    await start();
    console.log('Server running on %s', _info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();