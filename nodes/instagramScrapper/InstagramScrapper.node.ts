import { INodeType, INodeTypeDescription, NodeConnectionType, IExecuteFunctions } from 'n8n-workflow';

export class InstagramScrapper implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Instagram Scrapper',
        name: 'InstagramScrapper',
        icon: 'file:instagramScrapper.svg',
        group: ['transform'],
        version: 1,
        subtitle: 'Scrape data from Instagram',
        description: 'A node to scrape data from Instagram profiles, posts, and stories',
        defaults: {
            name: 'Instagram Scrapper',
            color: '#E1306C',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'InstagramScrapperAPI',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: {
                addParentData: false,
                directsUrl: '', // Will be set dynamically
                enhanceUserSearchWithFacebookPage: false,
                isUserReelFeedURL: false,
                isUserTaggedFeedURL: false,
                resultsLimit: 10,
                resultsType: 'posts',
                searchLimit: 1,
                searchType: 'hashtag'
            }
        },
        properties: [
            {
                displayName: 'Instagram Account Name',
                name: 'accountName',
                type: 'string',
                required: true,
                default: '',
                placeholder: 'Username',
                description: 'The Instagram profile name to scrape. Only enter the username, e.g. "cristiano".',
            },
            {
                displayName: 'Number of Outputs',
                name: 'resultsLimit',
                type: 'number',
                required: true,
                default: 10,
                typeOptions: {
                    minValue: 5,
                    maxValue: 50,
                },
                description: 'Maximum number of results to return.',
            },
            {
                displayName: 'Operation',
                name: 'resultsType',
                type: 'options',
                required: true,
                options: [
                    { name: 'Posts', value: 'posts' },
                    { name: 'Details', value: 'details' },
                    { name: 'Comments', value: 'comments' },
                    { name: 'Mentions', value: 'mentions' },
                    { name: 'Stories', value: 'stories' },
                ],
                default: 'posts',
                description: 'Type of operation to perform.',
            },
            {
                displayName: 'Additional fields',
                name: 'additionalFields',
                type: 'collection',
                default: {},
                placeholder: 'Add Field',
                options: [
                    {
                        displayName: 'Only Posts Newer Than',
                        name: 'onlyPostsNewerThan',
                        type: 'string',
                        required: false,
                        default: '',
                        placeholder: 'YYYY-MM-DD or n (days|weeks|months|years)',
                        description: 'Filter to only include posts newer than this date (e.g., 2024-06-01 or 7 (days|weeks|months|years)).',
                    }
                ]
            }
        ]
    };

    // Add this method to transform accountName to directsUrl before making the request
    async execute(this: IExecuteFunctions) {
        const items = this.getInputData();
        const returnData = [];

        for (let i = 0; i < items.length; i++) {
            const accountName = this.getNodeParameter('accountName', i) as string;
            const directUrls = [`https://www.instagram.com/${accountName}/`];

            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as { onlyPostsNewerThan?: string };

            const body: Record<string, any> = {
                addParentData: false,
                directUrls,
                enhanceUserSearchWithFacebookPage: false,
                isUserReelFeedURL: false,
                isUserTaggedFeedURL: false,
                resultsLimit: this.getNodeParameter('resultsLimit', i),
                resultsType: this.getNodeParameter('resultsType', i),
                searchLimit: 1,
                searchType: 'hashtag',
            };

            if (additionalFields.onlyPostsNewerThan) {
                body.onlyPostsNewerThan = additionalFields.onlyPostsNewerThan;
            }

            const options = {
                method: 'POST' as const,
                url: 'https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items',
                body,
                json: true,
            };

            const responseData = await this.helpers.requestWithAuthentication.call(this, "InstagramScrapperAPI", options);
            returnData.push(responseData);
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}