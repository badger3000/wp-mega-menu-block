<?php
/**
 * Plugin Name:       Mega Menu Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mega-menu-block
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function create_block_mega_menu_block_block_init() {
    register_block_type(__DIR__ . '/build', array(
        'render_callback' => 'render_mega_menu_block'
    ));
}
add_action('init', 'create_block_mega_menu_block_block_init');

function render_mega_menu_block($attributes, $content) {
    // Only enqueue on frontend and if not already registered
    if (!is_admin() && !wp_script_is('create-block-mega-menu-view-script', 'registered')) {
        // Get file paths
        $view_js_path = plugin_dir_path(__FILE__) . 'build/view.js';
        $style_css_path = plugin_dir_path(__FILE__) . 'build/style-index.css';
        
        // Get file URLs
        $view_js_url = plugins_url('build/view.js', __FILE__);
        $style_css_url = plugins_url('build/style-index.css', __FILE__);
        
        // Register and enqueue the view script if it exists
        if (file_exists($view_js_path)) {
            wp_register_script(
                'create-block-mega-menu-view-script', // Changed script handle to match block naming
                $view_js_url,
                array(),
                filemtime($view_js_path),
                true
            );
            
            wp_add_inline_script('create-block-mega-menu-view-script', '
                console.log("Mega Menu Script Loading");
            ', 'before');
        }
        
        // Register and enqueue the styles if they exist
        if (file_exists($style_css_path)) {
            wp_register_style(
                'mega-menu-style',
                $style_css_url,
                array(),
                file_exists($style_css_path) ? filemtime($style_css_path) : '1.0.0'
            );
            wp_enqueue_style('mega-menu-style');
        }
    }
    
    // Enqueue the script if it's registered
    if (wp_script_is('create-block-mega-menu-view-script', 'registered')) {
        wp_enqueue_script('create-block-mega-menu-view-script');
    }
    
    return $content;
}