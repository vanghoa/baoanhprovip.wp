<?php global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $key, $storymode, $is_designer, $is_developer;
$permalink = $pods->display('permalink') . setStoryPerma(); ?>
<li class="flex p-3">
	<div class="shrink-0 title flex gap-1">
		<a href="<?= $permalink  ?>" class="grow txt-layer"><?= $pods->display('title') ?></a>
		<div class="shrink txt-layer whitespace-nowrap">-></div>
	</div>
	<div class="mx-3 divider">
		<div>||||||</div>
	</div>
	<div class="shrink-0 timeframe"><?php formatTimeframe(true) ?></div>
	<div class="mx-3 divider">
		<div>||||||</div>
	</div>
	<div class="w-full shrink txt-layer"><?php outputTaxonomy() ?></div>
</li>