import {
    ServerConnection
  } from '@jupyterlab/services';

import {
	PageConfig
} from '@jupyterlab/coreutils'

export interface Greetings {
	greetings: string;
}

function getAbsoluteURL(url:string):string {
    // baseURL always comes with a trailing slash
    let baseURL = PageConfig.getBaseUrl()
    if (url.indexOf('/') == 0) {
        return baseURL + url.substring(1);
    } else {
        return baseURL + url;
    }
}
 
function request(url: string, method: string, data: any): Promise<any>{
    let init = {
        method: method, 
        data: JSON.stringify(data)     
    }
    return ServerConnection.makeRequest(getAbsoluteURL(url), init, ServerConnection.makeSettings());
}


export class HelloWorld {
    constructor(){}

    async get(): Promise<void> {
        try{
            var val = await request("/hello?name=Tom", "GET", "");
            if (val.xhr.status !== 200) {
                console.error(val.xhr.status);
                console.error('Error', val)
                // throw ServerConnection.makeError(val);
                throw new Error(val)
            }
            console.log(val.data);
            return null;
        } catch (err) {
            console.error('Error', err)
            // throw ServerConnection.makeError(err);
            throw new Error(err)
        }
    }
    
    async post(): Promise<void> {
        try{
            var val = await request("/hello", "POST", "");
            if (val.xhr.status !== 200) {
                console.error(val.xhr.status);
                // throw ServerConnection.makeError(val);
                throw new Error(val)
            }
            console.log(val.data);
            return null;
        } catch (err) {
            console.error('Error', err)
            // throw ServerConnection.makeError(err);
            throw new Error(err)
        }
    }
    
    async postReply(name: string): Promise<Greetings> {
        try{
            console.log('Name', name)
            var val = await request("/hello/personal", "POST", {"name": name});
            if (val.xhr.status !== 200) {
                console.error(val.xhr.status);
                // throw ServerConnection.makeError(val);
                throw new Error(val)
            }
            return val.data;
        } catch (err) {
            console.error('Error', err)
            // throw ServerConnection.makeError(err);
            throw new Error(err)
        }
    }
}