<?php

$settings = pods('settings');
$desflow = $settings->field('designer_flow');
$devflow = $settings->field('developer_flow');
$storytxt = $settings->field('storytxt');
$pods = pods('work');

$flowarr = null;

if (!empty($desflow) && !empty($devflow)) {
	$flowarr = [
		'designer',
		'developer'
	];
}

?>

<div class="h-svh w-full absolute top-0 left-0 flex flex-col px-4 story">
	<?php get_template_part('template-parts/layout', 'top-padding'); ?>
	<section class="basis-full flex justify-center items-center pt-4 gap-5 w-fit mx-auto">
		<div class="storygrid grid grid-cols-2 gap-4 justify-items-center">
			<p class="col-span-2 text-center mb-4 txt-layer max-w-[80%]"><?= $storytxt ?></p>
			<?php if ($flowarr) {
				foreach ($flowarr as $k => $flow) { ?>
					<p class="block max-w-72 w-full basis-1/2 text-center txt-layer italic">
						<?= $settings->field($flow . '_txt') ?>
					</p>
				<?php  }
				foreach ($flowarr as $k => $flow) {
					$permalink = home_url('/' . $flow . setStoryPerma()); ?>
					<a class="block max-w-96 basis-1/2 w-full <?php outline() ?> overflow-hidden" href="<?= $permalink ?>">
						<div class="imgwrapper">
							<?= $settings->field($flow . '_img._img'); ?>
						</div>
						<div class="text-center m-4 flex flex-col gap-4 justify-center items-center">
							<p class="short_description line-clamp-4 max-w-md text-center txt-layer">
								<?= $settings->field($flow . '_text'); ?>
							</p>
						</div>
					</a>
			<?php  }
			} ?>
		</div>
	</section>
	<?php get_template_part('template-parts/layout', 'footer'); ?>
</div>