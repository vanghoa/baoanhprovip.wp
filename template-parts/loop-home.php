<?php

global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $flowtype, $storymode, $is_tax, $flows;

// Set up query parameters
$params = array(
	'limit' => -1, // Retrieve all matching items
	'orderby' => 'timeframe DESC', // Replace 'first_timeframe' with your field name
	'groupby' => 'post_id',
	'expires' => null,
	'cache_mode' => null,
);

if ($is_tax) {
	// For taxonomy pages
	$params['where'] = "{$taxonomy}.term_id = {$term_id}";
}

$settings = pods('settings');
$hometext = $settings->field('hometext');

$storymode = $is_story && ($taxonomy == 'developertag' || $taxonomy == 'designertag');
if ($storymode) {
	$flowtype = substr($taxonomy, 0, -3);
	$flows = $settings->field($flowtype . '_flow');
}
$pods = pods('work', $params);
?>

<div class="max-w-md mx-auto text-center mb-8 mt-4">
	<p class="txt-layer mb-4"><?= $is_tax ? 'these are my works in' : $hometext ?></p>
	<?php
	get_template_part('template-parts/layout', 'homefilter');
	?>
</div>

<?php function mapLi($part = 'homegridli')
{
	global $storymode, $pods, $flows, $flowtype, $is_story;
	if ($storymode) {
		$podsdata = $pods->data();
		$checkarr = [];
		foreach ($podsdata as $obj) {
			$checkarr[$obj->ID] = true;
		}
		foreach ($flows as $k => $flow) {
			$is_story = $flowtype . '-' . $k;
			$id = $flow['ID'];
			if ($checkarr[$id] ?? false) {
				$pods->fetch($id);
				pods_view('template-parts/layout-' . $part . '.php', ['liIndex' => $k]);
			}
		}
	} else {
		$liIndex = 0;
		while ($pods->fetch()) :
			pods_view('template-parts/layout-' . $part . '.php', ['liIndex' => $liIndex]);
			$liIndex++;
		endwhile;
		$pods->reset();
	}
}
get_template_part('template-parts/layout', 'homegrid'); ?>