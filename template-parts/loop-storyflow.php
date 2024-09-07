<?php
global $flowtype, $is_story, $pods, $term_id, $taxonomy, $taxonomy_name, $flows;
$settings = pods('settings');
$flows = $settings->field($flowtype . '_flow');
$pods = pods('work');
$taxonomy_name = $flowtype . 'tag';
?>

<div class="min-h-[80svh] h-fit flex flex-col justify-center items-center pb-16">
	<div class="max-w-md text-center mb-8 [&>p]:mt-4 [&>*]:h-fit [&>*]:w-full txtp-layer">
		<?php the_content(); ?>
	</div>

	<ul class="homegrid grid grid-cols-1 gap-8 w-fit">
		<?php
		$is_story = $flowtype . '-0';
		$id = $flows[0]['ID'];
		$pods->fetch($id);
		get_template_part('template-parts/layout', 'homegridli'); ?>
	</ul>
</div>

<div class="max-w-md mx-auto text-center mb-8 everything">
	<div class="<?php outline() ?> p-4 mb-4 w-fit mx-auto">
		<p class="txt-layer">view other <?= $flowtype == 'developer' ? 'development' : 'design' ?> works</p>
	</div>
	<?php
	get_template_part('template-parts/layout', 'homefilter'); ?>
</div>

<?php function mapLi($part = 'homegridli')
{
	global $storymode, $pods, $flows, $flowtype, $is_story;
	foreach ($flows as $k => $flow) {
		if ($k == 0) {
			continue;
		}
		$is_story = $flowtype . '-' . $k;
		$id = $flow['ID'];
		$pods->fetch($id);
		get_template_part('template-parts/layout', $part);
	}
}
get_template_part('template-parts/layout', 'homegrid'); ?>