<?php $view->script('uikit') ?>

<div class="uk-grid <?= $data['gridclass'] ?>" data-uk-margin
     data-uk-grid-match>
    <?php foreach ($images as $image) : ?>
		<div class="<?= $data['rowclass'] ?>">
			<a href="<?= $view->url()->getStatic($image['src']) ?>" class="<?= $data['hrefclass'] ?>"
			   title="<?= $image['alt'] ?>"
			   data-uk-lightbox="{group:'<?= $data['group'] ?>',
             allowfullscreen:<?= $data['allowfullscreen'] ?>,duration:<?= $data['duration'] ?>,keyboard:<?= $data['keyboard'] ?>}">
				<img class="<?= $data['imgclass'] ?>" src="<?= $view->url()->getStatic($image['src']) ?>"
				     alt="<?= $image['alt'] ?>">
			</a>
		</div>
    <?php endforeach; ?>
</div>