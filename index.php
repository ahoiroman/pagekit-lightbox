<?php

use Pagekit\Application;
use Spqr\Lightbox\Plugin\LightboxPlugin;

return [
    'name' => 'spqr/lightbox',
    'type' => 'extension',
    'main' => function (Application $app) {
    
    },
    
    'autoload' => [
        'Spqr\\Lightbox\\' => 'src',
    ],
    
    'routes' => [],
    
    'widgets' => [],
    
    'menu' => [],
    
    'permissions' => [],
    
    'settings' => '',
    
    'resources' => [
        'spqr/lightbox:' => '',
    ],
    
    'config' => [],
    
    'events' => [
        'boot'         => function ($event, $app) {
            $app->subscribe(new LightboxPlugin);
        },
        'site'         => function ($event, $app) {
        },
        'view.scripts' => function ($event, $scripts) use ($app) {
            $scripts->register('editor-lightbox',
                'spqr/lightbox:app/bundle/editor-lightbox.js', ['~editor']);
            
                    if ($app->module('tinymce')) {
                        $scripts->register('editor-lightbox-tinymce', 'spqr/lightbox:app/bundle/editor-lightbox-tinymce.js',
                            ['~editor-lightbox', '~tinymce-script']);
                    }
                    
        },
    ],
];