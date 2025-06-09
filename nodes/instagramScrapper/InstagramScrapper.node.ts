import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

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

            body:{
                addParentData: false,
                directsUrl: '',
                enhanceUserSearchWithFacebookPage:false,
                isUserReelFeedURL: false,
                isUserTaggedFeedURL: false,
                resultsLimit: 10,
                resultsType: 'posts',
                searchLimit: 1,
                searchType: 'hashtag'
            }
        },
		properties: [
            // Required properties for the Instagram Scrapper node
            {
                displayName: 'Instagram Account Name',
                name: 'directsUrl',
                type: 'string',
                required: true,
                default: '',
                placeholder: 'Username',
                description: 'The Instagram profile name to scrape.',
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
}