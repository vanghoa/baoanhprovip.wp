<?php

add_action(
	'widgets_init',
	function () {
		register_sidebar(
			array(
				'name'          => __('Sidebar', 'bathe'),
				'id'            => 'sidebar-1',
				'description'   => '',
				'before_widget' => '<section id="%1$s" class="widget %2$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			)
		);
	}
);

add_action(
	'widgets_init',
	function () {
		register_sidebar(array(
			'name'   		=> 'Top Bar',
			'id'            => 'top-bar-widgets',
			'description'   => 'Widgets in this area will appear in a bar at the top of the site.',
			'before_widget' => '<div id="%1$s" class="widget top-bar-widget">',
			'after_widget'  => '</div>',
			'before_sidebar' => '<div id="top-bar">',
			'after_sidebar' => '</div>',
		));
	}
);
