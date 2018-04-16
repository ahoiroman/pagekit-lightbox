<?php

namespace Spqr\Lightbox\Plugin;

use Pagekit\Application as App;
use Pagekit\Content\Event\ContentEvent;
use Pagekit\Event\EventSubscriberInterface;

class LightboxPlugin implements EventSubscriberInterface
{
    
    /**
     * @param \Pagekit\Content\Event\ContentEvent $event
     */
    public function onApplyPlugins(ContentEvent $event)
    {
        
        $event->addPlugin('lightbox', [
            $this,
            'applyPlugin',
        ]);
        
    }
    
    /**
     * @param array $options
     *
     * @return string
     */
    public function applyPlugin(array $options)
    {
        $data = [];
        
        $data['allowfullscreen'] = $options['data']['allowfullscreen'] ? 'true'
            : 'false';
        $data['duration']        = $options['data']['duration']
            ? $options['data']['duration'] : 0;
        $data['keyboard']        = $options['data']['keyboard'] ? 'true'
            : 'false';
        $data['hrefclass']       = $options['data']['hrefclass']
            ? $options['data']['hrefclass'] : null;
        $data['imgclass']        = $options['data']['imgclass']
            ? $options['data']['imgclass'] : null;
        $data['gridclass']       = $options['data']['gridclass']
            ? $options['data']['gridclass'] : null;
        $data['rowclass']        = $options['data']['rowclass']
            ? $options['data']['rowclass'] : null;
        $data['group']           = $options['data']['group']
            ? $options['data']['group'] : null;
        $images                  = isset($options['images'])
            ? $options['images'] : false;
        
        if (!empty($images)) {
            $lightbox = App::view('spqr/lightbox:/views/lightbox.php', [
                'data'   => $data,
                'images' => $images,
            ]);
            
            return $lightbox;
            
        } else {
            return '';
        }
    }
    
    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'content.plugins' => [
                ['onApplyPlugins', 15],
            ],
        ];
    }
}