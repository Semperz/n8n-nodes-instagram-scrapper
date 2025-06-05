import { INodeType, INodeTypeDescription } from 'n8n-workflow';

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
        inputs: ['main'],
        outputs: ['main'],
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

            body{
                addParentData: false,
                directsUrl: '',
                enhanceUserSearchWithFacebookPage:false,
                isUserReelFeedURL: false,
                isUserTaggedFeedURL: false,
                onlyPostsNewerThan: '',
                resultsLimit: 10,
                resultsType: 'posts',
                searchLimit: 1,
                searchType: 'hashtag'
            }
        },
		properties: [
            // Aditional properties for the node
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
            displayName: 'Only Posts Newer Than',
            name: 'onlyPostsNewerThan',
            type: 'dateTime',
            required: false,
            default: '',
            palceholder: 'YYYY-MM-DD',
            description: 'Filter to only include posts newer than this date.',
            },
            
		]
	};
}