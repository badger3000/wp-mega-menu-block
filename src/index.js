import { registerBlockType } from "@wordpress/blocks";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import "./style.scss"; // Frontend styles

registerBlockType("create-block/mega-menu", {
	edit: ({ attributes, setAttributes }) => {
		const { menuTitle, isDropdownOpen } = attributes;
		const blockProps = useBlockProps();

		const ALLOWED_BLOCKS = [
			"core/columns",
			"core/navigation-link",
			"core/paragraph",
			"core/heading",
			"core/image",
		];
		const TEMPLATE = [
			[
				"core/columns",
				{},
				[
					[
						"core/column",
						{},
						[
							["core/heading", { level: 3, content: "Column 1" }],
							["core/navigation-link", { label: "Link 1" }],
						],
					],
					[
						"core/column",
						{},
						[
							["core/heading", { level: 3, content: "Column 2" }],
							["core/navigation-link", { label: "Link 2" }],
						],
					],
				],
			],
		];

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title={__("Menu Settings", "mega-menu")}>
						<TextControl
							label={__("Menu Title", "mega-menu")}
							value={menuTitle}
							onChange={(value) => setAttributes({ menuTitle: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div className="mega-menu-item">
					<button
						className="mega-menu-trigger"
						onClick={() => setAttributes({ isDropdownOpen: !isDropdownOpen })}
					>
						{menuTitle}
						<span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
							▼
						</span>
					</button>

					<div className={`mega-menu-content ${isDropdownOpen ? "open" : ""}`}>
						<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
					</div>
				</div>
			</div>
		);
	},

	save: ({ attributes }) => {
		const { menuTitle } = attributes;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className="mega-menu-item">
					<button className="mega-menu-trigger">
						{menuTitle}
						<span className="dropdown-arrow">▼</span>
					</button>

					<div className="mega-menu-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
});
