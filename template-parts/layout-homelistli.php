<?php global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $key, $storymode, $is_designer, $is_developer;
?>
<li class="flex p-3">
	<div class="max-w-[30%] w-80 shrink-0 txt-layer"><?= $pods->display('title') ?></div>
	<div class="mx-3 border-l-1 border-text divider"></div>
	<div class="w-full shrink txt-layer"><?php outputTaxonomy() ?></div>
	<div class="mx-3 border-l-1 border-text divider"></div>
	<div class="max-w-[25%] shrink-0 timeframe"><?php formatTimeframe(true) ?></div>
</li>
