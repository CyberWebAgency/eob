<?php
require_once 'config.php';

// API documentation
$api = [
    'endpoints' => [
        [
            'path' => '/api/team.php',
            'method' => 'GET',
            'description' => 'Get all team members',
            'parameters' => [
                'type' => 'Filter by member type (Leadership, Scientific Advisory Board, Team Members)'
            ]
        ],
        [
            'path' => '/api/news.php',
            'method' => 'GET',
            'description' => 'Get all news items',
            'parameters' => [
                'limit' => 'Number of items per page (default: 10)',
                'page' => 'Page number (default: 1)'
            ]
        ],
        [
            'path' => '/api/products.php',
            'method' => 'GET',
            'description' => 'Get all products'
        ],
        [
            'path' => '/api/technology.php',
            'method' => 'GET',
            'description' => 'Get all technology items'
        ],
        [
            'path' => '/api/collaborators.php',
            'method' => 'GET',
            'description' => 'Get all collaborators'
        ]
    ],
    'deprecated_endpoints' => [
        [
            'path' => '/api/investors.php',
            'method' => 'GET',
            'description' => 'Deprecated - use the collaborators endpoint instead'
        ]
    ]
];

sendResponse(200, "East Ocyon Bio API", $api);
?> 