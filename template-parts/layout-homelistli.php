<?php global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $key, $storymode, $is_designer, $is_developer;
$permalink = $pods->display('permalink') . setStoryPerma(); ?>
<li class="flex p-3">
	<a href="<?= $permalink  ?>" class="shrink-0 hover:underline title flex gap-1">
		<div class="grow txt-layer"><?= $pods->display('title') ?></div>
		<div class="shrink txt-layer whitespace-nowrap">-></div>
	</a>
	<div class="mx-3 border-l-1 border-text divider"></div>
	<div class="shrink-0 timeframe"><?php formatTimeframe(true) ?></div>
	<div class="mx-3 border-l-1 border-text divider"></div>
	<div class="w-full shrink txt-layer"><?php outputTaxonomy() ?></div>
</li>