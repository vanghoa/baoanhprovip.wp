<?php global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $flowtype, $storymode, $is_designer, $is_developer, $is_storyq;

$storymode2 = ($is_storyq && ($is_designer || $is_developer));

?>
<p class="txt-layer mb-4"> ` <a href="<?= $storymode || $storymode2 ? home_url('/' . $flowtype . setStoryPerma()) . '#everything' : get_home_url() ?>" class="hover:underline <?= is_home() || ($is_designer || $is_developer) ? 'underline' : '' ?>">everything</a> `
	<?php $tags = pods($taxonomy_name)->find();
	$length = $tags->total_found();
	$cur = 0;
	while ($tags->fetch()) : $cur++;
		global $term_id, $taxonomy;
		$bt_term_id = $tags->display('term_id') ?>
		<?php if ($cur > 1) {
			echo ' ` ';
		} ?>
		<a href="<?= get_term_link($bt_term_id, $taxonomy_name) . setStoryPerma() ?>" class="hover:underline <?php if ($bt_term_id == $term_id && $taxonomy == $taxonomy_name) {
																													echo 'underline';
																												} ?>">
			<?= $tags->display('name') ?></a>
	<?php endwhile; ?> `
</p>

<p class="txt-layer mb-4 viewmode">in <button onclick="toggleViewmode(true)" class="galleryview hover:underline underline">gallery</button> ` <button onclick="toggleViewmode(false)" class="listview hover:underline">list</button> view</p>
