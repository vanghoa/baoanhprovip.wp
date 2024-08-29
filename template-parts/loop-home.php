<?php
get_template_part('template-parts/layout', 'style');

// Check if we're on a taxonomy page
$is_tax = is_tax();

// Set up query parameters
$params = array(
	'limit' => -1, // Retrieve all matching items
	'orderby' => 'timeframe DESC', // Replace 'first_timeframe' with your field name
	'groupby' => 'post_id',
	'expires' => null,
	'cache_mode' => null,
);

global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $flowtype, $storymode;

if ($is_tax) {
	// For taxonomy pages
	global $term_id, $taxonomy, $taxonomy_name;
	$queried_object = get_queried_object();
	$term_id = esc_sql($queried_object->term_id);
	$taxonomy = esc_sql($queried_object->taxonomy);
	$taxonomy_name = $taxonomy;
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
	<p class="txt-layer mb-4"><?= is_tax() ? 'these are my works in' : $hometext ?></p>
	<?php
	get_template_part('template-parts/layout', 'homefilter'); ?>
</div>

<ul class="homegrid grid grid-cols-1 gap-8 w-fit mx-auto">
	<?php

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
				get_template_part('template-parts/layout', 'homegridli');
			}
		}
	} else {
		while ($pods->fetch()) :
			get_template_part('template-parts/layout', 'homegridli');
		endwhile;
	} ?>
</ul>