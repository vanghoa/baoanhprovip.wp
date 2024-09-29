<?php
global $is_story;

if (!function_exists('outline')) {
	function outline($options = [])
	{
		if ($options['singleWork'] ?? false) {
			echo "cp-layer";
			return;
		}
		if ($options['listView'] ?? false) {
			echo "odd-layer";
			return;
		}
		echo "bgstyle " . ($options['noBgLayer'] ?? false ? '' : ' bg-layer');
		// echo "outline-[1px] outline-text outline outline-offset-[-.5px]";
	}
}

if (!function_exists('setStoryPerma')) {
	function setStoryPerma()
	{
		global $is_story;
		return ($is_story ? '?story=' . $is_story : '');
	}
}

if (!function_exists('formatTimeframe')) {
	function formatTimeframe($responsive = false)
	{
		global $pods;
		$times = $pods->field('timeframe');
		if ($times) : foreach ($times as $key => $time) { ?>
				<span class="text-nowrap whitespace-nowrap txt-layer">
					<?php
					if ($key !== 0) {
						echo " — "; // Add a comma after each item except the last
					}
					echo (new DateTime($time))->format('M Y'); ?>
				</span>
			<?php }
			if ($responsive) { ?>
				<span class="text-nowrap whitespace-nowrap txt-layer responsive">
					<?php echo (new DateTime($times[0]))->format('Y'); ?>
				</span>
			<?php }
		endif;
	}
}

if (!function_exists('outputTaxonomy')) {
	function outputTaxonomy()
	{
		global $is_story, $term_id, $taxonomy, $taxonomy_name, $pods;
		$tags = $pods->field($taxonomy_name);
		if ($tags) : $length = count($tags);
			foreach ($tags as $k => $tag) { ?><span style="overflow-wrap:anywhere;"><a class="<?php if ($tag['term_id'] == $term_id && $taxonomy == $taxonomy_name) {
																									echo 'text-hilight';
																								} ?>" href="<?php
																											$is_story = $is_story && true;
																											echo get_term_link($tag['slug'], $taxonomy_name) . setStoryPerma() ?>"><?php
																																													echo str_replace(' ', '&nbsp;', $tag['name']); ?></a>
					<?= ($length - 1 > $k) ? ' - ' : '' ?>
				</span>
<?php }
		endif;
	}
}
