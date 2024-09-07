<ul class="homegrid grid grid-cols-1 gap-8 w-fit mx-auto">
	<?php
	mapLi();
	?>
</ul>
<ul class="homelist w-full hidden <?= outline(['listView' => true]) ?>">
	<?php mapLi(
		'homelistli'
	); ?>
</ul>
