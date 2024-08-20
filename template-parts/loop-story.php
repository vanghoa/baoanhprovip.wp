<?php

$settings = pods('settings');
$desflow = $settings->field('designerflow');
$devflow = $settings->field('developerflow');
$pods = pods('work');

?>

<div class="h-svh w-full fixed top-0 left-0 flex flex-col px-4 story">
	<?php get_template_part('template-parts/layout', 'top-padding'); ?>
	<section class="basis-full flex justify-center items-center">
		<div class="flex gap-5 sm:gap-10">
			<?php if (!empty($desflow)) {
				$id_des = $desflow[0]['ID'];
				$pods->fetch($id_des) ?>
				<a class="block max-w-72 basis-1/2 <?php outline() ?> overflow-hidden" href="<?php echo esc_url(get_permalink($id_des) . '?story=true'); ?>">
					<div class="imgwrapper">
						<?php echo $pods->field('featured_images._img')[0]; ?>
					</div>
					<div class="mb-6 m-4 flex flex-col gap-3">
						<h3><?php echo get_the_title($id_des); ?></h3>
					</div>
				</a>
			<?php  } ?>
			<?php if (!empty($devflow)) {
				$id_dev = $devflow[0]['ID'];
				$pods->fetch($id_dev) ?>
				<a class="block max-w-72 basis-1/2 <?php outline() ?> overflow-hidden" href="<?php echo esc_url(get_permalink($id_dev) . '?story=true'); ?>">
					<div class="imgwrapper">
						<?php echo $pods->field('featured_images._img')[0]; ?>
					</div>
					<div class="mb-6 m-4 flex flex-col gap-3">
						<h3><?php echo get_the_title($id_dev); ?></h3>
					</div>
				</a>
			<?php  } ?>
		</div>
	</section>
	<?php get_template_part('template-parts/layout', 'footer'); ?>
</div>