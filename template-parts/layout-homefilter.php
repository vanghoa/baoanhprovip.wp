<?php global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $flowtype, $storymode, $is_designer, $is_developer, $is_storyq;

$storymode2 = ($is_storyq && ($is_designer || $is_developer));

?>
<p class="txt-layer mb-1"><a href="<?= $storymode || $storymode2 ? home_url('/' . $flowtype . setStoryPerma()) . '#everything' : get_home_url() ?>" class="<?= is_home() || ($is_designer || $is_developer) ? 'text-hilight' : '' ?>">all</a>
	<?php $tags = pods($taxonomy_name)->find();
	$length = $tags->total_found();
	$cur = 0;
	while ($tags->fetch()) : $cur++;
		global $term_id, $taxonomy;
		$bt_term_id = $tags->display('term_id') ?>
		<?php if ($cur <= $length) {
			echo ' | ';
		} ?>
		<a href="<?= get_term_link($bt_term_id, $taxonomy_name) . setStoryPerma() ?>"
			class="<?php if ($bt_term_id == $term_id && $taxonomy == $taxonomy_name) {
						echo 'text-hilight';
					} ?>">
			<?= $tags->display('name') ?></a>
	<?php endwhile; ?>
</p>

<p class="txt-layer mb-4 viewmode">view mode: <button onclick="toggleViewmode(false)" class="galleryview">gallery</button> | <button onclick="toggleViewmode(true)" class="listview">list</button></p>