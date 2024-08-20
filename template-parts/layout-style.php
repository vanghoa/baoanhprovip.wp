<?php

if (!function_exists('outline')) {
	function outline(array $options = [])
	{
		$singleWork = $options['singleWork'] ?? false;
		if ($singleWork) {
			echo "[&>*]:bg-bg2 [&>*]:rounded-xl [&>*]:overflow-hidden cp-layer";
			return;
		}
		echo "bg-bg2 rounded-xl overflow-hidden bg-layer";
		// echo "outline-[1px] outline-text outline outline-offset-[-.5px]";
	}
}
