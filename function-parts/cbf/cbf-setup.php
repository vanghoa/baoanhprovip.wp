<?php

use Carbon_Fields\Field;
use Carbon_Fields\Container;

add_action('carbon_fields_register_fields', 'crb_attach_post_meta');
function crb_attach_post_meta()
{
	Container::make('post_meta', __('carbon meta'))
		->where('post_type', '=', 'work') // only show our new fields on pages
		->add_fields(array(
			Field::make('complex', 'crb_credits', 'credit')
				->set_min(1)
				->set_layout('tabbed-vertical')
				->add_fields(array(
					Field::make('association', 'crb_name', __('who'))
						->set_required(true)
						->set_types(array(
							array(
								'type'      => 'post',
								'post_type' => 'person',
							)
						))->set_max(1)->set_min(1),
					Field::make('text', 'crb_text', __('title'))->set_required(true)
				)),
		));
}

add_action('after_setup_theme', 'crb_load');
function crb_load()
{
	require_once(__DIR__ . '/../../vendor/autoload.php');
	\Carbon_Fields\Carbon_Fields::boot();
	require_once(__DIR__ . '/cbf-widget.php');
}
