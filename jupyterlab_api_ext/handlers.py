"""
This is a Handler Module with all the individual handlers for HelloWorld-Plugin.
"""
import json
import os
import logging

from notebook.utils import url_path_join
from notebook.base.handlers import APIHandler

def setup_handlers(web_app):
    """Setup all handlers for the "Hello World" plugin.

    Args:
        webapp:
    """
    host_pattern = '.*$'
    web_app.add_handlers(host_pattern, 
                         [(url_path_join(web_app.settings['base_url'], '/hello'), HelloWorldHandler),
                          (url_path_join(web_app.settings['base_url'], '/hello/personal'), PersonalHelloHandler)])


class HelloWorldHandler(APIHandler):
    def get(self):
        """Function handling GET method.
        
        Here sends simple greeting back.
        """
        
        files = os.listdir()
        logging.info(f'>>>> jupyterlab_api_ext: Files: {files}')
        logging.info(f'>>>> jupyterlab_api_ext: Args: {self.request.arguments}') 
        
        arg_name = self.request.arguments.get('name')
        if arg_name and arg_name[0]:
            name = arg_name[0].decode("utf-8")
            logging.info(f'>>>> jupyterlab_api_ext: Name: {name}') 
        
        self.finish(f'Hello, world 3. Files {str(self.request.arguments)}')
    
    def post(self):
        """Function handling POST method.
        
        Here sends simple greeting back.
        """
        self.finish('Hello, world!')


class PersonalHelloHandler(APIHandler):
    def post(self):
        """Function handling POST method.

        Get the name from the request body and returns a customized greeting.
        """
        # input_data is a dictionnary with a key 'name'
        input_data = json.loads(self.request.body.decode('utf-8'))
        data = {
            'greetings': 'Hello {}, enjoy JupyterLab!'.format(input_data['name'])
        }
        self.finish(json.dumps(data))
