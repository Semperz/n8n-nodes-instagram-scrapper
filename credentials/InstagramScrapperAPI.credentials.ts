import {
    IAuthenticateGeneric,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class InstagramScrapperAPI implements ICredentialType {
    name = 'InstagramScrapperAPI';
    displayName = 'Instagram Scrapper API';
    documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
			type: 'string',
            default: '',
        },
    ];
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'Authorization': 'Bearer {{$credentials.apiKey}}'
            }
        },
    } as IAuthenticateGeneric;
}