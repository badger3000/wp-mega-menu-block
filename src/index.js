import { registerBlockType } from "@wordpress/blocks";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings, // Add this import
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import "./style.scss";

registerBlockType("create-block/mega-menu", {
	edit: ({ attributes, setAttributes }) => {
		const { menuTitle, buttonBackgroundColor, buttonTextColor } = attributes;
		const blockProps = useBlockProps();

		// Create button style object
		const buttonStyle = {
			...(buttonBackgroundColor && { backgroundColor: buttonBackgroundColor }),
			...(buttonTextColor && { color: buttonTextColor }),
		};

		// Define allowed blocks
		const ALLOWED_BLOCKS = [
			"core/columns",
			"core/column",
			"core/heading",
			"core/paragraph",
			"core/navigation",
			"core/navigation-link",
			"core/navigation-submenu",
			"core/group",
			"core/list",
			"core/image",
		];

		// Define the template with navigation links
		const TEMPLATE = [
			[
				"core/columns",
				{ className: "mega-menu-columns" },
				[
					[
						"core/column",
						{},
						[
							["core/heading", { level: 3, content: "Column 1" }],
							[
								"core/navigation",
								{ orientation: "vertical" },
								[
									["core/navigation-link", { label: "Link 1", url: "/" }],
									["core/navigation-link", { label: "Link 2", url: "/" }],
									["core/navigation-link", { label: "Link 3", url: "/" }],
								],
							],
						],
					],
					[
						"core/column",
						{},
						[
							["core/heading", { level: 3, content: "Column 2" }],
							[
								"core/navigation",
								{ orientation: "vertical" },
								[
									["core/navigation-link", { label: "Link 4", url: "/" }],
									["core/navigation-link", { label: "Link 5", url: "/" }],
									["core/navigation-link", { label: "Link 6", url: "/" }],
								],
							],
						],
					],
					[
						"core/column",
						{},
						[
							["core/heading", { level: 3, content: "Column 3" }],
							[
								"core/navigation",
								{ orientation: "vertical" },
								[
									["core/navigation-link", { label: "Link 7", url: "/" }],
									["core/navigation-link", { label: "Link 8", url: "/" }],
									["core/navigation-link", { label: "Link 9", url: "/" }],
								],
							],
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
					<PanelColorSettings
						title={__("Button Colors", "mega-menu")}
						colorSettings={[
							{
								value: buttonBackgroundColor,
								onChange: (color) =>
									setAttributes({ buttonBackgroundColor: color }),
								label: __("Background Color", "mega-menu"),
							},
							{
								value: buttonTextColor,
								onChange: (color) => setAttributes({ buttonTextColor: color }),
								label: __("Text Color", "mega-menu"),
							},
						]}
					/>
				</InspectorControls>

				<div className="mega-menu-item">
					<button
						className="mega-menu-trigger"
						onClick={() =>
							setAttributes({ isDropdownOpen: !attributes.isDropdownOpen })
						}
						style={Object.keys(buttonStyle).length ? buttonStyle : null}
					>
						{menuTitle}
						<span
							className={`dropdown-arrow ${
								attributes.isDropdownOpen ? "open" : ""
							}`}
						>
							▼
						</span>
					</button>

					<div
						className={`mega-menu-content ${
							attributes.isDropdownOpen ? "open" : ""
						}`}
					>
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							template={TEMPLATE}
							templateLock={false}
						/>
					</div>
				</div>
			</div>
		);
	},

	save: ({ attributes }) => {
		const { menuTitle, buttonBackgroundColor, buttonTextColor } = attributes;
		const blockProps = useBlockProps.save();

		// Create button style object
		const buttonStyle = {
			...(buttonBackgroundColor && { backgroundColor: buttonBackgroundColor }),
			...(buttonTextColor && { color: buttonTextColor }),
		};
		return (
			<div {...blockProps}>
				<div className="mega-menu-item">
					<button
						className="mega-menu-trigger"
						type="button"
						aria-expanded="false"
						style={Object.keys(buttonStyle).length ? buttonStyle : null}
					>
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
